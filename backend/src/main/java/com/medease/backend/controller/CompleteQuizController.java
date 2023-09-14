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

import com.medease.backend.entity.CompletQuiz;
import com.medease.backend.entity.CompleteQuizId;
import com.medease.backend.repository.AssignedRecommendationRepository;
import com.medease.backend.repository.CompleteQuizRepository;
import com.medease.backend.repository.RecommendationRepository;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/v1/completeQuiz")
public class CompleteQuizController {
    private final RecommendationRepository recommendationRepository;
    private final AssignedRecommendationRepository assignedRecommendationRepository;
    private final CompleteQuizRepository completeQuizRepository;

    public CompleteQuizController(RecommendationRepository recommendationRepository,
            AssignedRecommendationRepository assignedRecommendationRepository,
            CompleteQuizRepository completeQuizRepository) {
        this.recommendationRepository = recommendationRepository;
        this.completeQuizRepository = completeQuizRepository;
        this.assignedRecommendationRepository = assignedRecommendationRepository;
    }

    @GetMapping("/{patient_id}/{week_number}")
    public ResponseEntity<?> getAllCompletedQuizzes(@PathVariable("patient_id") Integer patientId,
            @PathVariable("week_number") Integer weekNumber) {
        System.out.println("user id: " + patientId);
        System.out.println("week number: " + weekNumber);

        // get all assigned recommendations
        var assignedRecommendations = this.assignedRecommendationRepository.findByAssigenedUserId(patientId);

        // for each assigned recommendation, get the recommendation details
        var recommendations = assignedRecommendations.stream().map(assignedRecommendation -> {
            return this.recommendationRepository.findById(assignedRecommendation.getAssignedRecommendationId())
                    .orElse(null);
        }).toList();

        var completedQuizzes = this.completeQuizRepository.findByAssigenedUserIdAndWeekNumber(patientId, weekNumber);

        var response = new HashMap<String, Object>();
        response.put("recommendations", recommendations);
        response.put("completedQuizzes", completedQuizzes);

        return ResponseEntity.ok(response);

    }

    @PostMapping("/mark")
    public ResponseEntity<?> markComplete(@RequestBody CompletQuiz completQuiz) {
        System.out.println(completQuiz);

        // if quiz already exists, remove it. else add it
        var id = new CompleteQuizId(completQuiz.getAssigenedUserId(), completQuiz.getAssignedRecommendationId(),
                completQuiz.getWeekNumber(), completQuiz.getDayNumber());
        if (this.completeQuizRepository.existsById(id)) {
            this.completeQuizRepository.delete(completQuiz);
        } else {
            this.completeQuizRepository.save(completQuiz);
        }

        return ResponseEntity.ok("success");
    }
}
