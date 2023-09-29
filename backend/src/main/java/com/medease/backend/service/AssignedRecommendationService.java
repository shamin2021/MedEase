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
        if (assignedRecommendations.isEmpty()) {
            int lastRecordWeekNumber = this.getLastRecordWeekNumber(patientId);

            if (lastRecordWeekNumber == 0) {
                return assignedRecommendations;
            }

            while (true) {
                weekNumber = DateHandleService.getPreviousWeekNumberByWeekNumber(weekNumber);
                if (weekNumber < lastRecordWeekNumber) {
                    break;
                } else if (assignedRecommendations.isEmpty()) {
                    System.out.println("Getting data for (user, week number): " + patientId + " " + weekNumber);
                    assignedRecommendations = this.assignedRecommendationRepository
                            .findByAssigenedUserIdAndAssignedWeek(patientId, weekNumber);
                } else {
                    try {
                        for (int i = 0; i < assignedRecommendations.size(); i++) {
                            AssignedRecommendation ar = assignedRecommendations.get(i);
                            ar.setAssignedWeek(weekNumber);
                            this.assignedRecommendationRepository.save(ar);
                        }
                    } catch (Exception e) {
                        System.out.println("Error in saving previous weeks recommendations for this week: " + e);
                    }

                    break;
                }
            }
        }

        return assignedRecommendations;
    }

    public Integer getLastRecordWeekNumber(Integer userId) {
        var lastRecord = this.assignedRecommendationRepository.findTopByAssigenedUserIdOrderByAssignedWeekDesc(userId);
        if (lastRecord == null) {
            return 0;
        }

        return lastRecord.getAssignedWeek();
    }
}
