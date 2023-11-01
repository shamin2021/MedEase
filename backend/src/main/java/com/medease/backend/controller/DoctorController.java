package com.medease.backend.controller;

import com.medease.backend.dto.DoctorDTO;
import com.medease.backend.dto.GlobalResponseDTO;
import com.medease.backend.dto.RegisterRequestDTO;
import com.medease.backend.service.DoctorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/v1/doctors")
@RequiredArgsConstructor
public class DoctorController {

    private final DoctorService doctorService;

    @GetMapping("/getDoctors")
    public List<DoctorDTO> getDoctors() {
        return doctorService.getDoctors();
    }

    @GetMapping("/getDoctorProfile/{userId}")
    public RegisterRequestDTO getDoctorProfile(@PathVariable Integer userId) {
        return doctorService.getDoctorProfile(userId);
    }

    @PutMapping("/updateProfile/{userId}")
    public ResponseEntity<GlobalResponseDTO> updateProfile(@PathVariable Integer userId, @RequestBody RegisterRequestDTO registerRequestDTO){
        return ResponseEntity.ok(doctorService.updateProfile(userId, registerRequestDTO));
    }

    @PutMapping("/updateProfileWithImage/{userId}")
    public ResponseEntity<GlobalResponseDTO> updateProfileWithImage(
            @PathVariable Integer userId,
            @RequestParam("image") MultipartFile image,
            @RequestParam("mobileNumber") String mobileNumber
    ) throws IOException {
        return ResponseEntity.ok(doctorService.updateProfileWithImage(userId, image, mobileNumber));
    }
}
