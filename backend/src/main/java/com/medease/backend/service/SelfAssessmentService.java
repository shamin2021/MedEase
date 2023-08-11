package com.medease.backend.service;

import com.medease.backend.Exception.CustomException;
// import com.medease.backend.dto.GlobalResponseDTO;
// import com.medease.backend.dto.RegisterRequestDTO;
import com.medease.backend.dto.SelfAssessmentDTO;
import com.medease.backend.entity.SelfAssessment;
import com.medease.backend.repository.SelfAssessmentRepository;
import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
// import org.springframework.web.bind.annotation.GetMapping;


@Service
@RequiredArgsConstructor
public class SelfAssessmentService {

    private  final SelfAssessmentRepository selfAssessmentRepository;

    public List<SelfAssessment> getAllSelfAssessments() {
        return selfAssessmentRepository.findAll();
    }

    public SelfAssessment createSelfAssessment(SelfAssessment selfAssessment) {
        var assessment = SelfAssessment.builder(
            .first
            .build();
            // selfAssessmentDTO.getFirstName(),
            // selfAssessmentDTO.getLastName(), 
            // selfAssessmentDTO.getEmailId(), 
            // selfAssessmentDTO.getphysicalActivity(), 
            // selfAssessmentDTO.gettobaccoSmoking(), 
            // selfAssessmentDTO.getbeetlechewing(), 
            // selfAssessmentDTO.getalcoholConsumption(), 
            // selfAssessmentDTO.getotherSubstance(), 
            // selfAssessmentDTO.getsnackIntake(), 
            // selfAssessmentDTO.getheartDisease(), 
            // selfAssessmentDTO.getHighBloodPressure(), 
            // selfAssessmentDTO.getStroke(), 
            // selfAssessmentDTO.getCancer(), 
            // selfAssessmentDTO.getCOPD(), 
            // selfAssessmentDTO.getAsthma(), 
            // selfAssessmentDTO.getkidneyDiseases(), 
            // selfAssessmentDTO.getsuddenDeath(), 
            // selfAssessmentDTO.getotherDiseases()

            
        );
        return selfAssessmentRepository.save(selfAssessment);
    }


    public SelfAssessment getSelfAssessmentById(Integer id) {
        return selfAssessmentRepository.findById(id)
                .orElseThrow(() -> new CustomException("SelfAssessment not exist with id :" + id));
    }
}