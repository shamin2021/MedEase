package com.medease.backend.repository;


import com.medease.backend.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DoctorRepository extends JpaRepository<Doctor, Integer> {

    @Query(value = "SELECT doctor_id FROM Doctor WHERE doctor_user_id = :doctorId", nativeQuery = true)
    Integer findDoctorIdByUser(Integer doctorId);


    @Query(value = "SELECT * from Doctor", nativeQuery = true)
    List<Object[]> getAllDoctors();
}
