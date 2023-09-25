package com.medease.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "meetings")
public class Meeting {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer meeting_id;

    @Column(name = "meeting_start_time")
    private LocalDateTime start;

    @Column(name = "meeting_end_time")
    private LocalDateTime end;

    @OneToOne
    @JoinColumn(name = "meeting_doctor_id" , referencedColumnName = "doctor_id")
    private Doctor doctor;

    @OneToOne
    @JoinColumn(name = "meeting_patient_id" , referencedColumnName = "patient_id")
    private Patient patient;

    @Column(unique = true)
    private String meetingURL;

}
