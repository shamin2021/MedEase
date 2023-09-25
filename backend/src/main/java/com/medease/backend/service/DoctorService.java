package com.medease.backend.service;

import com.medease.backend.dto.DoctorDTO;
import com.medease.backend.repository.DoctorRepository;
import com.medease.backend.repository.DoctorSpecialityRepository;
import com.medease.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DoctorService {

    private final DoctorRepository doctorRepository;
    private final UserRepository userRepository;
    private final DoctorSpecialityRepository doctorSpecialityRepository;

    public List<DoctorDTO> getDoctors() {

        var doctors = doctorRepository.getAllDoctors();
        List<DoctorDTO> doctorDTOList = new ArrayList<>();
        System.out.println(doctors);

        for (Object[] doctor : doctors){
            var doctorUserID = (Integer) doctor[2];
            String doctorUser = userRepository.retrieveDoctorUser(doctorUserID);
            String[] doctorDetailsSplit = doctorUser.split(",");
            var doctorSpeciality = doctorSpecialityRepository.findSpecialityById((Integer) doctor[3]);

            DoctorDTO doctorDTO = DoctorDTO.builder()
                    .doctor_id((Integer) doctor[0])
                    .doctor_license_number((String) doctor[1])
                    .doctor_speciality(doctorSpeciality)
                    .firstname(doctorDetailsSplit[1].trim())
                    .lastname(doctorDetailsSplit[2].trim())
                    .email(doctorDetailsSplit[3].trim())
                    .mobileNumber(doctorDetailsSplit[4].trim())
                    .doctor_user_id(Integer.parseInt(doctorDetailsSplit[0].trim()))
                    .build();

            doctorDTOList.add(doctorDTO);
        }
        return doctorDTOList;

    }
}
