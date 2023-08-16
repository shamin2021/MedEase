package com.medease.backend.controller;

import com.medease.backend.dto.GlobalResponseDTO;
import com.medease.backend.dto.MeetingDTO;
import com.medease.backend.entity.Meeting;
import com.medease.backend.entity.SelfAssessment;
import com.medease.backend.enumeration.Risk;
import com.medease.backend.repository.DoctorRepository;
import com.medease.backend.repository.MeetingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/v1/")
@RequiredArgsConstructor
public class MeetingController {

    private final MeetingRepository meetingRepository;

    @PostMapping("ScheduleMeeting")
    public GlobalResponseDTO scheduleMeeting(@RequestBody MeetingDTO meetingDTO) {

        var meeting = Meeting.builder()
                .type(meetingDTO.getType())
                .start(meetingDTO.getStart())
                .end(meetingDTO.getEnd())
                .build();

        meetingRepository.save(meeting);

        return GlobalResponseDTO.builder()
                .status(200)
                .message("Meeting Saved Successfully")
                .build();
    }

    @GetMapping("getMeetings")
    public List<Meeting> getMeeting() {
        return meetingRepository.findAll();
    }

    @DeleteMapping("removeMeeting/{id}")
    public GlobalResponseDTO deleteMeeting(@PathVariable Integer id){
        meetingRepository.deleteById(id);

        return GlobalResponseDTO.builder()
                .status(200)
                .message("Deleted Meeting")
                .build();
    }

}
