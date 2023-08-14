package com.medease.backend.repository;

import com.medease.backend.entity.Doctor;
import com.medease.backend.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientRepository  extends JpaRepository<Patient, Integer> {
}
