package com.medease.backend.controller;

import com.medease.backend.dto.AvailabilityDTO;
import com.medease.backend.dto.GlobalResponseDTO;
import com.medease.backend.dto.HLCDTO;
import com.medease.backend.service.HLCService;
import com.medease.backend.service.MeetingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/meetings")
@RequiredArgsConstructor
public class MeetingController {

    private final MeetingService meetingService;
    private final HLCService hlcService;

    @GetMapping("/getAvailableSlots/{doctorId}")
    public List<AvailabilityDTO> getMeetings(@PathVariable Integer doctorId) {
        return meetingService.getMeetings(doctorId);
    }

    @PostMapping("/addSchedule")
    public ResponseEntity<GlobalResponseDTO> addScheduling(@RequestBody AvailabilityDTO availabilityDTO){
        return ResponseEntity.ok(meetingService.addScheduling(availabilityDTO));
    }

    @GetMapping("/getHLCForSchedule")
    public ResponseEntity<List<HLCDTO>> getHLCListForSchedule(){
        return ResponseEntity.ok(hlcService.getHLCListForSchedule());
    }

    @DeleteMapping("/removeScheduling/{id}")
    public ResponseEntity<GlobalResponseDTO> removeScheduling(@PathVariable Integer id){
        return ResponseEntity.ok(meetingService.removeScheduling(id));
    }

}
