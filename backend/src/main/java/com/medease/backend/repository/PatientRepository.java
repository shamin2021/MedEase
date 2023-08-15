package com.medease.backend.repository;

import com.medease.backend.entity.Doctor;
import com.medease.backend.entity.Patient;
import com.medease.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface PatientRepository  extends JpaRepository<Patient, Integer> {

    @Query("""
        select p from Patient p where p.patient_user.id = :id
""")
    Optional<Patient> findPatient(Integer id);
}
