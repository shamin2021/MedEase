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

    @Query(value = "SELECT * FROM Availability WHERE meeting_type = :meetType AND availability_doctor_id = :doctorId", nativeQuery = true)
    List<Object> findMeetingCountByTypeDoc(String meetType,Integer doctorId);

    @Query(value = """
            SELECT DATE(start_time) AS meeting_date, COUNT(*) AS meeting_count
            FROM availability
            GROUP BY DATE(start_time)
            ORDER BY DATE(start_time);""", nativeQuery = true)
    List<Object> findMeetingCountByDate();

    @Query(value = """
            SELECT h.hlc_name,a.start_time,a.end_time FROM
            hlc h, availability
            a WHERE a.availability_hlc_id=h.hlc_id 
            AND availability_doctor_id = :doctorId""", nativeQuery = true)
    List<Object> getPhysicalVisists(Integer doctorId);

    
}
