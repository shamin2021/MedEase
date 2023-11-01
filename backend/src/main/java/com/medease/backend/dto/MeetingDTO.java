package com.medease.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MeetingDTO {
    private Integer meeting_id;
    private String type;
    private Integer doctor;
    private String doctor_name;
    private Integer patient;
    private String patient_name;
    private Timestamp start;
    private Timestamp end;
    private String meetingUrl;
    private Integer cancelled;
}

