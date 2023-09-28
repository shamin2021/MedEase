package com.medease.backend.controller;

import java.util.HashMap;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.medease.backend.entity.AssignedRecommendation;
import com.medease.backend.repository.AssignedRecommendationRepository;
import com.medease.backend.repository.PatientRepository;
import com.medease.backend.repository.RecommendationRepository;
import com.medease.backend.service.PatientService;

import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/v1/assignedRecommendation")
@RequiredArgsConstructor
public class AssignedRecommendationController {

    private final RecommendationRepository recommendationRepository;
    private final AssignedRecommendationRepository assignedRecommendationRepository;

    private final PatientService patientService;

    @GetMapping("/{patient_id}")
    public ResponseEntity<?> getAllAssignedRecommendations(@PathVariable("patient_id") Integer patientId) {
        System.out.println("user id: " + patientId);

        var userDetails = new HashMap<String, Object>();
        userDetails.put("id", patientId.toString());
        userDetails.put("name", "Shamin Fernando");
        userDetails.put("riskLevel", "High");
        userDetails.put("hlcName", "Colombo");

        var assignedRecommendation = this.assignedRecommendationRepository.findByAssigenedUserId(patientId);

        var response = new HashMap<String, Object>();
        response.put("userDetails", userDetails);
        response.put("assignedRecommendation", assignedRecommendation);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/patient/{patient_id}")
    public ResponseEntity<?> getAllAssignedRecommendationsWithName(@PathVariable("patient_id") Integer patientId) {
        System.out.println("user id: " + patientId);

        // get all assigned recommendations
        var assignedRecommendations = this.assignedRecommendationRepository.findByAssigenedUserId(patientId);

        // for each assigned recommendation, get the recommendation details
        var recommendations = assignedRecommendations.stream().map(assignedRecommendation -> {
            return this.recommendationRepository.findById(assignedRecommendation.getAssignedRecommendationId())
                    .orElse(null);
        }).toList();

        return ResponseEntity.ok(recommendations);

    }

    @PostMapping("/assign")
    public ResponseEntity<?> assignRecommendation(@RequestBody AssignedRecommendation recommendation) {
        System.out.println(recommendation);

        // if recommendation already exists, remove it. else add it
        if (this.assignedRecommendationRepository.existsByAssigenedUserIdAndAssignedRecommendationId(
                recommendation.getAssigenedUserId(),
                recommendation.getAssignedRecommendationId())) {
            this.assignedRecommendationRepository.delete(recommendation);
        } else {
            this.assignedRecommendationRepository.save(recommendation);
        }
        return ResponseEntity.ok("success");
    }
}
