package com.medease.backend.repository;

import com.medease.backend.entity.DoctorSpeciality;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DoctorSpecialityRepository extends JpaRepository<DoctorSpeciality, Integer> {
}
