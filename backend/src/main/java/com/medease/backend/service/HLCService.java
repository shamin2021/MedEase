package com.medease.backend.service;

import com.medease.backend.dto.ChangeRequestDTO;
import com.medease.backend.dto.GlobalResponseDTO;
import com.medease.backend.dto.HLCDTO;
import com.medease.backend.dto.RegisterRequestDTO;
import com.medease.backend.entity.HLC;
import com.medease.backend.entity.HLCChangeRequest;
import com.medease.backend.repository.*;
import com.medease.backend.repository.HLCRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class HLCService {

    private final HLCRepository hlcRepository;
    private final UserRepository userRepository;
    private final HLCMapRepository hlcMapRepository;
    private final PatientRepository patientRepository;
    private final HLCChangeRequestRepository hlcChangeRequestRepository;
    private final UploadService uploadService;

    // hlc list for setting availability by doctor
    public List<HLCDTO> getHLCListForSchedule() {
        List<Object[]> hlcList = hlcRepository.findAllHlcNames();
        System.out.println(hlcList);
        List<HLCDTO> hlcdtoList = new ArrayList<>();

        for (Object[] hlc : hlcList) {
            HLCDTO hlcdto = HLCDTO.builder()
                    .hlc_id((Integer) hlc[0])
                    .hlc_name((String) hlc[1])
                    .build();

            hlcdtoList.add(hlcdto);
        }
        System.out.println(hlcdtoList);
        return hlcdtoList;
    }


    public RegisterRequestDTO getHlcProfile(Integer userId) {

        var hlc = hlcRepository.findHLCById(userId);
        var hlcInfo = hlc.split(",");
        var hlcUser = userRepository.retrieveHLCUser(userId);
        String[] hlcDetailsSplit = hlcUser.split(",");
        var locationInfo = hlcMapRepository.findHLCMapById(Integer.parseInt(hlcInfo[11].trim()));
        var locationArray = locationInfo.split(",");

        //to get profile image
        String profileImage = uploadService.retrieveProfileImage(userId);

        return RegisterRequestDTO.builder()
                .hlc_name(hlcInfo[0].trim())
                .mobileNumber(!hlcDetailsSplit[2].trim().equals("null") ? hlcDetailsSplit[2].trim() : null)
                .email(hlcDetailsSplit[1].trim())
                .moh_area(!hlcInfo[1].trim().equals("null") ? hlcInfo[1].trim() : null)
                .longitude(!locationArray[0].trim().equals("null") ? locationArray[0].trim() : null)
                .latitude(!locationArray[1].trim().equals("null") ? locationArray[1].trim() : null)
                .image(profileImage)
                .gn_number(!hlcInfo[2].trim().equals("null") ? hlcInfo[2].trim() : null)
                .gn_division(!hlcInfo[3].trim().equals("null") ? hlcInfo[3].trim() : null)
                .ds_division(!hlcInfo[4].trim().equals("null") ? hlcInfo[4].trim() : null)
                .phi_area(!hlcInfo[5].trim().equals("null") ? hlcInfo[5].trim() : null)
                .phm_area(!hlcInfo[6].trim().equals("null") ? hlcInfo[6].trim() : null)
                .in_charge(!hlcInfo[7].trim().equals("null") ? hlcInfo[7].trim() : null)
                .in_charge_designation(!hlcInfo[8].trim().equals("null") ? hlcInfo[8].trim() : null)
                .in_charge_email(!hlcInfo[9].trim().equals("null") ? hlcInfo[9].trim() : null)
                .in_charge_mobile(!hlcInfo[10].trim().equals("null") ? hlcInfo[10].trim() : null)
                .build();
    }

    public GlobalResponseDTO updateProfile(Integer userId, RegisterRequestDTO registerRequestDTO) {

        var user = userRepository.findById(userId).orElseThrow();
        user.setMobileNumber(registerRequestDTO.getMobileNumber());
        userRepository.save(user);

        var hlc = hlcRepository.findHLC(userId).orElseThrow();
        hlc.setMoh_area(registerRequestDTO.getMoh_area());
        hlc.setPhm_area(registerRequestDTO.getPhm_area());
        hlc.setPhi_area(registerRequestDTO.getPhi_area());
        hlc.setGn_division(registerRequestDTO.getGn_division());
        hlc.setDs_division(registerRequestDTO.getDs_division());
        hlc.setGn_number(registerRequestDTO.getGn_number());
        hlc.setIn_charge(registerRequestDTO.getIn_charge());
        hlc.setIn_charge_email(registerRequestDTO.getIn_charge_email());
        hlc.setIn_charge_mobile(registerRequestDTO.getIn_charge_mobile());
        hlc.setIn_charge_designation(registerRequestDTO.getIn_charge_designation());
        hlcRepository.save(hlc);

        var hlcMap = hlcMapRepository.findHLCMap(hlc.getHlc_id()).orElseThrow();
        hlcMap.setLongitude(registerRequestDTO.getLongitude());
        hlcMap.setLatitude(registerRequestDTO.getLatitude());
        hlcMapRepository.save(hlcMap);

        return  GlobalResponseDTO.builder()
                .message("Successfully Updated")
                .status(200)
                .build();
    }

    public GlobalResponseDTO updateProfileWithImage(Integer userId, MultipartFile image, String mobileNumber, String longitude, String latitude, String mohArea, String phmArea, String phiArea, String gnDivision, String dsDivision, String gnNumber, String incharge, String inchargeMail, String inchargeMobile, String designation) throws IOException {

        var user = userRepository.findById(userId).orElseThrow();
        user.setMobileNumber(mobileNumber);
        userRepository.save(user);

        var hlc = hlcRepository.findHLC(userId).orElseThrow();
        hlc.setMoh_area(mohArea);
        hlc.setPhm_area(phmArea);
        hlc.setPhi_area(phiArea);
        hlc.setGn_division(gnDivision);
        hlc.setDs_division(dsDivision);
        hlc.setGn_number(gnNumber);
        hlc.setIn_charge(incharge);
        hlc.setIn_charge_email(inchargeMail);
        hlc.setIn_charge_mobile(inchargeMobile);
        hlc.setIn_charge_designation(designation);
        hlcRepository.save(hlc);

        var hlcMap = hlcMapRepository.findHLCMap(hlc.getHlc_id()).orElseThrow();
        hlcMap.setLongitude(longitude);
        hlcMap.setLatitude(latitude);
        hlcMapRepository.save(hlcMap);

        uploadService.editImage(image,user);

        return  GlobalResponseDTO.builder()
                .message("Successfully Updated")
                .status(200)
                .build();

    }

    public List<ChangeRequestDTO> getRequests(Integer userId) {

        var hlc = hlcRepository.findHLC(userId).orElseThrow();
        var requests = hlcChangeRequestRepository.findRequestByHLC(hlc.getHlc_id());
        List<ChangeRequestDTO> changeRequestDTOS = new ArrayList<>();

        for(HLCChangeRequest request : requests){
            var user = userRepository.findById(request.getRequested_user().getId()).orElseThrow();
            System.out.println(user.getLastname());
            var changeRequestDTO = ChangeRequestDTO.builder()
                    .firstname(user.getFirstname())
                    .lastname(user.getLastname())
                    .reason(request.getReason())
                    .hlc_name(hlc.getHlc_name())
                    .request_id(request.getRequest_id())
                    .build();

            changeRequestDTOS.add(changeRequestDTO);
        }
        return changeRequestDTOS;
    }

    public GlobalResponseDTO acceptRequest(ChangeRequestDTO changeRequestDTO) {

        var request = hlcChangeRequestRepository.findById(changeRequestDTO.getRequest_id()).orElseThrow();
        request.setAccepted(1);
        request.setRequested(0);
        hlcChangeRequestRepository.save(request);

        var patient = patientRepository.findPatient(request.getRequested_user().getId()).orElseThrow();
        var hlc = HLC.builder()
                        .hlc_id(request.getRequested_hlc().getHlc_id())
                        .build();

        patient.setPatient_hlc(hlc);
        patientRepository.save(patient);

        return  GlobalResponseDTO.builder()
                .message("Successfully Accepted")
                .status(200)
                .build();
    }

    public GlobalResponseDTO rejectRequest(ChangeRequestDTO changeRequestDTO) {

        var request = hlcChangeRequestRepository.findById(changeRequestDTO.getRequest_id()).orElseThrow();
        request.setRequested(0);
        request.setAccepted(0);
        hlcChangeRequestRepository.save(request);

        return  GlobalResponseDTO.builder()
                .message("Successfully Rejected")
                .status(200)
                .build();
    }

    public Integer getHlcCount() {
        return (int) hlcRepository.count();
    }

    public List<RegisterRequestDTO> getHLCList() {

        var hlcList = hlcRepository.findAll();
        List<RegisterRequestDTO> hlcdtoList = new ArrayList<>();

        for(HLC hlc : hlcList) {
            var hlcUser = hlc.getHlc_user().getId();
            var user = userRepository.findById(hlcUser).orElseThrow();

            var hlcDto = RegisterRequestDTO.builder()
                    .user_id(hlcUser)
                    .hlc_name(hlc.getHlc_name())
                    .mobileNumber(user.getMobileNumber())
                    .email(user.getEmail())
                    .moh_area(hlc.getMoh_area())
                    .gn_number(hlc.getGn_number())
                    .gn_division(hlc.getGn_division())
                    .ds_division(hlc.getDs_division())
                    .phi_area(hlc.getPhi_area())
                    .phm_area(hlc.getPhm_area())
                    .in_charge(hlc.getIn_charge())
                    .in_charge_designation(hlc.getIn_charge_designation())
                    .in_charge_email(hlc.getIn_charge_email())
                    .in_charge_mobile(hlc.getIn_charge_mobile())
                    .build();
            hlcdtoList.add(hlcDto);
        }

        return hlcdtoList;

    }
}
