package com.medease.backend.service;

import com.medease.backend.dto.AuthenticationResponseDTO;
import com.medease.backend.dto.GlobalResponseDTO;
import com.medease.backend.dto.RegisterRequestDTO;
import com.medease.backend.entity.Doctor;
import com.medease.backend.entity.DoctorSpeciality;
import com.medease.backend.entity.User;
import com.medease.backend.enumeration.Role;
import com.medease.backend.repository.DoctorRepository;
import com.medease.backend.repository.DoctorSpecialityRepository;
import com.medease.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserRegistrationService {

    private final DoctorSpecialityRepository doctorSpecialityRepository;
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final AuthenticationService authenticationService;
    private final DoctorRepository doctorRepository;

    public List<DoctorSpeciality> getSpecialities() {
        return doctorSpecialityRepository.findAll();
    }

    public GlobalResponseDTO addDoctor(RegisterRequestDTO registerRequestDTO) {

        var user = User.builder()
                .firstname(registerRequestDTO.getFirstname())
                .lastname(registerRequestDTO.getLastname())
                .email(registerRequestDTO.getEmail())
                .mobileNumber(registerRequestDTO.getMobileNumber())
                .role(Role.DOCTOR)
                .activated(Boolean.FALSE)
                .build();

        var savedUser = userRepository.save(user);
        var jwtToken = jwtService.generateToken(user);
        authenticationService.saveUserToken(savedUser, jwtToken);

        DoctorSpeciality doctorSpeciality = DoctorSpeciality.builder()
                .speciality_id(registerRequestDTO.getSpeciality())
                .build();

        var doctor = Doctor.builder()
                .doctor_user(user)
                .license_number(registerRequestDTO.getLicenseNumber())
                .speciality(doctorSpeciality)
                .build();

        doctorRepository.save(doctor);

        return GlobalResponseDTO.builder()
                .status(200)
                .message("Doctor Registered Successfully")
                .build();
    }
}
