package com.medease.backend.entity;

import com.medease.backend.enumeration.EducationStatus;
import com.medease.backend.enumeration.Gender;
import com.medease.backend.enumeration.MaritalStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "patient")
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer patient_id;

    @OneToOne
    @JoinColumn(name = "patient_user_id", referencedColumnName = "id")
    private User patient_user;

    @ManyToOne
    @JoinColumn(name = "patient_hlc_id" , referencedColumnName = "hlc_id")
    private HLC patient_hlc;

    @Column(unique = true)
    private String phn;

    @Column(unique = true)
    private String nic;

    private String permanent_address;
    private String current_address;
    private String emergency_name;
    private String emergency_contact_number;
    private String emergency_address;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    private String home_contact_number;
    private LocalDate dob;

    @Enumerated(EnumType.STRING)
    private MaritalStatus marital_status;

    @Enumerated(EnumType.STRING)
    private EducationStatus highest_education_status;

    private LocalDate date_of_registration;

}
