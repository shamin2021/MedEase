package com.medease.backend.repository;

import com.medease.backend.entity.Meeting;
import com.medease.backend.entity.Patient;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MeetingRepository extends JpaRepository<Meeting, Integer> {
    @Query(value = "SELECT * FROM meetings WHERE meeting_doctor_id = :doctorId AND cancelled = 0", nativeQuery = true)
    List<Object[]> findDoctorMeetings(Integer doctorId);

    @Query(value = "SELECT * FROM meetings WHERE meeting_patient_id = :patientID AND cancelled = 0", nativeQuery = true)
    List<Object[]> findPatientMeetings(Integer patientID);

    Integer countByPatient(Patient patient);

    @Query(value = """
            SELECT DATE(start) AS meeting_date, COUNT(*) AS meeting_count
            FROM meetings
            WHERE meeting_doctor_id = :doctorId
            GROUP BY DATE(start)
            ORDER BY DATE(start);""", nativeQuery = true)
    List<Object> findMeetingCountByDate(Integer doctorId);

    @Query(value = """
            SELECT u.firstname, u.lastname, m.start, s.risk 
            FROM _user u, patient p, meetings m, selfassessments s 
            WHERE u.id=p.patient_id AND m.meeting_patient_id = patient_id AND s.patient=u.id 
            AND m.meeting_doctor_id = :doctorId
        """, nativeQuery = true)
    List<Object> getRecentMeetingList(Integer doctorId);
}
