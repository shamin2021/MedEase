package com.medease.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/Home")
public class HomeController {

    @GetMapping()
    public ResponseEntity<String > welcomeUser() {
        return ResponseEntity.ok("Welcome To MedEase");
    }
}
