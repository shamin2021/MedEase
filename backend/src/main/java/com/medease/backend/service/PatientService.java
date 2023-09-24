package com.medease.backend.service;

import com.medease.backend.dto.PatientDTO;
import com.medease.backend.entity.HLC;
import com.medease.backend.entity.Patient;
import com.medease.backend.repository.HLCRepository;
import com.medease.backend.repository.PatientRepository;
import com.medease.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PatientService {

    private final UserRepository userRepository;
    private final PatientRepository patientRepository;
    private final HLCRepository hlcRepository;

    public List<PatientDTO> getAllPatients() {
        List<Object[]> patientUsers = userRepository.retrievePatientList();
        List<PatientDTO> patientDTOList = new ArrayList<>();

        for(Object[] patientUser : patientUsers) {
            var patientUserId = (Integer) patientUser[0];
            System.out.println(patientUserId);
            Patient patient = patientRepository.findPatient(patientUserId).orElseThrow();
            HLC patientHLC = hlcRepository.findById(patient.getPatient_hlc().getHlc_id()).orElseThrow();

            PatientDTO patientDTO = PatientDTO.builder()
                    .patient_id(patient.getPatient_id())
                    .patient_hlc_name(patientHLC.getHlc_name())
                    .firstname((String) patientUser[1])
                    .lastname((String) patientUser[2])
                    .email((String) patientUser[3])
                    .mobileNumber((String) patientUser[4])
                    .phn(patient.getPhn())
                    .nic(patient.getNic())
                    .permanent_address(patient.getPermanent_address())
                    .current_address(patient.getCurrent_address())
                    .emergency_address(patient.getEmergency_address())
                    .emergency_name(patient.getEmergency_name())
                    .emergency_contact_number(patient.getEmergency_contact_number())
                    .gender(patient.getGender())
                    .home_contact_number(patient.getHome_contact_number())
                    .dob(patient.getDob())
                    .marital_status(patient.getMarital_status())
                    .highest_education_status(patient.getHighest_education_status())
                    .date_of_registration(patient.getDate_of_registration())
                    .build();
            patientDTOList.add(patientDTO);
        }

        return patientDTOList;
    }
}
