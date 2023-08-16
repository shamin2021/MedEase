package com.medease.backend.repository;

import com.medease.backend.entity.MedicalTest;
import com.medease.backend.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface MedicalTestRepository extends JpaRepository<MedicalTest, Integer> {

    @Query("""
        select p from MedicalTest p where p.selfAssessment.id = :id
""")
    Optional<MedicalTest> findMedicalTest(Integer id);
}
