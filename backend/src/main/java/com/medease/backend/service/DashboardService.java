package com.medease.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.medease.backend.entity.MedicalTest;
import com.medease.backend.entity.SelfAssessment;
import com.medease.backend.repository.MedicalTestRepository;
import com.medease.backend.repository.UserRepository;
import com.medease.backend.repository.SelfAssessmentRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final SelfAssessmentRepository selfAssessmentRepository;
    private final MedicalTestRepository medicalTestRepository;
    private final UserRepository userRepository;
    private final AssignedRecommendationService assignedRecommendationService;
    private final MeetingService meetingService;

    public Object getPatientDashboard(Integer id) {
        return new Object() {
            public final Integer selfAssessmentsCount = selfAssessmentRepository.countByPatient(id);
            public final Integer appointmentsCount = meetingService.getMeetingCountByPatientId(id);
            public final Integer lifeStyleRecommendationsCount = assignedRecommendationService
                    .getAssignedRecommendationCount(id);
            public final Integer hlcVisitsCount = 0;
            public final Integer treatmentsCount = 0;
            public final SelfAssessment lastSelfAssessment = selfAssessmentRepository.findTopByPatientOrderByIdDesc(id);
            public final MedicalTest medicalTest = medicalTestRepository.findBySelfAssessment(lastSelfAssessment);
            public final String user = userRepository.retrieveFirstName(id);
        };

    }
}
