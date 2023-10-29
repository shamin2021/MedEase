package com.medease.backend.service;

import com.medease.backend.dto.GlobalResponseDTO;
import com.medease.backend.dto.RegisterRequestDTO;
import com.medease.backend.entity.*;
import com.medease.backend.enumeration.Role;
import com.medease.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserRegistrationService {

    private final DoctorSpecialityRepository doctorSpecialityRepository;
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final AuthenticationService authenticationService;
    private final DoctorRepository doctorRepository;
    private final HLCRepository hlcRepository;
    private final HLCMapRepository hlcMapRepository;
    private final UploadService uploadService;

    private final PasswordEncoder passwordEncoder;

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
                .enabled(Boolean.TRUE)
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

    public GlobalResponseDTO addDoctorWithImage(String email, String firstname, String lastname, String licenseNumber, String mobileNumber, Integer speciality, MultipartFile image) {

        var user = User.builder()
                .firstname(firstname)
                .lastname(lastname)
                .email(email)
                .mobileNumber(mobileNumber)
                .role(Role.DOCTOR)
                .activated(Boolean.FALSE)
                .enabled(Boolean.TRUE)
                .build();

        var savedUser = userRepository.save(user);
        var jwtToken = jwtService.generateToken(user);
        authenticationService.saveUserToken(savedUser, jwtToken);

        DoctorSpeciality doctorSpeciality = DoctorSpeciality.builder()
                .speciality_id(speciality)
                .build();

        var doctor = Doctor.builder()
                .doctor_user(user)
                .license_number(licenseNumber)
                .speciality(doctorSpeciality)
                .build();

        doctorRepository.save(doctor);

        // to upload image
        uploadService.uploadImage(image,user);

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
                .enabled(Boolean.TRUE)
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

        var hlcMap = HLCMap.builder()
                .hlc(hlc)
                .longitude(registerRequestDTO.getLongitude())
                .latitude(registerRequestDTO.getLatitude())
                .build();

        hlcMapRepository.save(hlcMap);

        return GlobalResponseDTO.builder()
                .status(200)
                .message("HLC Registered Successfully")
                .build();
    }

    public GlobalResponseDTO addHlcWithImage(String hlc_name, MultipartFile image, String mobileNumber, String email, String moh_area, String longitude, String latitude, String phm_area, String phi_area, String gn_division, String ds_division, String gn_number, String in_charge, String in_charge_designation, String in_charge_email, String in_charge_mobile) {

        var user = User.builder()
                .email(email)
                .mobileNumber(mobileNumber)
                .role(Role.HLC)
                .activated(Boolean.FALSE)
                .enabled(Boolean.TRUE)
                .build();

        var savedUser = userRepository.save(user);
        var jwtToken = jwtService.generateToken(user);
        authenticationService.saveUserToken(savedUser, jwtToken);

        var hlc = HLC.builder()
                .hlc_name(hlc_name)
                .hlc_user(user)
                .moh_area(moh_area)
                .phm_area(phm_area)
                .phi_area(phi_area)
                .gn_division(gn_division)
                .ds_division(ds_division)
                .gn_number(gn_number)
                .in_charge(in_charge)
                .in_charge_designation(in_charge_designation)
                .in_charge_email(in_charge_email)
                .in_charge_mobile(in_charge_mobile)
                .build();

        hlcRepository.save(hlc);

        var hlcMap = HLCMap.builder()
                .hlc(hlc)
                .longitude(longitude)
                .latitude(latitude)
                .build();

        hlcMapRepository.save(hlcMap);

        if(image != null) {
            uploadService.uploadImage(image,user);
        }

        return GlobalResponseDTO.builder()
                .status(200)
                .message("HLC Registered Successfully")
                .build();
    }
}
