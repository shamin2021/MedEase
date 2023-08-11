package com.medease.backend.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


import com.medease.backend.entity.SelfAssessment;


import lombok.RequiredArgsConstructor;
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
import com.medease.backend.service.SelfAssessmentService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
@RequiredArgsConstructor
public class SelfAssessmentController {

	private final SelfAssessmentRepository SelfAssessmentRepository;
	private final SelfAssessmentService selfAssessmentService;
	
	// get all SelfAssessments
	@GetMapping("/SelfAssessments")
	public List<SelfAssessment> getAllSelfAssessments(){
		return SelfAssessmentRepository.findAll();
	}		
	
	// create SelfAssessment rest api
	@PostMapping("/SelfAssessments")
	public SelfAssessment createSelfAssessment(@RequestBody SelfAssessment SelfAssessment) {
		return SelfAssessmentRepository.save(selfAssessmentService.createSelfAssessment(SelfAssessment));
	}
	
	// get SelfAssessment by id rest api
	@GetMapping("/SelfAssessments/{id}")
	public ResponseEntity<SelfAssessment> getSelfAssessmentById(@PathVariable Integer id) {
		SelfAssessment SelfAssessment = SelfAssessmentRepository.findById(id)
				.orElseThrow(() -> new CustomException("SelfAssessment not exist with id :" + id));
		return ResponseEntity.ok(SelfAssessment);
	}
	
}