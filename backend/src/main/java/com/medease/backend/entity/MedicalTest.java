package com.medease.backend.entity;

import com.medease.backend.enumeration.Risk;
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
@Table(name = "medical_tests")
public class MedicalTest {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @OneToOne
    private SelfAssessment selfAssessment;

    private Double weight;
    private Double height;
    private Double bmi;
    private Double waistCircumference;
    private Double waistHeightRatio;
    private Integer hearingLeft;
    private Integer hearingRight;
    private Integer visionRight;
    private Integer visionLeft;
    private String oralExamination;
    private Integer cholesterolLvl;
    private Double sbp;

    private Double fastingbloodSugar;
    private Double randombloodSugar;
    private Double serumCreatinin;
    private Double lipidTg;
    private Double lipidLDL;
    private Double lipidTCHL;
    private Double lipidHDL;
    private Double lipidTC;

    private LocalDate medicalTestDate;
}
