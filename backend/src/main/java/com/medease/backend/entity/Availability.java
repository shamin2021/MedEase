package com.medease.backend.entity;

import com.medease.backend.enumeration.MeetingType;
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
@Table(name = "availability")
public class Availability {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer availability_id;

    @ManyToOne
    @JoinColumn(name = "availability_doctor_id" , referencedColumnName = "doctor_id")
    private Doctor doctor;

    @Enumerated(EnumType.STRING)
    private MeetingType meetingType;

    @ManyToOne
    @JoinColumn(name = "availability_hlc_id" , referencedColumnName = "hlc_id")
    private HLC availableHLC;

    @Column(name = "start_time")
    private LocalDateTime start;

    @Column(name = "end_time")
    private LocalDateTime end;

}
