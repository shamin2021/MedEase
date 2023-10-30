package com.medease.backend.controller;

import com.medease.backend.dto.ChangeRequestDTO;
import com.medease.backend.dto.GlobalResponseDTO;
import com.medease.backend.dto.RegisterRequestDTO;
import com.medease.backend.service.HLCService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/v1/hlc")
@RequiredArgsConstructor
public class HLCController {

    private final HLCService hlcService;

    @GetMapping("/getHlcProfile/{userId}")
    public RegisterRequestDTO getHlcProfile(@PathVariable Integer userId) {
        return hlcService.getHlcProfile(userId);
    }

    @PutMapping("/updateProfile/{userId}")
    public ResponseEntity<GlobalResponseDTO> updateProfile(@PathVariable Integer userId, @RequestBody RegisterRequestDTO registerRequestDTO){
        return ResponseEntity.ok(hlcService.updateProfile(userId, registerRequestDTO));
    }

    @PutMapping("/updateProfileWithImage/{userId}")
    public ResponseEntity<GlobalResponseDTO> updateProfileWithImage(
            @PathVariable Integer userId,
            @RequestParam("image") MultipartFile image,
            @RequestParam("mobileNumber") String mobileNumber,
            @RequestParam("longitude") String longitude,
            @RequestParam("latitude") String latitude,
            @RequestParam("mohArea") String mohArea,
            @RequestParam("phmArea") String phmArea,
            @RequestParam("phiArea") String phiArea,
            @RequestParam("gnDivision") String gnDivision,
            @RequestParam("dsDivision") String dsDivision,
            @RequestParam("gnNumber") String gnNumber,
            @RequestParam("incharge") String incharge,
            @RequestParam("inchargeMail") String inchargeMail,
            @RequestParam("inchargeMobile") String inchargeMobile,
            @RequestParam("designation") String designation
    ) throws IOException {
        return ResponseEntity.ok(hlcService.updateProfileWithImage(userId, image, mobileNumber, longitude, latitude, mohArea, phmArea, phiArea, gnDivision, dsDivision, gnNumber, incharge, inchargeMail, inchargeMobile, designation));
    }

    @GetMapping("/getRequests/{userId}")
    public List<ChangeRequestDTO> getRequests(@PathVariable Integer userId) {
        return hlcService.getRequests(userId);
    }

    @PostMapping("/acceptRequest")
    public ResponseEntity<GlobalResponseDTO> acceptRequest(@RequestBody ChangeRequestDTO changeRequestDTO) {
        return ResponseEntity.ok(hlcService.acceptRequest(changeRequestDTO));
    }

    @PostMapping("/rejectRequest")
    public ResponseEntity<GlobalResponseDTO> rejectRequest(@RequestBody ChangeRequestDTO changeRequestDTO) {
        return ResponseEntity.ok(hlcService.rejectRequest(changeRequestDTO));
    }


}
