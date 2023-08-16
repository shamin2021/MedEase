package com.medease.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.medease.backend.entity.Recommendation;
import com.medease.backend.repository.RecommendationRepository;

@RestController
@RequestMapping("/api/v1/recommendation")
public class RecommendationController {

    private final RecommendationRepository recommendationRepository;

    public RecommendationController(RecommendationRepository recommendationRepository) {
        this.recommendationRepository = recommendationRepository;
    }

    @GetMapping("")
    public ResponseEntity<?> getLifestyleInstruction() {
        return ResponseEntity.ok(this.recommendationRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getLifestyleInstructionById(@PathVariable("id") Integer id) {
        return ResponseEntity.ok(this.recommendationRepository.findById(id));
    }

    @PostMapping("")
    public ResponseEntity<?> createLifestyleInstruction(@RequestBody Recommendation lifestyleInstruction) {
        return ResponseEntity.ok(this.recommendationRepository.save(lifestyleInstruction));
    }

}
