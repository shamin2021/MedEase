package com.medease.backend.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.medease.backend.dto.AuthenticationRequestDTO;
import com.medease.backend.dto.AuthenticationResponseDTO;
import com.medease.backend.dto.RegisterRequestDTO;
import com.medease.backend.entity.Role;
import com.medease.backend.entity.Token;
import com.medease.backend.entity.TokenType;
import com.medease.backend.entity.User;
import com.medease.backend.repository.TokenRepository;
import com.medease.backend.repository.UserRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;

    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Value("${refresh-token.expiration}")
    private int refreshExpiration;

    // Only patients can register to the system. other ROLES like DOCTOR, HLC are added by Admin
    public AuthenticationResponseDTO register(RegisterRequestDTO request) {
        var user = User.builder()
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.HLC)
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

        revokeAllUserTokens(user);
        saveUserToken(user, jwtToken);
        return AuthenticationResponseDTO.builder()
                .message("Logged In Successfully")
                .accessToken(jwtToken)
                .role(userRole)
                .id(userID)
                .build();
    }


    // revoke when more than 1 valid tokens are saved
    private void revokeAllUserTokens(User user) {
        var validUserTokens = tokenRepository.findAllValidTokensByUser(user.getId());
        if(validUserTokens.isEmpty())
            return;
        validUserTokens.forEach(token -> {
            token.setExpired(true);
            token.setRevoked(true);
        });
        tokenRepository.saveAll(validUserTokens);
    }

    private void saveUserToken(User user, String jwtToken) {
        var token = Token.builder()
                .user(user)
                .token(jwtToken)
                .tokenType(TokenType.BEARER)
                .revoked(false)
                .expired(false)
                .build();
        tokenRepository.save(token);
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
                revokeAllUserTokens(userDetails);
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

        revokeAllUserTokens(user);
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
}
