package com.medease.backend.controller;

import java.util.HashMap;

import com.medease.backend.repository.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.medease.backend.entity.AssignedRecommendation;
import com.medease.backend.entity.UserRecommendationId;
import com.medease.backend.service.AssignedRecommendationService;
import com.medease.backend.service.DateHandleService;
import com.medease.backend.service.PatientService;

import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/v1/assignedRecommendation")
@RequiredArgsConstructor
public class AssignedRecommendationController {

    private final RecommendationRepository recommendationRepository;
    private final AssignedRecommendationRepository assignedRecommendationRepository;
    private final AssignedRecommendationService assignedRecommendationService;
    private final UserRepository userRepository;
    private final HLCRepository hlcRepository;
    private final PatientRepository patientRepository;
    private final SelfAssessmentRepository selfAssessmentRepository;

    private final PatientService patientService;

    @GetMapping("/{patient_id}")
    public ResponseEntity<?> getAllAssignedRecommendations(@PathVariable("patient_id") Integer patientId) {
        System.out.println("Calling getAllAssignedRecommendations()");
        System.out.println("User id: " + patientId);
        var patientName = userRepository.findById(patientId).orElseThrow().getFirstname() + " " + userRepository.findById(patientId).orElseThrow().getLastname();
        var patientHlc = patientRepository.findPatient(patientId).orElseThrow().getPatient_hlc().getHlc_id();
        var patientHlcName = hlcRepository.findById(patientHlc).orElseThrow().getHlc_name();
        var recentAssessment = selfAssessmentRepository.findRecentAssessmentById(patientId);
        var recentDiabetesAssessment = selfAssessmentRepository.findRecentDiabetesAssessmentById(patientId);
        System.out.println(selfAssessmentRepository.findRecentAssessmentByIdInt(patientId));

        var userDetails = new HashMap<String, Object>();
        userDetails.put("id", patientId.toString());
        userDetails.put("name", patientName);
        userDetails.put("riskLevel", recentAssessment);
        userDetails.put("diabetesRisk",recentDiabetesAssessment);
        userDetails.put("hlcName", patientHlcName);

        int weekNumber = DateHandleService.getCurrentWeekNumber();

        var assignedRecommendations = this.assignedRecommendationService.getAssignedRecommendations(patientId,
                weekNumber);

        var response = new HashMap<String, Object>();
        response.put("userDetails", userDetails);
        response.put("assignedRecommendation", assignedRecommendations);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/patient/{patient_id}")
    public ResponseEntity<?> getAllAssignedRecommendationsWithName(@PathVariable("patient_id") Integer patientId) {
        System.out.println("Calling getAllAssignedRecommendationsWithName()");
        System.out.println("User id: " + patientId);

        // get all assigned recommendations
        int weekNumber = DateHandleService.getCurrentWeekNumber();

        var assignedRecommendations = this.assignedRecommendationService.getAssignedRecommendations(patientId,
                weekNumber);

        // for each assigned recommendation, get the recommendation details
        var recommendations = assignedRecommendations.stream().map(assignedRecommendation -> {
            return this.recommendationRepository.findById(assignedRecommendation.getAssignedRecommendationId())
                    .orElse(null);
        }).toList();

        return ResponseEntity.ok(recommendations);

    }

    @PostMapping("/assign")
    public ResponseEntity<?> assignRecommendation(@RequestBody AssignedRecommendation recommendation) {
        System.out.println("Calling assignRecommendation()");
        System.out.println(recommendation);

        int weekNumber = DateHandleService.getCurrentWeekNumber();

        if (weekNumber == -1) {
            return ResponseEntity.badRequest().body("Invalid date");
        }

        try {
            var userRecommendationId = new UserRecommendationId(
                    recommendation.getAssigenedUserId(),
                    recommendation.getAssignedRecommendationId(),
                    weekNumber);

            // if recommendation already exists, remove it. else add it
            if (this.assignedRecommendationRepository.existsById(userRecommendationId)) {
                this.assignedRecommendationRepository.deleteById(userRecommendationId);
            } else {
                recommendation.setAssignedWeek(weekNumber);
                this.assignedRecommendationRepository.save(recommendation);
            }
            return ResponseEntity.ok("success");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Invalid recommendation");
        }
    }
}
