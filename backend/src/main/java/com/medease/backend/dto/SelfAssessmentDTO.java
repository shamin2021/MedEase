package com.medease.backend.dto;

// import com.medease.backend.entity.SelfAssessment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SelfAssessmentDTO {

	private long id;
    private String firstName; 
	private	String lastName; 
	private	String emailId; 
	private	boolean checkboxValue; 
	private	boolean physicalActivity; 
	private	boolean tobaccoSmoking; 
	private	boolean beetlechewing; 
	private	boolean alcoholConsumption; 
	private	boolean otherSubstance;
	private	String snackIntake;
	private	boolean heartDisease;

	private boolean HighBloodPressure  ;
	private boolean Stroke  ;
	private boolean Diabetes  ;
    private boolean Cancer  ;
    private boolean COPD  ;
    private boolean Asthma  ;
    private boolean kidneyDiseases  ;
    private boolean suddenDeath  ;
	private String otherDiseases;





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
