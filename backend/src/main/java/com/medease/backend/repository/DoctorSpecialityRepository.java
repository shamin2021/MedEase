package com.medease.backend.repository;

import com.medease.backend.entity.DoctorSpeciality;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface DoctorSpecialityRepository extends JpaRepository<DoctorSpeciality, Integer> {

    @Query(value = "SELECT speciality_name FROM doctor_speciality WHERE speciality_id = :id", nativeQuery = true)
    String findSpecialityById(Integer id);
}
