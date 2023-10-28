package com.medease.backend.controller;

import com.medease.backend.dto.GlobalResponseDTO;
import com.medease.backend.dto.RegisterRequestDTO;
import com.medease.backend.entity.DoctorSpeciality;
import com.medease.backend.service.UserRegistrationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
        return ResponseEntity.ok(userRegistrationService.addDoctor(registerRequestDTO));
    }

    @PostMapping("/register-doctor-image")
    public ResponseEntity<GlobalResponseDTO> addDoctorWithImage(
            @RequestParam("image") MultipartFile image,
            @RequestParam("email") String email,
            @RequestParam("firstname") String firstname,
            @RequestParam("lastname") String lastname,
            @RequestParam("licenseNumber") String licenseNumber,
            @RequestParam("mobileNumber") String mobileNumber,
            @RequestParam("speciality") Integer speciality
    ) {
        return ResponseEntity.ok(userRegistrationService.addDoctorWithImage(email,firstname,lastname,licenseNumber,mobileNumber,speciality,image));
    }

    // register HLC
    @PostMapping("/register-hlc")
    public ResponseEntity<GlobalResponseDTO> addHlc(
            @RequestParam("hlc_name") String hlc_name,
            @RequestParam("image") MultipartFile image,
            @RequestParam("mobileNumber") String mobileNumber,
            @RequestParam("email") String email,
            @RequestParam("moh_area") String moh_area,
            @RequestParam("longitude") String longitude,
            @RequestParam("latitude") String latitude,
            @RequestParam("phm_area") String phm_area,
            @RequestParam("phi_area") String phi_area,
            @RequestParam("gn_division") String gn_division,
            @RequestParam("ds_division") String ds_division,
            @RequestParam("gn_number") String gn_number,
            @RequestParam("in_charge") String in_charge,
            @RequestParam("in_charge_designation") String in_charge_designation,
            @RequestParam("in_charge_email") String in_charge_email,
            @RequestParam("in_charge_mobile") String in_charge_mobile
    ) {
        return ResponseEntity.ok(userRegistrationService.addHlc(hlc_name,image,mobileNumber,email,moh_area,longitude,latitude,phm_area,phi_area,gn_division,ds_division,gn_number,in_charge,in_charge_designation,in_charge_email,in_charge_mobile));
    }

}
