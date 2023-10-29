package com.medease.backend.controller;

import com.medease.backend.dto.*;
import com.medease.backend.service.PatientService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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

    @GetMapping("/getPatientProfile/{userId}")
    public RegisterRequestDTO getPatientProfile(@PathVariable Integer userId) {
        return patientService.getPatientProfile(userId);
    }

    @PostMapping("/changeHLCRequest/{userId}")
    public ResponseEntity<GlobalResponseDTO> changeHLCRequest(@PathVariable Integer userId, @RequestBody ChangeRequestDTO changeRequestDTO){
        return ResponseEntity.ok(patientService.changeHLCRequest(userId, changeRequestDTO));
    }

    @PutMapping("/updateProfile/{userId}")
    public ResponseEntity<GlobalResponseDTO> updateProfile(@PathVariable Integer userId, @RequestBody RegisterRequestDTO registerRequestDTO){
        return ResponseEntity.ok(patientService.updateProfile(userId, registerRequestDTO));
    }

    @PutMapping("/updateProfileWithImage/{userId}")
    public ResponseEntity<GlobalResponseDTO> updateProfileWithImage(
            @PathVariable Integer userId,
            @RequestParam("image") MultipartFile image,
            @RequestParam("mobileNumber") String mobileNumber,
            @RequestParam("emergencyContact") String emergencyContact,
            @RequestParam("emergencyName") String emergencyName,
            @RequestParam("address") String address
    ) throws IOException {
        return ResponseEntity.ok(patientService.updateProfileWithImage(userId, image, mobileNumber, emergencyContact, emergencyName, address));
    }

}
