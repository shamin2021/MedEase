package com.medease.backend.repository;

import com.medease.backend.entity.SelfAssessment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SelfAssessmentRepository extends JpaRepository<SelfAssessment, Integer>{
    Integer countByPatient(Integer patientId);
    SelfAssessment findTopByPatientOrderByIdDesc(Integer patientId);
}