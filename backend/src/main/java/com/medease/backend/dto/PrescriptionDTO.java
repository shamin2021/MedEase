package com.medease.backend.dto;

import com.medease.backend.entity.Doctor;
import com.medease.backend.entity.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PrescriptionDTO {

    private Integer prescription_id;
    private User user;
    private String doctorName;
    private LocalDate givenDate;
    private String prescription;

}
