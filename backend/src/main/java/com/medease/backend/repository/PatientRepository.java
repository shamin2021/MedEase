package com.medease.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.medease.backend.entity.Patient;

public interface PatientRepository  extends JpaRepository<Patient, Integer> {

    @Query("""
        select p from Patient p where p.patient_user.id = :id
""")
    Optional<Patient> findPatient(Integer id);
    
    @Query(value = "SELECT COUNT(*) FROM patient WHERE patient_hlc_id = :hlcId", nativeQuery = true)
    Integer findPatientbyHlcId(Integer hlcId);

    
}
