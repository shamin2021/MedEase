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
@Table(name = "doctor")
public class Doctor {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer doctor_id;

    @OneToOne
    @JoinColumn(name = "doctor_user_id", referencedColumnName = "id")
    private User doctor_user;

    @ManyToOne
    @JoinColumn(name = "doctor_speciality_id", referencedColumnName = "speciality_id")
    private DoctorSpeciality speciality;

    @Column(unique = true)
    private String license_number;
}
