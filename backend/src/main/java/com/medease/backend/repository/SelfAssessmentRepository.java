package com.medease.backend.repository;

import com.medease.backend.entity.SelfAssessment;
import com.medease.backend.enumeration.Risk;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface SelfAssessmentRepository extends JpaRepository<SelfAssessment, Integer> {
    Integer countByPatient(Integer patientId);

    SelfAssessment findTopByPatientOrderByIdDesc(Integer patientId);

    @Query(value = "SELECT created_date, risk FROM selfassessments WHERE patient = :patientId ORDER BY created_date", nativeQuery = true)
    List<Object> findDateRiskByPatientOrderByDate(Integer patientId);

    @Query(value = """
            SELECT t1.patient, t1.created_date, t1.risk
            FROM selfassessments t1
            INNER JOIN (
                SELECT patient, MAX(created_date) AS latest_date
                FROM selfassessments
                GROUP BY patient
            ) t2
            ON t1.patient = t2.patient AND t1.created_date = t2.latest_date
            WHERE risk=:riskLevel
            """, nativeQuery = true)
    List<Object> findPatientCountByRisk(String riskLevel);
}
