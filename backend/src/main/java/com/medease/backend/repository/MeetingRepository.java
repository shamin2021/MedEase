package com.medease.backend.repository;

import com.medease.backend.entity.Meeting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MeetingRepository extends JpaRepository<Meeting, Integer> {
    @Query(value = "SELECT * FROM meetings WHERE meeting_doctor_id = :doctorId AND cancelled = 0", nativeQuery = true)
    List<Object[]> findDoctorMeetings(Integer doctorId);

    @Query(value = "SELECT * FROM meetings WHERE meeting_patient_id = :patientID AND cancelled = 0", nativeQuery = true)
    List<Object[]> findPatientMeetings(Integer patientID);
}
