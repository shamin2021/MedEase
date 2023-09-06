package com.medease.backend.dto;

import com.medease.backend.enumeration.Gender;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequestDTO {

    private String firstname;
    private String lastname;
    private String email;
    private String password;
    private Gender gender;
    private LocalDate dob;

    private String licenseNumber;
    private Integer speciality;
    private String mobileNumber;
    private MultipartFile image;

    private String hlc_name;
    private String moh_area;
    private String gn_number;
    private String gn_division;
    private String ds_division;
    private String phi_area;
    private String phm_area;
    private String in_charge;
    private String in_charge_designation;
    private String in_charge_email;
    private String in_charge_mobile;


}
