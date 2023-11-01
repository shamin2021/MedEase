package com.medease.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AvailabilityDTO {

    private Integer availability_id;
    private String meetingType;
    private Integer doctor;
    private Integer availableHLC;
    private String hlcName;
    private Timestamp start;
    private Timestamp end;
    private List<Timestamp> slotStarts;
    private List<Timestamp> slotEnds;
    private Integer scheduled;

}
