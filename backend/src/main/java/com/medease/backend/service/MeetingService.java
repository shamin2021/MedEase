package com.medease.backend.service;

import com.medease.backend.dto.AvailabilityDTO;
import com.medease.backend.dto.GlobalResponseDTO;
import com.medease.backend.dto.MeetingDTO;
import com.medease.backend.entity.Availability;
import com.medease.backend.entity.Doctor;
import com.medease.backend.entity.HLC;
import com.medease.backend.entity.Meeting;
import com.medease.backend.enumeration.MeetingType;
import com.medease.backend.repository.AvailabilityRepository;
import com.medease.backend.repository.DoctorRepository;
import com.medease.backend.repository.MeetingRepository;
import com.medease.backend.repository.PatientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class MeetingService {

    private final MeetingRepository meetingRepository;
    private final AvailabilityRepository availabilityRepository;
    private final DoctorRepository doctorRepository;
    private final PatientRepository patientRepository;

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
                    .scheduled(0)
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
                        .scheduled(0)
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

    public GlobalResponseDTO scheduleMeeting(MeetingDTO meetingDTO) {

        var doctorID = doctorRepository.findDoctorIdByUser(meetingDTO.getDoctor());
        var patient = patientRepository.findPatient(meetingDTO.getPatient()).orElseThrow();

        Doctor doctor = Doctor.builder()
                .doctor_id(doctorID)
                .build();

        Meeting meeting = Meeting.builder()
                .start(meetingDTO.getStart().toLocalDateTime())
                .end(meetingDTO.getEnd().toLocalDateTime())
                .doctor(doctor)
                .patient(patient)
                .cancelled(0)
                .build();

        meetingRepository.save(meeting);

        return GlobalResponseDTO.builder()
                .status(200)
                .message("Successfully scheduled")
                .build();
    }

    public GlobalResponseDTO removeSlotAfterSchedule(Integer id) {

        var availability = availabilityRepository.findById(id).orElseThrow();
        availability.setScheduled(1);

        availabilityRepository.save(availability);

        return GlobalResponseDTO.builder()
                .status(200)
                .message("Successfully updated")
                .build();
    }

    public List<MeetingDTO> getScheduledMeetingsDoctor(Integer doctorId) {

        var doctorID = doctorRepository.findDoctorIdByUser(doctorId);
        List<Object[]> doctorMeetings = meetingRepository.findDoctorMeetings(doctorID);
        List<MeetingDTO> meetingDTOList = new ArrayList<>();

        for(Object[] doctorMeeting : doctorMeetings) {
            var patientDetails = patientRepository.findById((Integer) doctorMeeting[6]).orElseThrow();
            String patientName = patientDetails.getPatient_user().getFirstname() + " " + patientDetails.getPatient_user().getLastname();
            var meetingDTO = MeetingDTO.builder()
                    .meeting_id((Integer) doctorMeeting[0])
                    .patient_name(patientName)
                    .meetingUrl((String) doctorMeeting[3])
                    .start((Timestamp) doctorMeeting[4])
                    .end((Timestamp) doctorMeeting[2])
                    .build();

            meetingDTOList.add(meetingDTO);
        }

        return meetingDTOList;
    }

    public List<MeetingDTO> getScheduledMeetingsPatient(Integer patientId) {

        var patient = patientRepository.findPatient(patientId).orElseThrow();
        var patientID = patient.getPatient_id();
        List<Object[]> patientMeetings = meetingRepository.findPatientMeetings(patientID);
        List<MeetingDTO> meetingDTOList = new ArrayList<>();

        for(Object[] patientMeeting : patientMeetings) {
            var doctorDetails = doctorRepository.findById((Integer) patientMeeting[5]).orElseThrow();
            String doctorName = doctorDetails.getDoctor_user().getFirstname() + " " + doctorDetails.getDoctor_user().getLastname();
            var meetingDTO = MeetingDTO.builder()
                    .meeting_id((Integer) patientMeeting[0])
                    .doctor_name(doctorName)
                    .meetingUrl((String) patientMeeting[3])
                    .start((Timestamp) patientMeeting[4])
                    .end((Timestamp) patientMeeting[2])
                    .build();

            meetingDTOList.add(meetingDTO);
        }
        return meetingDTOList;
    }

    public GlobalResponseDTO cancelAfterSchedule(Integer meetingId) {

        var meeting = meetingRepository.findById(meetingId).orElseThrow();
        meeting.setCancelled(1);
        meetingRepository.save(meeting);

        return GlobalResponseDTO.builder()
                .status(200)
                .message("Successfully cancelled")
                .build();
    }
}
