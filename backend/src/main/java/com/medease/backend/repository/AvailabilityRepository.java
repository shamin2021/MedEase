package com.medease.backend.repository;

import com.medease.backend.entity.Availability;

import org.antlr.v4.runtime.atn.SemanticContext.AND;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AvailabilityRepository extends JpaRepository<Availability, Integer> {


    @Query(value = "SELECT * FROM Availability WHERE availability_doctor_id = :doctorId AND scheduled = 0", nativeQuery = true)
    List<Object[]> finalAvailableSlotsByDoctorId(Integer doctorId);

    @Query(value = "SELECT * FROM Availability WHERE meeting_type = :meetType ", nativeQuery = true)
    List<Object> findMeetingCountByType(String meetType);

}
