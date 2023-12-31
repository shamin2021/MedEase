package com.medease.backend.controller;


import com.medease.backend.dto.*;
import com.medease.backend.entity.HLCMap;
import com.medease.backend.service.AuthenticationService;
import jakarta.mail.MessagingException;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

import java.io.UnsupportedEncodingException;
import java.util.List;


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
    ) throws MessagingException, UnsupportedEncodingException {
        return ResponseEntity.ok(authenticationService.forgotPassword(request));
    }

    @PostMapping("/reset-password/{resetToken}")
    public ResponseEntity<GlobalResponseDTO> resetPassword (
            @RequestBody PasswordResetRequestDTO request,
            @PathVariable String resetToken
    ){
        return ResponseEntity.ok(authenticationService.resetPassword(request, resetToken));
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
