package com.medease.backend.service;

import com.medease.backend.dto.PatientDTO;
import com.medease.backend.entity.Patient;
import com.medease.backend.repository.PatientRepository;
import com.medease.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PatientService {

    private final UserRepository userRepository;
    private final PatientRepository patientRepository;

    public List<PatientDTO> getAllPatients() {
        List<Object[]> patientUsers = userRepository.retrievePatientList();
        List<PatientDTO> patientDTOList = new ArrayList<>();
        List<Patient> patients = patientRepository.findAll();

        for(Patient patient : patients) {
            PatientDTO patientDTO = PatientDTO.builder()
                    .build();
            patientDTOList.add(patientDTO);
        }

        return patientDTOList;
    }
}
