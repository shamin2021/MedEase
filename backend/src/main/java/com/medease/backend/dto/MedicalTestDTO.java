package com.medease.backend.dto;

import com.medease.backend.entity.SelfAssessment;
import com.medease.backend.enumeration.Risk;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MedicalTestDTO {

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

    private Double fastingbloodSugar;
    private Double randombloodSugar;
    private Double serumCreatinin;
    private Double lipidTg;
    private Double lipidLDL;
    private Double lipidTCHL;
    private Double lipidHDL;
    private Double lipidTC;

    private LocalDate medicalTestDate;
    private Risk risk;
}
