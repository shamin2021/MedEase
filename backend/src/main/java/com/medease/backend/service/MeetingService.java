package com.medease.backend.service;

import com.medease.backend.dto.AvailabilityDTO;
import com.medease.backend.dto.GlobalResponseDTO;
import com.medease.backend.entity.Availability;
import com.medease.backend.entity.Doctor;
import com.medease.backend.entity.HLC;
import com.medease.backend.enumeration.MeetingType;
import com.medease.backend.repository.AvailabilityRepository;
import com.medease.backend.repository.DoctorRepository;
import com.medease.backend.repository.MeetingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class MeetingService {

    private final MeetingRepository meetingRepository;
    private final AvailabilityRepository availabilityRepository;
    private final DoctorRepository doctorRepository;

    public List<AvailabilityDTO> getMeetings(Integer doctorId) {
        var doctorRecordId = doctorRepository.findDoctorIdByUser(doctorId);
        List<Object[]> availableSlots = availabilityRepository.finalAvailableSlotsByDoctorId(doctorRecordId);
        List<AvailabilityDTO> availabilityDTOList = new ArrayList<>();

        for(Object[] availableSlot : availableSlots) {
            AvailabilityDTO availabilityDTO = AvailabilityDTO.builder()
                    .availability_id((Integer) availableSlot[0])
                    .end((Timestamp) availableSlot[1])
                    .meetingType((String) availableSlot[2])
                    .start((Timestamp) availableSlot[3])
                    .availableHLC((Integer) availableSlot[4])
                    .doctor((Integer) availableSlot[5])
                    .build();
            System.out.println(availabilityDTO);
            availabilityDTOList.add(availabilityDTO);
        }

        return availabilityDTOList;
    }


    public GlobalResponseDTO removeScheduling(Integer id) {

        availabilityRepository.deleteById(id);
        return GlobalResponseDTO.builder()
                .status(200)
                .message("Successfully Deleted the Scheduling")
                .build();

    }

    public GlobalResponseDTO addScheduling(AvailabilityDTO availabilityDTO) {

        MeetingType meetingType = Objects.equals(availabilityDTO.getMeetingType(), "PHYSICAL") ? MeetingType.PHYSICAL : MeetingType.VIRTUAL;
        var doctorID = doctorRepository.findDoctorIdByUser(availabilityDTO.getDoctor());

        Doctor doctor = Doctor.builder()
                .doctor_id(doctorID)
                .build();

        HLC hlc = HLC.builder()
                .hlc_id(availabilityDTO.getAvailableHLC())
                .build();

        if(meetingType == MeetingType.PHYSICAL){
            var schedule = Availability.builder()
                    .start(availabilityDTO.getStart().toLocalDateTime())
                    .end(availabilityDTO.getEnd().toLocalDateTime())
                    .meetingType(meetingType)
                    .doctor(doctor)
                    .availableHLC(hlc)
                    .build();

            availabilityRepository.save(schedule);

            return GlobalResponseDTO.builder()
                    .status(200)
                    .message("Successfully added TimeRange")
                    .build();
        } else {

            var meetingStartTimes = availabilityDTO.getSlotStarts();
            var meetingEndTimes = availabilityDTO.getSlotEnds();
            var listSize = meetingStartTimes.size();

            for (int i = 0; i < listSize; i++) {
                Timestamp meetingStartTime = meetingStartTimes.get(i);
                Timestamp meetingEndTime = meetingEndTimes.get(i);

                Availability schedule = Availability.builder()
                        .start(meetingStartTime.toLocalDateTime())
                        .end(meetingEndTime.toLocalDateTime())
                        .meetingType(meetingType)
                        .doctor(doctor)
                        .build();

                availabilityRepository.save(schedule);
            }

            return GlobalResponseDTO.builder()
                    .status(200)
                    .message("Successfully added TimeSlots")
                    .build();
        }
    }
}
