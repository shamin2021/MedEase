package com.medease.backend.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

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
import com.medease.backend.repository.CompleteQuizRepository;
import com.medease.backend.repository.RecommendationRepository;
import com.medease.backend.service.AssignedRecommendationService;
import com.medease.backend.service.DateHandleService;

import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/v1/completeQuiz")
@RequiredArgsConstructor
public class CompleteQuizController {
    private final RecommendationRepository recommendationRepository;
    private final CompleteQuizRepository completeQuizRepository;

    private final AssignedRecommendationService assignedRecommendationService;

    @GetMapping("/dashboard/{patient_id}/{page}")
    public ResponseEntity<?> getDashboardData(@PathVariable("patient_id") Integer patientId,
            @PathVariable("page") Integer page) {
        System.out.println("Calling getDashboardData()");
        System.out.println("User_id: " + patientId);
        System.out.println("Page: " + page);

        // get id of the last record of the user
        int lastRecordWeekNumber = this.assignedRecommendationService.getLastRecordWeekNumber(patientId);
        System.out.println("Last record number: " + lastRecordWeekNumber);
        var response = new HashMap<String, Object>();
        List<HashMap<String, Object>> weeklyQuizzes = new ArrayList<>();

        response.put("isLastPage", false);

        if(lastRecordWeekNumber == 0) {
            response.put("weeklyQuizzes", weeklyQuizzes);
            return ResponseEntity.ok(response);
        }
        
        int startFrom = (page - 1) * 10;
        int endFrom = page * 10;

        for (int i = startFrom + 1; i <= endFrom; i++) {

            int weekNumber = DateHandleService.getNPreviousWeek(i);
            if (weekNumber < lastRecordWeekNumber) {
                response.put("isLastPage", true);
                break;
            }

            var weekRes = new HashMap<String, Object>();

            // get all assigned recommendations
            var assignedRecommendations = this.assignedRecommendationService.getAssignedRecommendations(patientId,
                    weekNumber);

            // for each assigned recommendation, get the recommendation details
            var recommendations = assignedRecommendations.stream().map(assignedRecommendation -> {
                return this.recommendationRepository.findById(assignedRecommendation.getAssignedRecommendationId())
                        .orElse(null);
            }).toList();

            System.out.println("Get all completed quizzes " + patientId + " " + weekNumber);
            var completedQuizzes = this.completeQuizRepository.findByAssigenedUserIdAndWeekNumber(patientId,
                    weekNumber);

            weekRes.put("weekNumber", weekNumber);
            weekRes.put("recommendations", recommendations);
            weekRes.put("completedQuizzes", completedQuizzes);

            weeklyQuizzes.add(weekRes);
        }
        response.put("weeklyQuizzes", weeklyQuizzes);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{patient_id}")
    public ResponseEntity<?> getAllCompletedQuizzes(@PathVariable("patient_id") Integer patientId) {
        System.out.println("Calling getAllCompletedQuizzes()");
        System.out.println("User_id: " + patientId);

        int weekNumber = DateHandleService.getCurrentWeekNumber();
        System.out.println("WeekNumber: " + weekNumber);

        // get all assigned recommendations
        var assignedRecommendations = this.assignedRecommendationService.getAssignedRecommendations(patientId,
                weekNumber);

        // for each assigned recommendation, get the recommendation details
        var recommendations = assignedRecommendations.stream().map(assignedRecommendation -> {
            return this.recommendationRepository.findById(assignedRecommendation.getAssignedRecommendationId())
                    .orElse(null);
        }).toList();

        // get all completed quizzes
        System.out.println("Get all completed quizzes " + patientId + " " + weekNumber);
        var completedQuizzes = this.completeQuizRepository.findByAssigenedUserIdAndWeekNumber(patientId, weekNumber);

        var response = new HashMap<String, Object>();
        response.put("recommendations", recommendations);
        response.put("completedQuizzes", completedQuizzes);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{patient_id}/{quiz_id}")
    public ResponseEntity<?> getCompletedQuizzesById(@PathVariable("patient_id") Integer patientId,
            @PathVariable("quiz_id") Integer quizId) {
        System.out.println("Calling getCompletedQuizzesById()");
        System.out.println("User_id: " + patientId);
        System.out.println("WeekNumber: " + quizId);

        // get all assigned recommendations
        var assignedRecommendations = this.assignedRecommendationService.getAssignedRecommendations(patientId,
                quizId);

        // for each assigned recommendation, get the recommendation details
        var recommendations = assignedRecommendations.stream().map(assignedRecommendation -> {
            return this.recommendationRepository.findById(assignedRecommendation.getAssignedRecommendationId())
                    .orElse(null);
        }).toList();

        // get all completed quizzes
        System.out.println("Get all completed quizzes " + patientId + " " + quizId);
        var completedQuizzes = this.completeQuizRepository.findByAssigenedUserIdAndWeekNumber(patientId, quizId);

        var response = new HashMap<String, Object>();
        response.put("recommendations", recommendations);
        response.put("completedQuizzes", completedQuizzes);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/mark")
    public ResponseEntity<?> markComplete(@RequestBody CompletQuiz completQuiz) {
        System.out.println("Calling markComplete()");
        System.out.println("CompleteQuiz " + completQuiz);

        int weekNumber = DateHandleService.getCurrentWeekNumber();

        if (weekNumber == -1) {
            return ResponseEntity.badRequest().body("Invalid date");
        }

        completQuiz.setWeekNumber(weekNumber);
        try {
            // if quiz already exists, remove it. else add it
            var completeQuizId = new CompleteQuizId(
                    completQuiz.getAssigenedUserId(),
                    completQuiz.getAssignedRecommendationId(),
                    completQuiz.getWeekNumber(),
                    completQuiz.getDayNumber());

            if (this.completeQuizRepository.existsById(completeQuizId)) {
                this.completeQuizRepository.deleteById(completeQuizId);
                System.out.println("Quiz record deleted");
            } else {
                this.completeQuizRepository.save(completQuiz);
                System.out.println("Quiz record added");
            }

            return ResponseEntity.ok("success");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Invalid request");
        }
    }
}
