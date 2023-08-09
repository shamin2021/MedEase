package com.medease.backend.service;

import com.medease.backend.dto.AuthenticationResponseDTO;
import com.medease.backend.dto.GlobalResponseDTO;
import com.medease.backend.dto.RegisterRequestDTO;
import com.medease.backend.entity.Doctor;
import com.medease.backend.entity.DoctorSpeciality;
import com.medease.backend.entity.HLC;
import com.medease.backend.entity.User;
import com.medease.backend.enumeration.Role;
import com.medease.backend.repository.DoctorRepository;
import com.medease.backend.repository.DoctorSpecialityRepository;
import com.medease.backend.repository.HlcRepository;
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
    private final HlcRepository hlcRepository;

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

    public GlobalResponseDTO addHlc(RegisterRequestDTO registerRequestDTO) {

        var user = User.builder()
                .email(registerRequestDTO.getEmail())
                .mobileNumber(registerRequestDTO.getMobileNumber())
                .role(Role.HLC)
                .activated(Boolean.FALSE)
                .build();

        var savedUser = userRepository.save(user);
        var jwtToken = jwtService.generateToken(user);
        authenticationService.saveUserToken(savedUser, jwtToken);

        var hlc = HLC.builder()
                .hlc_name(registerRequestDTO.getHlc_name())
                .hlc_user(user)
                .moh_area(registerRequestDTO.getMoh_area())
                .phm_area(registerRequestDTO.getPhm_area())
                .phi_area(registerRequestDTO.getPhi_area())
                .gn_division(registerRequestDTO.getGn_division())
                .ds_division(registerRequestDTO.getDs_division())
                .gn_number(registerRequestDTO.getGn_number())
                .in_charge(registerRequestDTO.getIn_charge())
                .in_charge_designation(registerRequestDTO.getIn_charge_designation())
                .in_charge_email(registerRequestDTO.getIn_charge_email())
                .in_charge_mobile(registerRequestDTO.getIn_charge_mobile())
                .build();

        hlcRepository.save(hlc);

        return GlobalResponseDTO.builder()
                .status(200)
                .message("HLC Registered Successfully")
                .build();
    }
}
