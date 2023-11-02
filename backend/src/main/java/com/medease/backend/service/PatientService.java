package com.medease.backend.service;

import com.medease.backend.dto.*;
import com.medease.backend.entity.*;
import com.medease.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Base64;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PatientService {

    private final UserRepository userRepository;
    private final PatientRepository patientRepository;
    private final HLCRepository hlcRepository;
    private final DoctorRepository doctorRepository;
    private final UserImageRepository userImageRepository;
    private final HLCChangeRequestRepository hlcChangeRequestRepository;
    private final PrescriptionRepository prescriptionRepository;
    private final UploadService uploadService;

    @Transactional
    public List<PatientDTO> getAllPatients() {
        List<Object[]> patientUsers = userRepository.retrievePatientList();
        List<PatientDTO> patientDTOList = new ArrayList<>();

        for (Object[] patientUser : patientUsers) {
            var patientUserId = (Integer) patientUser[0];
            Patient patient = patientRepository.findPatient(patientUserId).orElseThrow();
            HLC patientHLC = hlcRepository.findById(patient.getPatient_hlc().getHlc_id()).orElseThrow();
            var profileImage = userImageRepository.findByUserId(patientUserId).orElse(null);

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
                    .profileImage(profileImage != null ? Base64.getEncoder().encodeToString(profileImage.getImage()) : null)
                    .user_profile_id(patientUserId)
                    .build();
            patientDTOList.add(patientDTO);
        }

        return patientDTOList;
    }

    public RegisterRequestDTO getPatientProfile(Integer userId) {

        var patient = patientRepository.findPatient(userId).orElseThrow();
        var patientUser = userRepository.retrievePatientUser(userId);
        var patientInfo = patientUser.split(",");
        var hlcName = hlcRepository.findHLCNameByHLCId(patient.getPatient_hlc().getHlc_id());
        var requested = hlcChangeRequestRepository.findRequestedByID(userId).orElse(null);
        var enabledHLc = userRepository.findById(userId).orElseThrow().getEnabled();
        System.out.println(enabledHLc);

        //to get profile image
        String profileImage = uploadService.retrieveProfileImage(userId);

        return RegisterRequestDTO.builder()
                .firstname(patientInfo[1].trim())
                .lastname(patientInfo[2].trim())
                .email(patientInfo[3].trim())
                .mobileNumber(!patientInfo[4].trim().equals("null") ? patientInfo[4].trim() : null)
                .address(patient.getCurrent_address())
                .emergencyContact(patient.getEmergency_contact_number())
                .emergencyName(patient.getEmergency_name())
                .gender(patient.getGender())
                .dob(patient.getDob())
                .hlc_name(enabledHLc ? hlcName : "Disabled")
                .requested(requested != null ? requested.getRequested() : null)
                .image(profileImage)
                .build();

    }

    public GlobalResponseDTO changeHLCRequest(Integer userId, ChangeRequestDTO changeRequestDTO) {

        var requested = hlcChangeRequestRepository.findRequestedByID(userId).orElse(null);
        System.out.println(changeRequestDTO.getHlc_id());

        if(requested == null) {
            var user = User.builder()
                    .id(userId)
                    .build();

            var hlc = HLC.builder()
                    .hlc_id(Integer.parseInt(changeRequestDTO.getHlc_id()))
                    .build();


            var request = HLCChangeRequest.builder()
                    .requested_hlc(hlc)
                    .requested_user(user)
                    .requested(1)
                    .reason(changeRequestDTO.getReason())
                    .accepted(0)
                    .build();

            hlcChangeRequestRepository.save(request);
        }
        else{
            var hlc = HLC.builder()
                    .hlc_id(Integer.parseInt(changeRequestDTO.getHlc_id()))
                    .build();

            requested.setRequested_hlc(hlc);
            requested.setReason(changeRequestDTO.getReason());
            requested.setRequested(1);
            requested.setAccepted(0);
            hlcChangeRequestRepository.save(requested);
        }

        return  GlobalResponseDTO.builder()
                .message("Successfully Requested")
                .status(200)
                .build();
    }

    public GlobalResponseDTO updateProfile(Integer userId, RegisterRequestDTO registerRequestDTO) {

        var user = userRepository.findById(userId).orElseThrow();
        user.setMobileNumber(registerRequestDTO.getMobileNumber());

        userRepository.save(user);

        var patient = patientRepository.findPatient(userId).orElseThrow();
        patient.setCurrent_address(registerRequestDTO.getAddress());
        patient.setEmergency_name(registerRequestDTO.getEmergencyName());
        patient.setEmergency_contact_number(registerRequestDTO.getEmergencyContact());
        patientRepository.save(patient);

        return  GlobalResponseDTO.builder()
                .message("Successfully Updated")
                .status(200)
                .build();

    }

    public GlobalResponseDTO updateProfileWithImage(Integer userId, MultipartFile image, String mobileNumber, String emergencyContact, String emergencyName, String address) throws IOException {

        var user = userRepository.findById(userId).orElseThrow();
        user.setMobileNumber(mobileNumber);

        userRepository.save(user);

        var patient = patientRepository.findPatient(userId).orElseThrow();
        patient.setCurrent_address(address);
        patient.setEmergency_name(emergencyName);
        patient.setEmergency_contact_number(emergencyContact);
        patientRepository.save(patient);

        uploadService.editImage(image,user);

        return  GlobalResponseDTO.builder()
                .message("Successfully Updated")
                .status(200)
                .build();
    }

    public Integer getPatientCount() {
        return (int) patientRepository.count();
    }

    public PatientDTO getPersonalDetails(Integer userId) {

        var patientUser = userRepository.findById(userId).orElseThrow();
        var patient = patientRepository.findPatient(userId).orElseThrow();
        var profileImage = uploadService.retrieveProfileImage(userId);

        return PatientDTO.builder()
                .firstname(patientUser.getFirstname())
                .lastname(patientUser.getLastname())
                .dob(patient.getDob())
                .gender(patient.getGender())
                .profileImage(profileImage)
                .build();

    }

    public GlobalResponseDTO addPrescription(Integer userId, MultipartFile prescription, Integer doctor) {

        var doctorId = doctorRepository.findDoctorIdByUser(doctor);
        var doctorObj = Doctor.builder()
                .doctor_id(doctorId)
                .build();

        var user = userRepository.findById(userId).orElseThrow();

        uploadService.uploadPrescription(prescription, user, doctorObj);

        return  GlobalResponseDTO.builder()
                .message("Successfully Added")
                .status(200)
                .build();

    }

    public List<PrescriptionDTO> getPrescriptions(Integer userId) {

        return uploadService.retrievePrescriptions(userId);

    }
}
