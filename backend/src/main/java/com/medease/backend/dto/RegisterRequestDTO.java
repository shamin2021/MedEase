package com.medease.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequestDTO {

    private String username;
    private String firstname;
    private String lastname;
    private String email;
    private String password;

    private String licenseNumber;
    private Integer speciality;
    private String mobileNumber;

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
