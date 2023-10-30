package com.medease.backend.controller;

import java.time.LocalDate;
import java.time.Period;
import java.util.List;
import java.time.LocalDateTime;
import java.util.Optional;

import com.medease.backend.dto.GlobalResponseDTO;
import com.medease.backend.dto.MedicalTestDTO;
import com.medease.backend.dto.SelfAssessmentDTO;
import com.medease.backend.entity.MedicalTest;
import com.medease.backend.entity.Patient;
import com.medease.backend.entity.SelfAssessment;

import com.medease.backend.enumeration.Gender;
import com.medease.backend.enumeration.Risk;
import com.medease.backend.repository.MedicalTestRepository;
import com.medease.backend.repository.PatientRepository;
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
	private final PatientRepository patientRepository;
	private final MedicalTestRepository medicalTestRepository;
	
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
				.patient(selfAssessment.getPatient())
				.risk(Risk.PENDING)
				.build();

		selfAssessmentRepository.save(assessment);
		return GlobalResponseDTO.builder()
				.status(200)
				.message("Self Assessment Saved Successfully")
				.build();
	}
	
	// get SelfAssessment by id rest api
	@GetMapping("SelfAssessments/{id}")
	public SelfAssessmentDTO getSelfAssessmentById(@PathVariable Integer id) {
		var assessment =  selfAssessmentRepository.findById(id)
				.orElseThrow(() -> new CustomException("SelfAssessment not exist with id :" + id));

		var patient = assessment.getPatient();
		System.out.println(assessment);
		var patientUser = patientRepository.findPatient(patient)
				.orElseThrow(() -> new CustomException("Patient Not Found"));

		return SelfAssessmentDTO.builder()
				.date(assessment.getDate())
				.firstName(assessment.getFirstName())
				.lastName(assessment.getLastName())
				.emailId(assessment.getEmailId())
				.physicalActivity(assessment.isPhysicalActivity())
				.tobaccoSmoking(assessment.isTobaccoSmoking())
				.beetlechewing(assessment.isBeetleChewing())
				.alcoholConsumption(assessment.isAlcoholConsumption())
				.otherSubstance(assessment.isOtherSubstance())
				.snackIntake(assessment.getSnackIntake())
				.heartDisease(assessment.isHeartDisease())
				.HighBloodPressure(assessment.isHighBloodPressure())
				.Stroke(assessment.isStroke())
				.Diabetes(assessment.isDiabetes())
				.Cancer(assessment.isCancer())
				.COPD(assessment.isCOPD())
				.Asthma(assessment.isAsthma())
				.kidneyDiseases(assessment.isKidneyDiseases())
				.suddenDeath(assessment.isSuddenDeath())
				.otherDiseases(assessment.getOtherDiseases())
				.risk(assessment.getRisk())
				.gender(patientUser.getGender())
				.dob(patientUser.getDob())
				.build();
	}

	@GetMapping("MedicalAssessments/{id}")
	public MedicalTestDTO getMedicalTestsById(@PathVariable Integer id){

		var medicalTest = medicalTestRepository.findMedicalTest(id)
				.orElseThrow(() -> new CustomException("MedicalTest not exist with id :" + id));

		return MedicalTestDTO.builder()
				.weight(medicalTest.getWeight())
				.height(medicalTest.getHeight())
				.bmi(medicalTest.getBmi())
				.waistHeightRatio(medicalTest.getWaistHeightRatio())
				.waistCircumference(medicalTest.getWaistCircumference())
				.hearingRight(medicalTest.getHearingRight())
				.hearingLeft(medicalTest.getHearingLeft())
				.visionLeft(medicalTest.getVisionLeft())
				.visionRight(medicalTest.getVisionRight())
				.oralExamination(medicalTest.getOralExamination())
				.cholesterolLvl(medicalTest.getCholesterolLvl())
				.sbp(medicalTest.getSbp())
				.fastingbloodSugar(medicalTest.getFastingbloodSugar())
				.randombloodSugar(medicalTest.getRandombloodSugar())
				.serumCreatinin(medicalTest.getSerumCreatinin())
				.lipidTg(medicalTest.getLipidTg())
				.lipidTC(medicalTest.getLipidTC())
				.lipidHDL(medicalTest.getLipidHDL())
				.lipidLDL(medicalTest.getLipidLDL())
				.lipidTCHL(medicalTest.getLipidTCHL())
				.build();
	}

	// in medical test change the state of risk which is getting from front end
	// manipulate in front end function when user input data to medical test entity
	@PostMapping("CreateMedicalTest/{id}")
	public GlobalResponseDTO createMedicalTest(@PathVariable Integer id, @RequestBody MedicalTestDTO medicalTestDTO){

		var selfAssessment =  selfAssessmentRepository.findById(id)
				.orElseThrow(() -> new CustomException("SelfAssessment not exist with id :" + id));

		var patient = selfAssessment.getPatient();
		System.out.println(selfAssessment);
		var patientUser = patientRepository.findPatient(patient)
				.orElseThrow(() -> new CustomException("Patient Not Found"));

		var gender = patientUser.getGender();
		var isSmoke = selfAssessment.isTobaccoSmoking();
		var cholesterolLvl = medicalTestDTO.getCholesterolLvl();
		var sbp = medicalTestDTO.getSbp();
		var fbs = medicalTestDTO.getFastingbloodSugar();
		var rbs = medicalTestDTO.getRandombloodSugar();
		var age = CalculateAge(patientUser.getDob());

		calculateRisk(gender,isSmoke,cholesterolLvl,sbp,fbs,rbs,age, selfAssessment);
		selfAssessmentRepository.save(selfAssessment);

//		MedicalTestDTO.
		var medicalTest = MedicalTest.builder()
				.weight(medicalTestDTO.getWeight())
				.height(medicalTestDTO.getHeight())
				.bmi(medicalTestDTO.getBmi())
				.waistCircumference(medicalTestDTO.getWaistCircumference())
				.waistHeightRatio(medicalTestDTO.getWaistHeightRatio())
				.hearingLeft(medicalTestDTO.getHearingLeft())
				.hearingRight(medicalTestDTO.getHearingRight())
				.visionRight(medicalTestDTO.getVisionRight())
				.visionLeft(medicalTestDTO.getVisionLeft())
				.oralExamination(medicalTestDTO.getOralExamination())
				.fastingbloodSugar(medicalTestDTO.getFastingbloodSugar())
				.randombloodSugar(medicalTestDTO.getRandombloodSugar())
				.serumCreatinin(medicalTestDTO.getSerumCreatinin())
				.lipidTg(medicalTestDTO.getLipidTg())
				.lipidLDL(medicalTestDTO.getLipidLDL())
				.lipidTCHL(medicalTestDTO.getLipidTCHL())
				.lipidHDL(medicalTestDTO.getLipidHDL())
				.lipidTC(medicalTestDTO.getLipidTC())
				.selfAssessment(selfAssessment)
				.build();

		System.out.println(medicalTest);

		medicalTestRepository.save(medicalTest);

		return GlobalResponseDTO.builder()
				.status(200)
				.message("Medical Test added Successfully")
				.build();

	}

	private Integer CalculateAge(LocalDate dob) {
		LocalDate currentDate = LocalDate.now();
		Period period = Period.between(dob, currentDate);
		return period.getYears();
	}

	private void calculateRisk(Gender gender, boolean isSmoke, Integer cholesterolLvl, Double sbp, Double fbs, Double rbs, Integer age, SelfAssessment selfAssessment) {
		if(gender == Gender.MALE){
			if(isSmoke) {
				if(cholesterolLvl == 4){
					if(age>=70){
						if(sbp>=180) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=160 && sbp<=179) {
							selfAssessment.setRisk(Risk.SIGNIFICANT);
						}
						else if (sbp>=140 && sbp<=159) {
							selfAssessment.setRisk(Risk.MODERATE);
						}
						else if (sbp>=120 && sbp<=139) {
							selfAssessment.setRisk(Risk.MILD);
						}
					}
					else if(age>=60 && age<=69){
						if(sbp>=180) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=160 && sbp<=179) {
							selfAssessment.setRisk(Risk.MODERATE);
						}
						else if (sbp>=140 && sbp<=159) {
							selfAssessment.setRisk(Risk.MILD);
						}
						else if (sbp>=120 && sbp<=139) {
							selfAssessment.setRisk(Risk.MINIMAL);
						}
					}
					else if(age >= 50 && age <= 59){
						if(sbp>=180) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=160 && sbp<=179) {
							selfAssessment.setRisk(Risk.MILD);
						}
						else if (sbp>=140 && sbp<=159) {
							selfAssessment.setRisk(Risk.MINIMAL);
						}
						else if (sbp>=120 && sbp<=139) {
							selfAssessment.setRisk(Risk.MINIMAL);
						}
					}
					else if (age >= 40 && age <= 49){
						if(sbp>=180) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=160 && sbp<=179) {
							selfAssessment.setRisk(Risk.MILD);
						}
						else if (sbp>=140 && sbp<=159) {
							selfAssessment.setRisk(Risk.MINIMAL);
						}
						else if (sbp>=120 && sbp<=139) {
							selfAssessment.setRisk(Risk.MINIMAL);
						}
					}else{
						selfAssessment.setRisk(Risk.MINIMAL);
					}
				}
				else if(cholesterolLvl == 5){
					if(age>=70){
						if(sbp>=180) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=160 && sbp<=179) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=140 && sbp<=159) {
							selfAssessment.setRisk(Risk.MODERATE);
						}
						else if (sbp>=120 && sbp<=139) {
							selfAssessment.setRisk(Risk.MILD);
						}
					}
					else if(age>=60 && age<=69){
						if(sbp>=180) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=160 && sbp<=179) {
							selfAssessment.setRisk(Risk.SIGNIFICANT);
						}
						else if (sbp>=140 && sbp<=159) {
							selfAssessment.setRisk(Risk.MILD);
						}
						else if (sbp>=120 && sbp<=139) {
							selfAssessment.setRisk(Risk.MINIMAL);
						}
					}
					else if(age >= 50 && age <= 59){
						if(sbp>=180) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=160 && sbp<=179) {
							selfAssessment.setRisk(Risk.MILD);
						}
						else if (sbp>=140 && sbp<=159) {
							selfAssessment.setRisk(Risk.MINIMAL);
						}
						else if (sbp>=120 && sbp<=139) {
							selfAssessment.setRisk(Risk.MINIMAL);
						}
					}
					else if (age >= 40 && age <= 49){
						if(sbp>=180) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=160 && sbp<=179) {
							selfAssessment.setRisk(Risk.MILD);
						}
						else if (sbp>=140 && sbp<=159) {
							selfAssessment.setRisk(Risk.MINIMAL);
						}
						else if (sbp>=120 && sbp<=139) {
							selfAssessment.setRisk(Risk.MINIMAL);
						}
					}else{
						selfAssessment.setRisk(Risk.MINIMAL);
					}
				}
				else if(cholesterolLvl == 6){
					if(age>=70){
						if(sbp>=180) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=160 && sbp<=179) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=140 && sbp<=159) {
							selfAssessment.setRisk(Risk.SIGNIFICANT);
						}
						else if (sbp>=120 && sbp<=139) {
							selfAssessment.setRisk(Risk.MODERATE);
						}
					}
					else if(age>=60 && age<=69){
						if(sbp>=180) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=160 && sbp<=179) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=140 && sbp<=159) {
							selfAssessment.setRisk(Risk.MODERATE);
						}
						else if (sbp>=120 && sbp<=139) {
							selfAssessment.setRisk(Risk.MILD);
						}
					}
					else if(age >= 50 && age <= 59){
						if(sbp>=180) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=160 && sbp<=179) {
							selfAssessment.setRisk(Risk.SIGNIFICANT);
						}
						else if (sbp>=140 && sbp<=159) {
							selfAssessment.setRisk(Risk.MILD);
						}
						else if (sbp>=120 && sbp<=139) {
							selfAssessment.setRisk(Risk.MINIMAL);
						}
					}
					else if (age >= 40 && age <= 49){
						if(sbp>=180) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=160 && sbp<=179) {
							selfAssessment.setRisk(Risk.MODERATE);
						}
						else if (sbp>=140 && sbp<=159) {
							selfAssessment.setRisk(Risk.MINIMAL);
						}
						else if (sbp>=120 && sbp<=139) {
							selfAssessment.setRisk(Risk.MINIMAL);
						}
					}else{
						selfAssessment.setRisk(Risk.MINIMAL);
					}
				}
				else if(cholesterolLvl == 7){
					if(age>=70){
						if(sbp>=180) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=160 && sbp<=179) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=140 && sbp<=159) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=120 && sbp<=139) {
							selfAssessment.setRisk(Risk.MODERATE);
						}
					}
					else if(age>=60 && age<=69){
						if(sbp>=180) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=160 && sbp<=179) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=140 && sbp<=159) {
							selfAssessment.setRisk(Risk.SIGNIFICANT);
						}
						else if (sbp>=120 && sbp<=139) {
							selfAssessment.setRisk(Risk.MILD);
						}
					}
					else if(age >= 50 && age <= 59){
						if(sbp>=180) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=160 && sbp<=179) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=140 && sbp<=159) {
							selfAssessment.setRisk(Risk.MODERATE);
						}
						else if (sbp>=120 && sbp<=139) {
							selfAssessment.setRisk(Risk.MILD);
						}
					}
					else if (age >= 40 && age <= 49){
						if(sbp>=180) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=160 && sbp<=179) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=140 && sbp<=159) {
							selfAssessment.setRisk(Risk.MILD);
						}
						else if (sbp>=120 && sbp<=139) {
							selfAssessment.setRisk(Risk.MINIMAL);
						}
					}else{
						selfAssessment.setRisk(Risk.MINIMAL);
					}
				}
				else if(cholesterolLvl == 8){
					if(age>=70){
						if(sbp>=180) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=160 && sbp<=179) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=140 && sbp<=159) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=120 && sbp<=139) {
							selfAssessment.setRisk(Risk.SIGNIFICANT);
						}
					}
					else if(age>=60 && age<=69){
						if(sbp>=180) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=160 && sbp<=179) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=140 && sbp<=159) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=120 && sbp<=139) {
							selfAssessment.setRisk(Risk.MODERATE);
						}
					}
					else if(age >= 50 && age <= 59){
						if(sbp>=180) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=160 && sbp<=179) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=140 && sbp<=159) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=120 && sbp<=139) {
							selfAssessment.setRisk(Risk.MODERATE);
						}
					}
					else if (age >= 40 && age <= 49){
						if(sbp>=180) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=160 && sbp<=179) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=140 && sbp<=159) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=120 && sbp<=139) {
							selfAssessment.setRisk(Risk.MODERATE);
						}
					}else{
						selfAssessment.setRisk(Risk.MINIMAL);
					}
				}
			}
			else{
				if(cholesterolLvl == 4){
					if(age>=70){
						if(sbp>=180) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=160 && sbp<=179) {
							selfAssessment.setRisk(Risk.MODERATE);
						}
						else if (sbp>=140 && sbp<=159) {
							selfAssessment.setRisk(Risk.MILD);
						}
						else if (sbp>=120 && sbp<=139) {
							selfAssessment.setRisk(Risk.MINIMAL);
						}
					}
					else if(age>=60 && age<=69){
						if(sbp>=180) {
							selfAssessment.setRisk(Risk.SIGNIFICANT);
						}
						else if (sbp>=160 && sbp<=179) {
							selfAssessment.setRisk(Risk.MODERATE);
						}
						else if (sbp>=140 && sbp<=159) {
							selfAssessment.setRisk(Risk.MINIMAL);
						}
						else if (sbp>=120 && sbp<=139) {
							selfAssessment.setRisk(Risk.MINIMAL);
						}
					}
					else if(age >= 50 && age <= 59){
						if(sbp>=180) {
							selfAssessment.setRisk(Risk.MODERATE);
						}
						else if (sbp>=160 && sbp<=179) {
							selfAssessment.setRisk(Risk.MINIMAL);
						}
						else if (sbp>=140 && sbp<=159) {
							selfAssessment.setRisk(Risk.MINIMAL);
						}
						else if (sbp>=120 && sbp<=139) {
							selfAssessment.setRisk(Risk.MINIMAL);
						}
					}
					else if (age >= 40 && age <= 49){
						if(sbp>=180) {
							selfAssessment.setRisk(Risk.MODERATE);
						}
						else if (sbp>=160 && sbp<=179) {
							selfAssessment.setRisk(Risk.MINIMAL);
						}
						else if (sbp>=140 && sbp<=159) {
							selfAssessment.setRisk(Risk.MINIMAL);
						}
						else if (sbp>=120 && sbp<=139) {
							selfAssessment.setRisk(Risk.MINIMAL);
						}
					}else{
						selfAssessment.setRisk(Risk.MINIMAL);
					}
				}
				else if(cholesterolLvl == 5){
					if(age>=70){
						if(sbp>=180) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=160 && sbp<=179) {
							selfAssessment.setRisk(Risk.MODERATE);
						}
						else if (sbp>=140 && sbp<=159) {
							selfAssessment.setRisk(Risk.MILD);
						}
						else if (sbp>=120 && sbp<=139) {
							selfAssessment.setRisk(Risk.MILD);
						}
					}
					else if(age>=60 && age<=69){
						if(sbp>=180) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=160 && sbp<=179) {
							selfAssessment.setRisk(Risk.MODERATE);
						}
						else if (sbp>=140 && sbp<=159) {
							selfAssessment.setRisk(Risk.MILD);
						}
						else if (sbp>=120 && sbp<=139) {
							selfAssessment.setRisk(Risk.MINIMAL);
						}
					}
					else if(age >= 50 && age <= 59){
						if(sbp>=180) {
							selfAssessment.setRisk(Risk.SIGNIFICANT);
						}
						else if (sbp>=160 && sbp<=179) {
							selfAssessment.setRisk(Risk.MILD);
						}
						else if (sbp>=140 && sbp<=159) {
							selfAssessment.setRisk(Risk.MINIMAL);
						}
						else if (sbp>=120 && sbp<=139) {
							selfAssessment.setRisk(Risk.MINIMAL);
						}
					}
					else if (age >= 40 && age <= 49){
						if(sbp>=180) {
							selfAssessment.setRisk(Risk.SIGNIFICANT);
						}
						else if (sbp>=160 && sbp<=179) {
							selfAssessment.setRisk(Risk.MINIMAL);
						}
						else if (sbp>=140 && sbp<=159) {
							selfAssessment.setRisk(Risk.MINIMAL);
						}
						else if (sbp>=120 && sbp<=139) {
							selfAssessment.setRisk(Risk.MINIMAL);
						}
					}else{
						selfAssessment.setRisk(Risk.MINIMAL);
					}
				}
				else if(cholesterolLvl == 6){
					if(age>=70){
						if(sbp>=180) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=160 && sbp<=179) {
							selfAssessment.setRisk(Risk.SIGNIFICANT);
						}
						else if (sbp>=140 && sbp<=159) {
							selfAssessment.setRisk(Risk.MODERATE);
						}
						else if (sbp>=120 && sbp<=139) {
							selfAssessment.setRisk(Risk.MILD);
						}
					}
					else if(age>=60 && age<=69){
						if(sbp>=180) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=160 && sbp<=179) {
							selfAssessment.setRisk(Risk.MODERATE);
						}
						else if (sbp>=140 && sbp<=159) {
							selfAssessment.setRisk(Risk.MILD);
						}
						else if (sbp>=120 && sbp<=139) {
							selfAssessment.setRisk(Risk.MINIMAL);
						}
					}
					else if(age >= 50 && age <= 59){
						if(sbp>=180) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=160 && sbp<=179) {
							selfAssessment.setRisk(Risk.MILD);
						}
						else if (sbp>=140 && sbp<=159) {
							selfAssessment.setRisk(Risk.MINIMAL);
						}
						else if (sbp>=120 && sbp<=139) {
							selfAssessment.setRisk(Risk.MINIMAL);
						}
					}
					else if (age >= 40 && age <= 49){
						if(sbp>=180) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=160 && sbp<=179) {
							selfAssessment.setRisk(Risk.MILD);
						}
						else if (sbp>=140 && sbp<=159) {
							selfAssessment.setRisk(Risk.MINIMAL);
						}
						else if (sbp>=120 && sbp<=139) {
							selfAssessment.setRisk(Risk.MINIMAL);
						}
					}else{
						selfAssessment.setRisk(Risk.MINIMAL);
					}
				}
				else if(cholesterolLvl == 7){
					if(age>=70){
						if(sbp>=180) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=160 && sbp<=179) {
							selfAssessment.setRisk(Risk.SIGNIFICANT);
						}
						else if (sbp>=140 && sbp<=159) {
							selfAssessment.setRisk(Risk.MODERATE);
						}
						else if (sbp>=120 && sbp<=139) {
							selfAssessment.setRisk(Risk.MILD);
						}
					}
					else if(age>=60 && age<=69){
						if(sbp>=180) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=160 && sbp<=179) {
							selfAssessment.setRisk(Risk.SIGNIFICANT);
						}
						else if (sbp>=140 && sbp<=159) {
							selfAssessment.setRisk(Risk.MILD);
						}
						else if (sbp>=120 && sbp<=139) {
							selfAssessment.setRisk(Risk.MILD);
						}
					}
					else if(age >= 50 && age <= 59){
						if(sbp>=180) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=160 && sbp<=179) {
							selfAssessment.setRisk(Risk.MODERATE);
						}
						else if (sbp>=140 && sbp<=159) {
							selfAssessment.setRisk(Risk.MILD);
						}
						else if (sbp>=120 && sbp<=139) {
							selfAssessment.setRisk(Risk.MINIMAL);
						}
					}
					else if (age >= 40 && age <= 49){
						if(sbp>=180) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=160 && sbp<=179) {
							selfAssessment.setRisk(Risk.MODERATE);
						}
						else if (sbp>=140 && sbp<=159) {
							selfAssessment.setRisk(Risk.MINIMAL);
						}
						else if (sbp>=120 && sbp<=139) {
							selfAssessment.setRisk(Risk.MINIMAL);
						}
					}else{
						selfAssessment.setRisk(Risk.MINIMAL);
					}
				}
				else if(cholesterolLvl == 8){
					if(age>=70){
						if(sbp>=180) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=160 && sbp<=179) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=140 && sbp<=159) {
							selfAssessment.setRisk(Risk.SIGNIFICANT);
						}
						else if (sbp>=120 && sbp<=139) {
							selfAssessment.setRisk(Risk.MODERATE);
						}
					}
					else if(age>=60 && age<=69){
						if(sbp>=180) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=160 && sbp<=179) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=140 && sbp<=159) {
							selfAssessment.setRisk(Risk.MODERATE);
						}
						else if (sbp>=120 && sbp<=139) {
							selfAssessment.setRisk(Risk.MILD);
						}
					}
					else if(age >= 50 && age <= 59){
						if(sbp>=180) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=160 && sbp<=179) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=140 && sbp<=159) {
							selfAssessment.setRisk(Risk.MODERATE);
						}
						else if (sbp>=120 && sbp<=139) {
							selfAssessment.setRisk(Risk.MILD);
						}
					}
					else if (age >= 40 && age <= 49){
						if(sbp>=180) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=160 && sbp<=179) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=140 && sbp<=159) {
							selfAssessment.setRisk(Risk.MODERATE);
						}
						else if (sbp>=120 && sbp<=139) {
							selfAssessment.setRisk(Risk.MINIMAL);
						}
					}else{
						selfAssessment.setRisk(Risk.MINIMAL);
					}
				}
			}
		}
		else if (gender == Gender.FEMALE){
			if(isSmoke){
				if(cholesterolLvl == 4){
					if(age>=70){
						if(sbp>=180) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=160 && sbp<=179) {
							selfAssessment.setRisk(Risk.SIGNIFICANT);
						}
						else if (sbp>=140 && sbp<=159) {
							selfAssessment.setRisk(Risk.MODERATE);
						}
						else if (sbp>=120 && sbp<=139) {
							selfAssessment.setRisk(Risk.MILD);
						}
					}
					else if(age>=60 && age<=69){
						if(sbp>=180) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=160 && sbp<=179) {
							selfAssessment.setRisk(Risk.SIGNIFICANT);
						}
						else if (sbp>=140 && sbp<=159) {
							selfAssessment.setRisk(Risk.MILD);
						}
						else if (sbp>=120 && sbp<=139) {
							selfAssessment.setRisk(Risk.MINIMAL);
						}
					}
					else if(age >= 50 && age <= 59){
						if(sbp>=180) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=160 && sbp<=179) {
							selfAssessment.setRisk(Risk.MODERATE);
						}
						else if (sbp>=140 && sbp<=159) {
							selfAssessment.setRisk(Risk.MINIMAL);
						}
						else if (sbp>=120 && sbp<=139) {
							selfAssessment.setRisk(Risk.MINIMAL);
						}
					}
					else if (age >= 40 && age <= 49){
						if(sbp>=180) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=160 && sbp<=179) {
							selfAssessment.setRisk(Risk.MILD);
						}
						else if (sbp>=140 && sbp<=159) {
							selfAssessment.setRisk(Risk.MINIMAL);
						}
						else if (sbp>=120 && sbp<=139) {
							selfAssessment.setRisk(Risk.MINIMAL);
						}
					}else{
						selfAssessment.setRisk(Risk.MINIMAL);
					}
				}
				else if(cholesterolLvl == 5){
					if(age>=70){
						if(sbp>=180) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=160 && sbp<=179) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=140 && sbp<=159) {
							selfAssessment.setRisk(Risk.SIGNIFICANT);
						}
						else if (sbp>=120 && sbp<=139) {
							selfAssessment.setRisk(Risk.MILD);
						}
					}
					else if(age>=60 && age<=69){
						if(sbp>=180) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=160 && sbp<=179) {
							selfAssessment.setRisk(Risk.SIGNIFICANT);
						}
						else if (sbp>=140 && sbp<=159) {
							selfAssessment.setRisk(Risk.MILD);
						}
						else if (sbp>=120 && sbp<=139) {
							selfAssessment.setRisk(Risk.MINIMAL);
						}
					}
					else if(age >= 50 && age <= 59){
						if(sbp>=180) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=160 && sbp<=179) {
							selfAssessment.setRisk(Risk.MODERATE);
						}
						else if (sbp>=140 && sbp<=159) {
							selfAssessment.setRisk(Risk.MINIMAL);
						}
						else if (sbp>=120 && sbp<=139) {
							selfAssessment.setRisk(Risk.MINIMAL);
						}
					}
					else if (age >= 40 && age <= 49){
						if(sbp>=180) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=160 && sbp<=179) {
							selfAssessment.setRisk(Risk.SIGNIFICANT);
						}
						else if (sbp>=140 && sbp<=159) {
							selfAssessment.setRisk(Risk.MILD);
						}
						else if (sbp>=120 && sbp<=139) {
							selfAssessment.setRisk(Risk.MINIMAL);
						}
					}else{
						selfAssessment.setRisk(Risk.MINIMAL);
					}
				}
				else if(cholesterolLvl == 6){
					if(age>=70){
						if(sbp>=180) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=160 && sbp<=179) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=140 && sbp<=159) {
							selfAssessment.setRisk(Risk.SIGNIFICANT);
						}
						else if (sbp>=120 && sbp<=139) {
							selfAssessment.setRisk(Risk.MODERATE);
						}
					}
					else if(age>=60 && age<=69){
						if(sbp>=180) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=160 && sbp<=179) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=140 && sbp<=159) {
							selfAssessment.setRisk(Risk.SIGNIFICANT);
						}
						else if (sbp>=120 && sbp<=139) {
							selfAssessment.setRisk(Risk.MODERATE);
						}
					}
					else if(age >= 50 && age <= 59){
						if(sbp>=180) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=160 && sbp<=179) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=140 && sbp<=159) {
							selfAssessment.setRisk(Risk.MODERATE);
						}
						else if (sbp>=120 && sbp<=139) {
							selfAssessment.setRisk(Risk.MILD);
						}
					}
					else if (age >= 40 && age <= 49){
						if(sbp>=180) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=160 && sbp<=179) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=140 && sbp<=159) {
							selfAssessment.setRisk(Risk.MILD);
						}
						else if (sbp>=120 && sbp<=139) {
							selfAssessment.setRisk(Risk.MINIMAL);
						}
					}else{
						selfAssessment.setRisk(Risk.MINIMAL);
					}
				}
				else if(cholesterolLvl == 7){
					if(age>=70){
						if(sbp>=180) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=160 && sbp<=179) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=140 && sbp<=159) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=120 && sbp<=139) {
							selfAssessment.setRisk(Risk.SIGNIFICANT);
						}
					}
					else if(age>=60 && age<=69){
						if(sbp>=180) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=160 && sbp<=179) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=140 && sbp<=159) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=120 && sbp<=139) {
							selfAssessment.setRisk(Risk.SIGNIFICANT);
						}
					}
					else if(age >= 50 && age <= 59){
						if(sbp>=180) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=160 && sbp<=179) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=140 && sbp<=159) {
							selfAssessment.setRisk(Risk.SIGNIFICANT);
						}
						else if (sbp>=120 && sbp<=139) {
							selfAssessment.setRisk(Risk.MILD);
						}
					}
					else if (age >= 40 && age <= 49){
						if(sbp>=180) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=160 && sbp<=179) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=140 && sbp<=159) {
							selfAssessment.setRisk(Risk.SIGNIFICANT);
						}
						else if (sbp>=120 && sbp<=139) {
							selfAssessment.setRisk(Risk.MILD);
						}
					}else{
						selfAssessment.setRisk(Risk.MINIMAL);
					}
				}
				else if(cholesterolLvl == 8){
					if(age>=70){
						if(sbp>=180) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=160 && sbp<=179) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=140 && sbp<=159) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=120 && sbp<=139) {
							selfAssessment.setRisk(Risk.SIGNIFICANT);
						}
					}
					else if(age>=60 && age<=69){
						if(sbp>=180) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=160 && sbp<=179) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=140 && sbp<=159) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=120 && sbp<=139) {
							selfAssessment.setRisk(Risk.SIGNIFICANT);
						}
					}
					else if(age >= 50 && age <= 59){
						if(sbp>=180) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=160 && sbp<=179) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=140 && sbp<=159) {
							selfAssessment.setRisk(Risk.SIGNIFICANT);
						}
						else if (sbp>=120 && sbp<=139) {
							selfAssessment.setRisk(Risk.MILD);
						}
					}
					else if (age >= 40 && age <= 49){
						if(sbp>=180) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=160 && sbp<=179) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=140 && sbp<=159) {
							selfAssessment.setRisk(Risk.SIGNIFICANT);
						}
						else if (sbp>=120 && sbp<=139) {
							selfAssessment.setRisk(Risk.MILD);
						}
					}else{
						selfAssessment.setRisk(Risk.MINIMAL);
					}
				}
			}
			else{
				if(cholesterolLvl == 4){
					if(age>=70){
						if(sbp>=180) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=160 && sbp<=179) {
							selfAssessment.setRisk(Risk.MODERATE);
						}
						else if (sbp>=140 && sbp<=159) {
							selfAssessment.setRisk(Risk.MILD);
						}
						else if (sbp>=120 && sbp<=139) {
							selfAssessment.setRisk(Risk.MINIMAL);
						}
					}
					else if(age>=60 && age<=69){
						if(sbp>=180) {
							selfAssessment.setRisk(Risk.SIGNIFICANT);
						}
						else if (sbp>=160 && sbp<=179) {
							selfAssessment.setRisk(Risk.MILD);
						}
						else if (sbp>=140 && sbp<=159) {
							selfAssessment.setRisk(Risk.MINIMAL);
						}
						else if (sbp>=120 && sbp<=139) {
							selfAssessment.setRisk(Risk.MINIMAL);
						}
					}
					else if(age >= 50 && age <= 59){
						if(sbp>=180) {
							selfAssessment.setRisk(Risk.SIGNIFICANT);
						}
						else if (sbp>=160 && sbp<=179) {
							selfAssessment.setRisk(Risk.MILD);
						}
						else if (sbp>=140 && sbp<=159) {
							selfAssessment.setRisk(Risk.MINIMAL);
						}
						else if (sbp>=120 && sbp<=139) {
							selfAssessment.setRisk(Risk.MINIMAL);
						}
					}
					else if (age >= 40 && age <= 49){
						if(sbp>=180) {
							selfAssessment.setRisk(Risk.SIGNIFICANT);
						}
						else if (sbp>=160 && sbp<=179) {
							selfAssessment.setRisk(Risk.MINIMAL);
						}
						else if (sbp>=140 && sbp<=159) {
							selfAssessment.setRisk(Risk.MINIMAL);
						}
						else if (sbp>=120 && sbp<=139) {
							selfAssessment.setRisk(Risk.MINIMAL);
						}
					}else{
						selfAssessment.setRisk(Risk.MINIMAL);
					}
				}
				else if(cholesterolLvl == 5){
					if(age>=70){
						if(sbp>=180) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=160 && sbp<=179) {
							selfAssessment.setRisk(Risk.SIGNIFICANT);
						}
						else if (sbp>=140 && sbp<=159) {
							selfAssessment.setRisk(Risk.MODERATE);
						}
						else if (sbp>=120 && sbp<=139) {
							selfAssessment.setRisk(Risk.MILD);
						}
					}
					else if(age>=60 && age<=69){
						if(sbp>=180) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=160 && sbp<=179) {
							selfAssessment.setRisk(Risk.MODERATE);
						}
						else if (sbp>=140 && sbp<=159) {
							selfAssessment.setRisk(Risk.MILD);
						}
						else if (sbp>=120 && sbp<=139) {
							selfAssessment.setRisk(Risk.MINIMAL);
						}
					}
					else if(age >= 50 && age <= 59){
						if(sbp>=180) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=160 && sbp<=179) {
							selfAssessment.setRisk(Risk.MILD);
						}
						else if (sbp>=140 && sbp<=159) {
							selfAssessment.setRisk(Risk.MINIMAL);
						}
						else if (sbp>=120 && sbp<=139) {
							selfAssessment.setRisk(Risk.MINIMAL);
						}
					}
					else if (age >= 40 && age <= 49){
						if(sbp>=180) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=160 && sbp<=179) {
							selfAssessment.setRisk(Risk.MILD);
						}
						else if (sbp>=140 && sbp<=159) {
							selfAssessment.setRisk(Risk.MINIMAL);
						}
						else if (sbp>=120 && sbp<=139) {
							selfAssessment.setRisk(Risk.MINIMAL);
						}
					}else{
						selfAssessment.setRisk(Risk.MINIMAL);
					}
				}
				else if(cholesterolLvl == 6){
					if(age>=70){
						if(sbp>=180) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=160 && sbp<=179) {
							selfAssessment.setRisk(Risk.SIGNIFICANT);
						}
						else if (sbp>=140 && sbp<=159) {
							selfAssessment.setRisk(Risk.MODERATE);
						}
						else if (sbp>=120 && sbp<=139) {
							selfAssessment.setRisk(Risk.MILD);
						}
					}
					else if(age>=60 && age<=69){
						if(sbp>=180) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=160 && sbp<=179) {
							selfAssessment.setRisk(Risk.SIGNIFICANT);
						}
						else if (sbp>=140 && sbp<=159) {
							selfAssessment.setRisk(Risk.MILD);
						}
						else if (sbp>=120 && sbp<=139) {
							selfAssessment.setRisk(Risk.MINIMAL);
						}
					}
					else if(age >= 50 && age <= 59){
						if(sbp>=180) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=160 && sbp<=179) {
							selfAssessment.setRisk(Risk.SIGNIFICANT);
						}
						else if (sbp>=140 && sbp<=159) {
							selfAssessment.setRisk(Risk.MILD);
						}
						else if (sbp>=120 && sbp<=139) {
							selfAssessment.setRisk(Risk.MINIMAL);
						}
					}
					else if (age >= 40 && age <= 49){
						if(sbp>=180) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=160 && sbp<=179) {
							selfAssessment.setRisk(Risk.SIGNIFICANT);
						}
						else if (sbp>=140 && sbp<=159) {
							selfAssessment.setRisk(Risk.MILD);
						}
						else if (sbp>=120 && sbp<=139) {
							selfAssessment.setRisk(Risk.MINIMAL);
						}
					}else{
						selfAssessment.setRisk(Risk.MINIMAL);
					}
				}
				else if(cholesterolLvl == 7){
					if(age>=70){
						if(sbp>=180) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=160 && sbp<=179) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=140 && sbp<=159) {
							selfAssessment.setRisk(Risk.SIGNIFICANT);
						}
						else if (sbp>=120 && sbp<=139) {
							selfAssessment.setRisk(Risk.MODERATE);
						}
					}
					else if(age>=60 && age<=69){
						if(sbp>=180) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=160 && sbp<=179) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=140 && sbp<=159) {
							selfAssessment.setRisk(Risk.MODERATE);
						}
						else if (sbp>=120 && sbp<=139) {
							selfAssessment.setRisk(Risk.MINIMAL);
						}
					}
					else if(age >= 50 && age <= 59){
						if(sbp>=180) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=160 && sbp<=179) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=140 && sbp<=159) {
							selfAssessment.setRisk(Risk.MODERATE);
						}
						else if (sbp>=120 && sbp<=139) {
							selfAssessment.setRisk(Risk.MINIMAL);
						}
					}
					else if (age >= 40 && age <= 49){
						if(sbp>=180) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=160 && sbp<=179) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=140 && sbp<=159) {
							selfAssessment.setRisk(Risk.MODERATE);
						}
						else if (sbp>=120 && sbp<=139) {
							selfAssessment.setRisk(Risk.MINIMAL);
						}
					}else{
						selfAssessment.setRisk(Risk.MINIMAL);
					}
				}
				else if(cholesterolLvl == 8){
					if(age>=70){
						if(sbp>=180) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=160 && sbp<=179) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=140 && sbp<=159) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=120 && sbp<=139) {
							selfAssessment.setRisk(Risk.SIGNIFICANT);
						}
					}
					else if(age>=60 && age<=69){
						if(sbp>=180) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=160 && sbp<=179) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=140 && sbp<=159) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=120 && sbp<=139) {
							selfAssessment.setRisk(Risk.SIGNIFICANT);
						}
					}
					else if(age >= 50 && age <= 59){
						if(sbp>=180) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=160 && sbp<=179) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=140 && sbp<=159) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=120 && sbp<=139) {
							selfAssessment.setRisk(Risk.MODERATE);
						}
					}
					else if (age >= 40 && age <= 49){
						if(sbp>=180) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=160 && sbp<=179) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=140 && sbp<=159) {
							selfAssessment.setRisk(Risk.HIGH);
						}
						else if (sbp>=120 && sbp<=139) {
							selfAssessment.setRisk(Risk.MODERATE);
						}
					}else{
						selfAssessment.setRisk(Risk.MINIMAL);
					}
				}
			}
		}
	}
}