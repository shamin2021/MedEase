package com.medease.backend.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.medease.backend.dto.AuthenticationResponseDTO;
import com.medease.backend.repository.TokenRepository;
import com.medease.backend.service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
//create a constructor using private final
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;

    private final UserDetailsService userDetailsService;

    private final TokenRepository tokenRepository;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {
        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String userEmail;

        if(authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }
        jwt = authHeader.substring(7);
        System.out.println(jwt);
        //from jwt extract data
        userEmail = jwtService.extractUsername(jwt);

        // if user not authenticated
        if(userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null ) {
            // get user details from database
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail);
            var isTokenValid = tokenRepository.findByToken(jwt)
                    .map(t -> !t.isExpired() && !t.isRevoked())
                    .orElse(false);
            // if user and object is valid
            if(jwtService.isTokenValid(jwt, userDetails) && isTokenValid) {
                System.out.println("token valid");
                System.out.println(userDetails.getAuthorities());
                UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities()
                );
                authenticationToken.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request)
                );
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            }
        }
//        handle token expiration or invalidation
        else {
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
            response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
            response.setHeader("Access-Control-Allow-Credentials", "true");

            String errorMessage = "Invalid or expired token";
                     System.out.println(errorMessage);

            var authResponse = AuthenticationResponseDTO.builder()
                    .message(errorMessage)
                    .build();
            new ObjectMapper().writeValue(response.getOutputStream(), authResponse);
        }

        filterChain.doFilter(request, response);
    }
}
