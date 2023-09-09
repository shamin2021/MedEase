package com.medease.backend.controller;

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
import com.medease.backend.repository.RecommendationRepository;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/v1/assignedRecommendation")
public class AssignedRecommendationController {

    private final RecommendationRepository recommendationRepository;
    private final AssignedRecommendationRepository assignedRecommendationRepository;

    public AssignedRecommendationController(RecommendationRepository recommendationRepository,
            AssignedRecommendationRepository assignedRecommendationRepository) {
        this.recommendationRepository = recommendationRepository;
        this.assignedRecommendationRepository = assignedRecommendationRepository;
    }

    @GetMapping("/{patient_id}")
    public ResponseEntity<?> getAllAssignedRecommendations(@PathVariable("patient_id") Integer patientId) {
        System.out.println("user id: " + patientId);
        return ResponseEntity.ok(this.assignedRecommendationRepository.findByAssigenedUserId(patientId));
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
