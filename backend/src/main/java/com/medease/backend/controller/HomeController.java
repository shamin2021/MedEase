package com.medease.backend.controller;

import com.medease.backend.dto.AuthenticationResponseDTO;
import io.jsonwebtoken.io.IOException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/Home")
public class HomeController {

    @GetMapping()
    public ResponseEntity<String > welcomeUser() {
        return ResponseEntity.ok("Welcome To MedEase");
    }

    @GetMapping("/users")
    public ResponseEntity<String > users() {
        try{
            return ResponseEntity.ok("Welcome To MedEase");
        } catch (IOException e) {
            e.printStackTrace();
            return (ResponseEntity<String>) ResponseEntity.status(HttpStatus.FORBIDDEN);
        }

    }


}


