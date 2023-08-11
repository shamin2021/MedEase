package com.medease.backend.entity;

import com.medease.backend.enumeration.SnackIntake;
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
	private Integer id;
	
	@Column(name = "first_name")
	private String firstName;

	@Column(name = "last_name")
	private String lastName;
	
	@Column(name = "email_id")
	private String emailId;

	@Column(name = "physical_activity")
    private boolean physicalActivity;

	@Column(name = "tobacco_smoking")
    private boolean tobaccoSmoking;

	@Column(name = "beetle_chewing")
    private boolean beetlechewing ;

	@Column(name = "alcohol_consumption")
    private boolean alcoholConsumption ;

	@Column(name = "other_substance")
    private boolean otherSubstance ;

	@Column(name = "snack_intake")
	@Enumerated(EnumType.STRING)
	private SnackIntake snackIntake;

	@Column(name = "heart_disease")
    private boolean heartDisease  ;

	@Column(name = "high_blood_pressure")
    private boolean HighBloodPressure  ;

	@Column(name = "stroke")
    private boolean Stroke  ;

	@Column(name = "diabetes")
    private boolean Diabetes  ;

	@Column(name = "cancer")
    private boolean Cancer  ;

	@Column(name = "copd")
    private boolean COPD  ;

	@Column(name = "asthma")
    private boolean Asthma  ;

	@Column(name = "kidney_diseases")
    private boolean kidneyDiseases  ;

	@Column(name = "sudden_death ")
    private boolean suddenDeath  ;

	@Column(name = "other_diseases")
	private String otherDiseases;

	public boolean isPhysicalActivity() {
		return physicalActivity;
	}

	public void setPhysicalActivity(boolean physicalActivity) {
		this.physicalActivity = physicalActivity;
	}

	public boolean isTobaccoSmoking() {
		return tobaccoSmoking;
	}

	public void setTobaccoSmoking(boolean tobaccoSmoking) {
		this.tobaccoSmoking = tobaccoSmoking;
	}

	public boolean isBeetleChewing() {
		return beetlechewing;
	}

	public void setBeetleChewing(boolean beetlechewing) {
		this.beetlechewing = beetlechewing;
	}

	public boolean isAlcoholConsumption() {
		return alcoholConsumption;
	}

	public void setAlcoholConsumption(boolean alcoholConsumption) {
		this.alcoholConsumption = alcoholConsumption;
	}

	public boolean isOtherSubstance() {
		return otherSubstance;
	}

	public void setOtherSubstance(boolean otherSubstance) {
		this.otherSubstance = otherSubstance;
	}
	public boolean isHeartDisease() {
		return heartDisease;
	}

	public void setHighBloodPressure(boolean HighBloodPressure) {
		this.HighBloodPressure = HighBloodPressure;
	}

	public boolean isHighBloodPressure() {
		return HighBloodPressure;
	}

	public void setHeartDisease(boolean heartDisease) {
		this.heartDisease = heartDisease;
	}

	public boolean isStroke() {
		return Stroke;
	}

	public void setStroke(boolean Stroke) {
		this.Stroke = Stroke;
	}

	public boolean isDiabetes() {
		return Diabetes;
	}

	public void setDiabetes(boolean Diabetes) {
		this.Diabetes = Diabetes;
	}

	public boolean isCancer() {
		return Cancer;
	}

	public void setCancer(boolean Cancer) {
		this.Cancer = Cancer;
	}

	public boolean isCOPD() {
		return COPD;
	}

	public void setCOPD(boolean COPD) {
		this.COPD = COPD;
	}

	public boolean isAsthma() {
		return Asthma;
	}

	public void setAsthma(boolean Asthma) {
		this.Asthma = Asthma;
	}

	public boolean isKidneyDiseases() {
		return kidneyDiseases;
	}

	public void setKidneyDiseases(boolean kidneyDiseases) {
		this.kidneyDiseases = kidneyDiseases;
	}

	public boolean isSuddenDeath() {
		return suddenDeath;
	}

	public void setSuddenDeath(boolean suddenDeath) {
		this.suddenDeath = suddenDeath;
	}


}