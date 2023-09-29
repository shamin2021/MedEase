package com.medease.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.medease.backend.entity.AssignedRecommendation;
import com.medease.backend.repository.AssignedRecommendationRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AssignedRecommendationService {

    private final AssignedRecommendationRepository assignedRecommendationRepository;

    public List<AssignedRecommendation> getAssignedRecommendations(Integer patientId, Integer weekNumber) {
        System.out.println("Getting data for (user, week number): " + patientId + " " + weekNumber);
        var assignedRecommendations = this.assignedRecommendationRepository
                .findByAssigenedUserIdAndAssignedWeek(patientId, weekNumber);

        // if assigned recommendation is empty, get the previous week's recommendation
        for (int i = 0; i < 8; i++) {
            if (assignedRecommendations.isEmpty()) {
                weekNumber = DateHandleService.getPreviousWeekNumberByWeekNumber(weekNumber);
                System.out.println("Getting data for (user, week number): " + patientId + " " + weekNumber);
                assignedRecommendations = this.assignedRecommendationRepository
                        .findByAssigenedUserIdAndAssignedWeek(patientId, weekNumber);
            } else {
                break;
            }
        }

        return assignedRecommendations;
    }
}
