package com.medease.backend.controller;

import com.medease.backend.dto.PatientDTO;
import com.medease.backend.service.PatientService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/v1/patient")
@RequiredArgsConstructor
public class PatientController {

    private final PatientService patientService;

    @GetMapping("/getPatientList")
    public ResponseEntity<List<PatientDTO>> getAllPatient (){
        return ResponseEntity.ok(patientService.getAllPatients());
    }

}
