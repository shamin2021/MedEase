package com.medease.backend.controller;

import com.medease.backend.dto.GlobalResponseDTO;
import com.medease.backend.dto.RegisterRequestDTO;
import com.medease.backend.entity.DoctorSpeciality;
import com.medease.backend.service.UserRegistrationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/register-user")
@RequiredArgsConstructor
public class UserRegistrationController {

    private final UserRegistrationService userRegistrationService;

    // get specialties for select tag in doctor specialties
    @GetMapping("/get-specialities")
    public ResponseEntity<List<DoctorSpeciality>> getSpecialities() {
        return ResponseEntity.ok(userRegistrationService.getSpecialities());
    }

    // register a doctor
    @PostMapping("/register-doctor")
    public ResponseEntity<GlobalResponseDTO> addDoctor(
            @RequestBody RegisterRequestDTO registerRequestDTO
    ) {
        System.out.println(registerRequestDTO);
        return ResponseEntity.ok(userRegistrationService.addDoctor(registerRequestDTO));
    }

    // register HLC
    @PostMapping("/register-hlc")
    public ResponseEntity<GlobalResponseDTO> addHlc(
            @RequestBody RegisterRequestDTO registerRequestDTO
    ) {
        System.out.println(registerRequestDTO);
        return ResponseEntity.ok(userRegistrationService.addHlc(registerRequestDTO));
    }

}
