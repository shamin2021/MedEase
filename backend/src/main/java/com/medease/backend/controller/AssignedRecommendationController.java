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

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/v1/assignedRecommendation")
public class AssignedRecommendationController {

    private final AssignedRecommendationRepository assignedRecommendationRepository;

    public AssignedRecommendationController(AssignedRecommendationRepository assignedRecommendationRepository) {
        this.assignedRecommendationRepository = assignedRecommendationRepository;
    }

    @GetMapping("/{user_id}")
    public ResponseEntity<?> getAllAssignedRecommendations(@PathVariable("user_id") Integer userId) {
        System.out.println("user id: " + userId);
        return ResponseEntity.ok(this.assignedRecommendationRepository.findByAssigenedUserId(userId));
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
