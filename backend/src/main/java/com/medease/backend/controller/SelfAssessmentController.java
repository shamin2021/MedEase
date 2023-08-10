package com.medease.backend.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


import com.medease.backend.entity.SelfAssessment;


import org.springframework.http.ResponseEntity;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.medease.backend.Exception.CustomException;
import com.medease.backend.repository.SelfAssessmentRepository;

@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/api/v1/")
public class SelfAssessmentController {

	@Autowired
	private SelfAssessmentRepository SelfAssessmentRepository;
	
	// get all SelfAssessments
	@GetMapping("/SelfAssessments")
	public List<SelfAssessment> getAllSelfAssessments(){
		return SelfAssessmentRepository.findAll();
	}		
	
	// create SelfAssessment rest api
	@PostMapping("/SelfAssessments")
	public SelfAssessment createSelfAssessment(@RequestBody SelfAssessment SelfAssessment) {
		return SelfAssessmentRepository.save(SelfAssessment);
	}
	
	// get SelfAssessment by id rest api
	@GetMapping("/SelfAssessments/{id}")
	public ResponseEntity<SelfAssessment> getSelfAssessmentById(@PathVariable Long id) {
		SelfAssessment SelfAssessment = SelfAssessmentRepository.findById(id)
				.orElseThrow(() -> new CustomException("SelfAssessment not exist with id :" + id));
		return ResponseEntity.ok(SelfAssessment);
	}
	
	// update SelfAssessment rest api
	
	@PutMapping("/SelfAssessments/{id}")
	public ResponseEntity<SelfAssessment> updateSelfAssessment(@PathVariable Long id, @RequestBody SelfAssessment SelfAssessmentDetails){
		SelfAssessment SelfAssessment = SelfAssessmentRepository.findById(id)
				.orElseThrow(() -> new CustomException("SelfAssessment not exist with id :" + id));
		
		SelfAssessment.setFirstName(SelfAssessmentDetails.getFirstName());
		SelfAssessment.setLastName(SelfAssessmentDetails.getLastName());
		SelfAssessment.setEmailId(SelfAssessmentDetails.getEmailId());
		SelfAssessment.setcheckboxValue(SelfAssessmentDetails.getcheckboxValue());
		SelfAssessment.setphysicalActivity(SelfAssessmentDetails.getphysicalActivity());
		SelfAssessment.settobaccoSmoking(SelfAssessmentDetails.gettobaccoSmoking());
		SelfAssessment.setbeetlechewing(SelfAssessmentDetails.getbeetlechewing());
		SelfAssessment.setalcoholConsumption(SelfAssessmentDetails.getalcoholConsumption());
		SelfAssessment.setotherSubstance(SelfAssessmentDetails.getotherSubstance());
		SelfAssessment.setsnackIntake(SelfAssessmentDetails.getsnackIntake());

		SelfAssessment.setheartDisease(SelfAssessmentDetails.getheartDisease());
		SelfAssessment.setHighBloodPressure(SelfAssessmentDetails.getHighBloodPressure());
		SelfAssessment.setStroke(SelfAssessmentDetails.getStroke());
		SelfAssessment.setDiabetes(SelfAssessmentDetails.getDiabetes());
		SelfAssessment.setCancer(SelfAssessmentDetails.getCancer());
		SelfAssessment.setCOPD(SelfAssessmentDetails.getCOPD());
		SelfAssessment.setAsthma(SelfAssessmentDetails.getAsthma());
		SelfAssessment.setkidneyDiseases(SelfAssessmentDetails.getkidneyDiseases());
		SelfAssessment.setsuddenDeath(SelfAssessmentDetails.getsuddenDeath());
		SelfAssessment.setotherDiseases(SelfAssessmentDetails.getotherDiseases());
		// SelfAssessment.setotherSubstance(SelfAssessmentDetails.getotherSubstance());
		
		SelfAssessment updatedSelfAssessment = SelfAssessmentRepository.save(SelfAssessment);
		return ResponseEntity.ok(updatedSelfAssessment);
	}
	
	// delete SelfAssessment rest api
	@DeleteMapping("/SelfAssessments/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteSelfAssessment(@PathVariable Long id){
		SelfAssessment SelfAssessment = SelfAssessmentRepository.findById(id)
				.orElseThrow(() -> new CustomException("SelfAssessment not exist with id :" + id));
		
		SelfAssessmentRepository.delete(SelfAssessment);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
}