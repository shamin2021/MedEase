package com.medease.backend.service;

import com.medease.backend.dto.DoctorDTO;
import com.medease.backend.dto.GlobalResponseDTO;
import com.medease.backend.dto.RegisterRequestDTO;
import com.medease.backend.repository.DoctorRepository;
import com.medease.backend.repository.DoctorSpecialityRepository;
import com.medease.backend.repository.UserImageRepository;
import com.medease.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DoctorService {

    private final DoctorRepository doctorRepository;
    private final UserRepository userRepository;
    private final DoctorSpecialityRepository doctorSpecialityRepository;
    private final UploadService uploadService;

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

    // for profile update
    public RegisterRequestDTO getDoctorProfile(Integer userId) {
        var doctor = doctorRepository.findDoctorInfo(userId);
        var doctorInfo = doctor.split(",");
        var doctorUser = userRepository.retrieveDoctorUser(userId);
        String[] doctorDetailsSplit = doctorUser.split(",");
        var doctorSpeciality = doctorSpecialityRepository.findSpecialityById(Integer.parseInt(doctorInfo[2].trim()));

        //to get profile image
        String profileImage = uploadService.retrieveProfileImage(userId);


        return RegisterRequestDTO.builder()
                .firstname(doctorDetailsSplit[1].trim())
                .lastname(doctorDetailsSplit[2].trim())
                .email(doctorDetailsSplit[3].trim())
                .mobileNumber(!doctorDetailsSplit[4].trim().equals("null") ? doctorDetailsSplit[4].trim() : null)
                .doctor_speciality(doctorSpeciality)
                .licenseNumber(doctorInfo[1].trim())
                .image(profileImage)
                .build();
    }

    public GlobalResponseDTO updateProfile(Integer userId, RegisterRequestDTO registerRequestDTO) {

        var user = userRepository.findById(userId).orElseThrow();
        user.setMobileNumber(registerRequestDTO.getMobileNumber());

        userRepository.save(user);

        return  GlobalResponseDTO.builder()
                .message("Successfully Updated")
                .status(200)
                .build();

    }

    public GlobalResponseDTO updateProfileWithImage(Integer userId, MultipartFile image, String mobileNumber) throws IOException {

        var user = userRepository.findById(userId).orElseThrow();
        user.setMobileNumber(mobileNumber);

        userRepository.save(user);

        uploadService.editImage(image,user);

        return  GlobalResponseDTO.builder()
                .message("Successfully Updated")
                .status(200)
                .build();
    }
}
