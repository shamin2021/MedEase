package com.medease.backend.controller;


import com.medease.backend.dto.*;
import com.medease.backend.service.AuthenticationService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponseDTO> register(
            @RequestBody RegisterRequestDTO request

    ){
        return ResponseEntity.ok(authenticationService.register(request));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponseDTO> authenticate(
            @RequestBody AuthenticationRequestDTO request,
            HttpServletResponse response

    ){
        return ResponseEntity.ok(authenticationService.authenticate(request, response));
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<GlobalResponseDTO> forgotPassword (
            @RequestBody PasswordResetRequestDTO request
    ){
        return ResponseEntity.ok(authenticationService.forgotPassword(request));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<GlobalResponseDTO> resetPassword (
            @RequestBody PasswordResetRequestDTO request
    ){
        return ResponseEntity.ok(authenticationService.resetPassword(request));
    }

    @PostMapping("/logout")
    public ResponseEntity<AuthenticationResponseDTO> logout(
            HttpServletRequest request,
            HttpServletResponse response

    ){
        return ResponseEntity.ok(authenticationService.logout(request, response));
    }

    @GetMapping("/refreshToken")
    public void refreshToken(
            HttpServletRequest request,
            HttpServletResponse response

    ) throws IOException {
        authenticationService.refreshToken(request, response);
    }

}
