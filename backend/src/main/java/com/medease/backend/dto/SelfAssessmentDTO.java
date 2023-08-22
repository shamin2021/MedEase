package com.medease.backend.dto;

import com.medease.backend.entity.User;
import com.medease.backend.enumeration.Gender;
import com.medease.backend.enumeration.Risk;
import com.medease.backend.enumeration.SnackIntake;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SelfAssessmentDTO {

    private LocalDate date;
    private User patient;
    private String firstName;
    private String lastName;
    private String emailId;
    private boolean physicalActivity;
    private boolean tobaccoSmoking;
    private boolean beetlechewing ;
    private boolean alcoholConsumption ;
    private boolean otherSubstance ;
    private SnackIntake snackIntake;
    private boolean heartDisease  ;
    private boolean HighBloodPressure ;
    private boolean Stroke  ;
    private boolean Diabetes  ;
    private boolean Cancer  ;
    private boolean COPD  ;
    private boolean Asthma  ;
    private boolean kidneyDiseases  ;
    private boolean suddenDeath  ;
    private String otherDiseases;
    private Gender gender;
    private LocalDate dob;

    //medical test related
    private Risk risk;

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
