package com.medease.backend.repository;

import com.medease.backend.entity.MedicalTest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MedicalTestRepository extends JpaRepository<MedicalTest, Integer> {
}
