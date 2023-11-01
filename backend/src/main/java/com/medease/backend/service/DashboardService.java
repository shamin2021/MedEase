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
    private final PatientService patientService;
    private final DoctorService doctorService;
    private final HLCService hlcService;

    public Object getPatientDashboard(Integer id) {
        
        return new Object() {
            public final Integer selfAssessmentsCount = selfAssessmentRepository.countByPatient(id);
            public final Integer appointmentsCount = meetingService.getMeetingCountByPatientId(id);
            public final Integer lifeStyleRecommendationsCount = assignedRecommendationService
                    .getAssignedRecommendationCount(id);
            public final Integer hlcVisitsCount = 0;
            public final Integer treatmentsCount = 0;
            SelfAssessment lastSelfAssessment = selfAssessmentRepository.findTopByPatientOrderByIdDesc(id);
            public final MedicalTest medicalTest = medicalTestRepository.findBySelfAssessment(lastSelfAssessment);
            public final List<Object> riskArray = selfAssessmentRepository.findDateRiskByPatientOrderByDate(id);
            public final String user = userRepository.retrieveFirstName(id);
            
        };

    }

    public Object getAdminDashboard(Integer id) {
        // - assessments taken per day 
        return new Object() {
            public final Integer patientsCount = patientService.getPatientCount();
            public final Integer doctorsCount = doctorService.getDoctorCount();
            public final Integer hlcCount = hlcService.getHlcCount();
            public final Integer healthyCount = selfAssessmentRepository.findPatientCountByRisk("MINIMAL").size();
            public final Integer highRiskCount = selfAssessmentRepository.findPatientCountByRisk("HIGH").size();
        };
    }
}
