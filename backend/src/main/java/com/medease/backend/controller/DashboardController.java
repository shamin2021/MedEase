package com.medease.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.medease.backend.service.DashboardService;

import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/v1/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;
    
    @GetMapping("/patient/{id}")
    public ResponseEntity<?> patientDashboard(@PathVariable Integer id) {
        Object res = dashboardService.getPatientDashboard(id);
        System.out.println("Getting patient dashboard");
        return ResponseEntity.ok(res);
    }

    @GetMapping("/admin/{id}")
    public ResponseEntity<?> adminDashboard(@PathVariable Integer id) {
        Object res = dashboardService.getAdminDashboard(id);
        System.out.println("Getting admin dashboard");
        return ResponseEntity.ok(res);
    }

    @GetMapping("/doctor/{id}")
    public ResponseEntity<?> doctorDashboard(@PathVariable Integer id) {
        Object res = dashboardService.getDoctorDashboard(id);
        System.out.println("Getting doctor dashboard");
        return ResponseEntity.ok(res);
    }
}
