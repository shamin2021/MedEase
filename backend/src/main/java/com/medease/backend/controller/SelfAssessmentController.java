package com.medease.backend.controller;

import java.util.List;
import java.time.LocalDateTime;

import com.medease.backend.dto.GlobalResponseDTO;
import com.medease.backend.entity.SelfAssessment;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.medease.backend.Exception.CustomException;
import com.medease.backend.repository.SelfAssessmentRepository;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/v1/")
@RequiredArgsConstructor
public class SelfAssessmentController {

	private final SelfAssessmentRepository selfAssessmentRepository;
	
	// get all SelfAssessments
	@GetMapping("SelfAssessments")
	public List<SelfAssessment> getAllSelfAssessments(){
		return selfAssessmentRepository.findAll();
	}		
	
	// create SelfAssessment rest api
	@PostMapping("CreateSelfAssessment")
	public GlobalResponseDTO createSelfAssessment(@RequestBody SelfAssessment selfAssessment) {

		var assessment = SelfAssessment.builder()
				.firstName(selfAssessment.getFirstName())
				.lastName(selfAssessment.getLastName())
				.emailId(selfAssessment.getEmailId())
				.physicalActivity(selfAssessment.isPhysicalActivity())
				.tobaccoSmoking(selfAssessment.isTobaccoSmoking())
				.beetlechewing(selfAssessment.isBeetleChewing())
				.alcoholConsumption(selfAssessment.isAlcoholConsumption())
				.otherSubstance(selfAssessment.isOtherSubstance())
				.snackIntake(selfAssessment.getSnackIntake())
				.heartDisease(selfAssessment.isHeartDisease())
				.HighBloodPressure(selfAssessment.isHighBloodPressure())
				.Stroke(selfAssessment.isStroke())
				.Diabetes(selfAssessment.isDiabetes())
				.Cancer(selfAssessment.isCancer())
				.COPD(selfAssessment.isCOPD())
				.Asthma(selfAssessment.isAsthma())
				.kidneyDiseases(selfAssessment.isKidneyDiseases())
				.suddenDeath(selfAssessment.isSuddenDeath())
				.otherDiseases(selfAssessment.getOtherDiseases())
				.build();

		selfAssessmentRepository.save(assessment);
		return GlobalResponseDTO.builder()
				.status(200)
				.message("Self Assessment Saved Successfully")
				.build();
	}
	
	// get SelfAssessment by id rest api
	@GetMapping("SelfAssessments/{id}")
	public SelfAssessment getSelfAssessmentById(@PathVariable Integer id) {
		return selfAssessmentRepository.findById(id)
				.orElseThrow(() -> new CustomException("SelfAssessment not exist with id :" + id));
	}
	
}