package com.medease.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "lifestyle_instruction")
public class LifestyleInstruction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer instruction_id;

    private String instruction;

    public LifestyleInstruction(String instruction) {
        this.instruction = instruction;
    }

    public Integer getInstruction_id() {
        return this.instruction_id;
    }

    public void setInstruction_id(Integer instruction_id) {
        this.instruction_id = instruction_id;
    }

    public String getInstruction() {
        return this.instruction;
    }

    public void setInstruction(String instruction) {
        this.instruction = instruction;
    }
}
