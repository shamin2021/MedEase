package com.medease.backend.entity;

import jakarta.persistence.*;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "selfassessments")
public class SelfAssessment {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(name = "first_name")
	private String firstName;

	@Column(name = "last_name")
	private String lastName;
	
	@Column(name = "email_id")
	private String emailId;

	@Column(name = "checkbox_value")
    private boolean checkboxValue;

	@Column(name = "physical_activity")
    private boolean physicalActivity;

	@Column(name = "tobacco_smoking")
    private boolean tobaccoSmoking;

	@Column(name = "beetle_chewing ")
    private boolean beetlechewing ;

	@Column(name = "alcohol_consumption ")
    private boolean alcoholConsumption ;

	@Column(name = "other_substance ")
    private boolean otherSubstance ;

	@Column(name = "snack_intake")
	private String snackIntake;

	@Column(name = "heart_disease  ")
    private boolean heartDisease  ;

	@Column(name = "high_blood_pressure  ")
    private boolean HighBloodPressure  ;

	@Column(name = "stroke ")
    private boolean Stroke  ;

	@Column(name = "diabetes  ")
    private boolean Diabetes  ;

	@Column(name = "cancer  ")
    private boolean Cancer  ;

	@Column(name = "copd  ")
    private boolean COPD  ;

	@Column(name = "asthma   ")
    private boolean Asthma  ;

	@Column(name = "kidney_diseases  ")
    private boolean kidneyDiseases  ;

	@Column(name = "sudden_death ")
    private boolean suddenDeath  ;

	@Column(name = "other_diseases")
	private String otherDiseases;
	
	// public SelfAssessment() {
		
	// }
	
	public SelfAssessment(
		String firstName, 
		String lastName, 
		String emailId, 
		boolean checkboxValue, 
		boolean physicalActivity, 
		boolean tobaccoSmoking, 
		boolean beetlechewing, 
		boolean alcoholConsumption, 
		boolean otherSubstance,
		String snackIntake,
		boolean heartDisease ) 
		{
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.emailId = emailId;
		this.checkboxValue = checkboxValue;
		this.physicalActivity = physicalActivity;
		this.tobaccoSmoking = tobaccoSmoking;
		this.beetlechewing = beetlechewing;
		this.alcoholConsumption = alcoholConsumption;
		this.otherSubstance = otherSubstance;
		this.snackIntake = snackIntake;
		this.heartDisease = heartDisease;
	}

	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getEmailId() {
		return emailId;
	}
	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}
	public boolean getcheckboxValue() {
		return checkboxValue;
	}
	public void setcheckboxValue(boolean checkboxValue) {
		this.checkboxValue = checkboxValue;
	}
	public boolean getphysicalActivity() {
		return physicalActivity;
	}
	public void setphysicalActivity(boolean physicalActivity) {
		this.physicalActivity = physicalActivity;
	}
	public boolean gettobaccoSmoking() {
		return tobaccoSmoking;
	}
	public void settobaccoSmoking(boolean tobaccoSmoking) {
		this.tobaccoSmoking = tobaccoSmoking;
	}
	public boolean getbeetlechewing() {
		return beetlechewing;
	}
	public void setbeetlechewing(boolean beetlechewing) {
		this.beetlechewing = beetlechewing;
	}
	public boolean getalcoholConsumption() {
		return alcoholConsumption;
	}
	public void setalcoholConsumption(boolean alcoholConsumption) {
		this.alcoholConsumption = alcoholConsumption;
	}
	public boolean getotherSubstance() {
		return otherSubstance;
	}
	public void setotherSubstance(boolean otherSubstance) {
		this.otherSubstance = otherSubstance;
	}
	public String getsnackIntake() {
		return snackIntake;
	}
	public void setsnackIntake(String snackIntake) {
		this.snackIntake = snackIntake;
	}
	public boolean getheartDisease() {
		return heartDisease;
	}
	public void setheartDisease(boolean heartDisease) {
		this.heartDisease = heartDisease;
	}
	public boolean getHighBloodPressure() {
		return HighBloodPressure;
	}
	public void setHighBloodPressure(boolean HighBloodPressure) {
		this.HighBloodPressure = HighBloodPressure;
	}
	public boolean getStroke() {
		return Stroke;
	}
	public void setStroke(boolean Stroke) {
		this.Stroke = Stroke;
	}
	public boolean getDiabetes() {
		return Diabetes;
	}
	public void setDiabetes(boolean Diabetes) {
		this.Diabetes = Diabetes;
	}
	public boolean getCancer() {
		return Cancer;
	}
	public void setCancer(boolean Cancer) {
		this.Cancer = Cancer;
	}
	public boolean getCOPD() {
		return COPD;
	}
	public void setCOPD(boolean COPD) {
		this.COPD = COPD;
	}
	public boolean getAsthma() {
		return Asthma;
	}
	public void setAsthma(boolean Asthma) {
		this.Asthma = Asthma;
	}
	public boolean getkidneyDiseases() {
		return kidneyDiseases;
	}
	public void setkidneyDiseases(boolean kidneyDiseases) {
		this.kidneyDiseases = kidneyDiseases;
	}
	public boolean getsuddenDeath() {
		return suddenDeath;
	}
	public void setsuddenDeath(boolean suddenDeath) {
		this.suddenDeath = suddenDeath;
	}
	public String getotherDiseases() {
		return otherDiseases;
	}
	public void setotherDiseases(String otherDiseases) {
		this.otherDiseases = otherDiseases;
	}
}