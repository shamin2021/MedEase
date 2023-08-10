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

    @Autowired
    private SelfAssessmentRepository selfAssessmentRepository;

    // @Override
    public List<SelfAssessment> getAllSelfAssessments() {
        return selfAssessmentRepository.findAll();
    }

    // @Override
    public SelfAssessment createSelfAssessment(SelfAssessmentDTO selfAssessmentDTO) {
        SelfAssessment selfAssessment = new SelfAssessment(
            0, selfAssessmentDTO.getFirstName(),
            selfAssessmentDTO.getLastName()
            // ... set other properties from DTO
, null, false, false, false, false, false, false, null, false, false, false, false, false, false, false, false, false, null
        );
        return selfAssessmentRepository.save(selfAssessment);
    }

    // @Override
    public SelfAssessment updateSelfAssessment(Long id, SelfAssessmentDTO selfAssessmentDTO) {
        SelfAssessment existingSelfAssessment = selfAssessmentRepository.findById(id)
                .orElseThrow(() -> new CustomException("SelfAssessment not exist with id :" + id));
        
        existingSelfAssessment.setFirstName(selfAssessmentDTO.getFirstName());
        existingSelfAssessment.setLastName(selfAssessmentDTO.getLastName());

        
		existingSelfAssessment.setEmailId(selfAssessmentDTO.getEmailId());
		existingSelfAssessment.setcheckboxValue(selfAssessmentDTO.getcheckboxValue());
		existingSelfAssessment.setphysicalActivity(selfAssessmentDTO.getphysicalActivity());
		existingSelfAssessment.settobaccoSmoking(selfAssessmentDTO.gettobaccoSmoking());
		existingSelfAssessment.setbeetlechewing(selfAssessmentDTO.getbeetlechewing());
		existingSelfAssessment.setalcoholConsumption(selfAssessmentDTO.getalcoholConsumption());
		existingSelfAssessment.setotherSubstance(selfAssessmentDTO.getotherSubstance());
		existingSelfAssessment.setsnackIntake(selfAssessmentDTO.getsnackIntake());

		existingSelfAssessment.setheartDisease(selfAssessmentDTO.getheartDisease());
		existingSelfAssessment.setHighBloodPressure(selfAssessmentDTO.getHighBloodPressure());
		existingSelfAssessment.setStroke(selfAssessmentDTO.getStroke());
		existingSelfAssessment.setDiabetes(selfAssessmentDTO.getDiabetes());
		existingSelfAssessment.setCancer(selfAssessmentDTO.getCancer());
		existingSelfAssessment.setCOPD(selfAssessmentDTO.getCOPD());
		existingSelfAssessment.setAsthma(selfAssessmentDTO.getAsthma());
		existingSelfAssessment.setkidneyDiseases(selfAssessmentDTO.getkidneyDiseases());
		existingSelfAssessment.setsuddenDeath(selfAssessmentDTO.getsuddenDeath());
		existingSelfAssessment.setotherDiseases(selfAssessmentDTO.getotherDiseases());
		
        // ... update other properties
        
        return selfAssessmentRepository.save(existingSelfAssessment);
    }

    // @Override
    public void deleteSelfAssessment(Long id) {
        SelfAssessment selfAssessment = selfAssessmentRepository.findById(id)
                .orElseThrow(() -> new CustomException("SelfAssessment not exist with id :" + id));
        
        selfAssessmentRepository.delete(selfAssessment);
    }

    // @Override
    public SelfAssessment getSelfAssessmentById(Long id) {
        return selfAssessmentRepository.findById(id)
                .orElseThrow(() -> new CustomException("SelfAssessment not exist with id :" + id));
    }
}