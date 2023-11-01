package com.medease.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DoctorDTO {

    private Integer doctor_id;
    private String firstname;
    private String lastname;
    private String email;
    private String mobileNumber;
    private Integer doctor_user_id;
    private String doctor_speciality;
    private String doctor_license_number;

    @JsonProperty("profile_image")
    private String profileImage;

}
