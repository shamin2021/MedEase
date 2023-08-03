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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long doctor_id;

    @OneToOne
    @JoinColumn(name = "doctor_user_id", referencedColumnName = "id")
    private User doctor_user;

    private String name;
    private String speciality;  // need to think about adding a speciality entity with (speciality_ID, speciality_Name)  and referencing here

    @Column(unique = true)
    private String license_number;
}
