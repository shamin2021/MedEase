package com.medease.backend.controller;

import com.medease.backend.dto.AvailabilityDTO;
import com.medease.backend.dto.DoctorDTO;
import com.medease.backend.service.DoctorService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
