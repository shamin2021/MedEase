package com.medease.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "doctor_speciality")
public class DoctorSpeciality {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer speciality_id;

    @Column(unique = true)
    private String speciality_name;
}
