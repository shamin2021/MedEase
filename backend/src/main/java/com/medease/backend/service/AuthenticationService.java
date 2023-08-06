package com.medease.backend.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.medease.backend.Exception.CustomException;
import com.medease.backend.assets.ResetPasswordEmailTemplate;
import com.medease.backend.assets.ResetPasswordSmsTemplate;
import com.medease.backend.dto.*;
import com.medease.backend.entity.ResetToken;
import com.medease.backend.enumeration.Role;
import com.medease.backend.entity.Token;
import com.medease.backend.enumeration.TokenType;
import com.medease.backend.entity.User;
import com.medease.backend.repository.ResetTokenRepository;
import com.medease.backend.repository.TokenRepository;
import com.medease.backend.repository.UserRepository;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.UnsupportedEncodingException;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;
    private final ResetTokenRepository resetTokenRepository;

    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final EmailService emailService;
    private final SmsService smsService;

    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;

    @Value("${refresh-token.expiration}")
    private int refreshExpiration;

    // Only patients can register to the system. other ROLES like DOCTOR, HLC are added by Admin
    public AuthenticationResponseDTO register(RegisterRequestDTO request) {
        var user = User.builder()
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.PATIENT)
                .build();
        var savedUser = userRepository.save(user);

        var jwtToken = jwtService.generateToken(user);

        saveUserToken(savedUser, jwtToken);

        return AuthenticationResponseDTO.builder()
                .message("Registered Successfully")
                .build();
    }


    public AuthenticationResponseDTO authenticate(AuthenticationRequestDTO request, HttpServletResponse response) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        // if username and email are correct
        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow();

        var jwtToken = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);
        createCookie(response ,refreshToken, refreshExpiration/1000);
        var userRole = user.getRole();
        var userID = user.getId();

        revokeAllBearerTokens(user);
        saveUserToken(user, jwtToken);
        return AuthenticationResponseDTO.builder()
                .message("Logged In Successfully")
                .accessToken(jwtToken)
                .role(userRole)
                .id(userID)
                .build();
    }


    // revoke when more than 1 valid Bearer tokens are saved
    private void revokeAllBearerTokens(User user) {
        var validBearerTokens = tokenRepository.findAllValidBearerTokensByUser(user.getId());
        if(validBearerTokens.isEmpty())
            return;
        validBearerTokens.forEach(token -> {
            token.setExpired(true);
            token.setRevoked(true);
        });
        tokenRepository.saveAll(validBearerTokens);
    }

    // revoke Reset tokens
    private void  revokeResetTokens(User user) {
        var validResetTokens = resetTokenRepository.findAllValidResetTokensByUser(user.getId());
        if(validResetTokens.isEmpty())
            return;
        validResetTokens.forEach(token -> {
            token.setExpired(true);
            token.setRevoked(true);
        });
        resetTokenRepository.saveAll(validResetTokens);
    }

    private void saveUserToken(User user, String jwtToken) {

        Token token = Token.builder()
                    .user(user)
                    .token(jwtToken)
                    .tokenType(TokenType.BEARER)
                    .revoked(false)
                    .expired(false)
                    .build();
        tokenRepository.save(token);
    }

    private void saveResetToken(User user, String jwtToken) {

        ResetToken token = ResetToken.builder()
                .user(user)
                .token(jwtToken)
                .tokenType(TokenType.RESET)
                .revoked(false)
                .expired(false)
                .build();
        resetTokenRepository.save(token);
    }

    // can use AuthenticationResponseDTO as return type , but as refreshToken method is not invoked in the backend code it will give a warning
    // That's why objectMapper needed to serialize the response to JSON format
    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String refreshToken = null;
        final String userEmail;

        refreshToken = getRefreshTokenFromCookie(request);

        if(refreshToken == null) {
            return;
        }

        //from jwt extract data
        userEmail = jwtService.extractUsername(refreshToken);
        if(userEmail != null ) {
            // get user details from database
            var userDetails = this.userRepository.findByEmail(userEmail)
                    .orElseThrow();

            if(jwtService.isTokenValid(refreshToken, userDetails)) {
              var accessToken = jwtService.generateToken(userDetails);
                revokeAllBearerTokens(userDetails);
                saveUserToken(userDetails, accessToken);
                var userRole = userDetails.getRole();
                var userID = userDetails.getId();

              var authResponse = AuthenticationResponseDTO.builder()
                      .accessToken(accessToken)
                      .role(userRole)
                      .id(userID)
                      .build();
              new ObjectMapper().writeValue(response.getOutputStream(), authResponse);
            }
        }
    }


    public AuthenticationResponseDTO logout(HttpServletRequest request, HttpServletResponse response) {

        SecurityContextHolder.clearContext();

        final String authHeader = request.getHeader("Authorization");
        final String jwt;

        if(authHeader == null || !authHeader.startsWith("Bearer ")) {
            return AuthenticationResponseDTO.builder()
                    .message("Logout Authentication Error")
                    .build();
        }

        jwt = authHeader.substring(7);
        var email = jwtService.extractUsername(jwt);
        var user = this.userRepository.findByEmail(email).orElseThrow();

        revokeAllBearerTokens(user);
        createCookie(response, "", 0);
        return AuthenticationResponseDTO.builder()
                .message("Logout Successful")
                .build();
    }

    private void createCookie(HttpServletResponse response ,String refreshToken, int refreshExpiration) {
        Cookie refreshCookie = new Cookie("refreshToken", refreshToken);
        refreshCookie.setMaxAge(refreshExpiration);
        refreshCookie.setPath("/");   //can be accessed from anywhere (global)
        refreshCookie.setHttpOnly(true);
        response.addCookie(refreshCookie);
    }

    private String getRefreshTokenFromCookie(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if(cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("refreshToken")) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }

    public GlobalResponseDTO forgotPassword(PasswordResetRequestDTO request) throws MessagingException, UnsupportedEncodingException {

        var user = this.userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new CustomException("User Not Found"));

        var resetToken = jwtService.generateResetToken(user, 300000);
        // change the url when hosting
        var resetURL = "http://localhost:3000/reset-password/" + resetToken;

        try{
            emailService.sendEmail(request.getEmail(), "Follow The Link To Reset Your Password", ResetPasswordEmailTemplate.PasswordResetEmailTemplate(resetURL));
//            smsService.sendSMS("+94767256838",ResetPasswordSmsTemplate.PasswordResetSMSTemplate(resetURL));
            revokeResetTokens(user);
            saveResetToken(user, resetToken);
        } catch (UnsupportedEncodingException | MessagingException e) {
            throw new CustomException("Error while sending password reset link.");
        }

        return GlobalResponseDTO.builder()
                .status(200)
                .message("Reset Link Sent To Email and Mobile Number Associated With this Account")
                .build();
    }

    public GlobalResponseDTO resetPassword(PasswordResetRequestDTO request, String resetToken) {

        // extracted the email associated with resetToken
        String email = jwtService.extractUsername(resetToken);

        if(email != null) {
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(email);

            var isResetTokenValid = resetTokenRepository.findByToken(resetToken)
                    .map(t -> !t.isExpired() && !t.isRevoked())
                    .orElse(false);
            // if user and object is valid
            if(jwtService.isTokenValid(resetToken, userDetails) && isResetTokenValid) {
                var user = userRepository.findByEmail(email)
                        .orElseThrow(() -> new CustomException("User Not Found"));
                // save new password as hashed
                user.setPassword(passwordEncoder.encode(request.getPassword()));
                userRepository.save(user);
                // after success revoke reset token
                revokeResetTokens(user);
                return GlobalResponseDTO.builder()
                        .status(200)
                        .message("Password Reset Successful")
                        .build();
            }
            else{
                return GlobalResponseDTO.builder()
                        .status(403)
                        .message("Invalid Reset Link")
                        .build();
            }
        }
        else {
            return GlobalResponseDTO.builder()
                    .status(403)
                    .message("Reset Password Link has Expired")
                    .build();
        }
    }

}
