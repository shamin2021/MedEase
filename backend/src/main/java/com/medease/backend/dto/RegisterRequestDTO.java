package com.medease.backend.dto;

import com.medease.backend.enumeration.Gender;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequestDTO {

    private Integer user_id;
    private String firstname;
    private String lastname;
    private String email;
    private String password;
    private Gender gender;
    private LocalDate dob;
    private String chosenHlcName;

    private String licenseNumber;
    private Integer speciality;
    private String doctor_speciality;
    private String mobileNumber;
    private String image;

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
    private String longitude;
    private String latitude;

    private String address;
    private String emergencyContact;
    private String emergencyName;
    private Integer requested;

}
