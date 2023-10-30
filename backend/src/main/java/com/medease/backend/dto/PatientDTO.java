package com.medease.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.medease.backend.entity.HLC;
import com.medease.backend.enumeration.EducationStatus;
import com.medease.backend.enumeration.Gender;
import com.medease.backend.enumeration.MaritalStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PatientDTO {

    private Integer patient_id;
    private HLC patient_hlc;
    private String patient_hlc_name;
    private String phn;
    private String nic;
    private String permanent_address;
    private String current_address;
    private String emergency_name;
    private String emergency_contact_number;
    private String emergency_address;
    private Gender gender;
    private String home_contact_number;
    private LocalDate dob;
    private MaritalStatus marital_status;
    private EducationStatus highest_education_status;
    private LocalDate date_of_registration;

    private String firstname;
    private String lastname;
    private String email;
    private String mobileNumber;

    @JsonProperty("profile_image")
    private String profileImage;

}
