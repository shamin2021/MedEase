package com.medease.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.medease.backend.entity.LifestyleInstruction;
import com.medease.backend.repository.LifestyleInstructionRepository;

@RestController
@RequestMapping("/api/v1/lifestyle_instruction")
public class LifestyleInstructionController {

    private final LifestyleInstructionRepository lifestyleInstructionRepository;

    public LifestyleInstructionController(LifestyleInstructionRepository lifestyleInstructionRepository) {
        this.lifestyleInstructionRepository = lifestyleInstructionRepository;
    }

    @GetMapping("")
    public ResponseEntity<?> getLifestyleInstruction() {
        return ResponseEntity.ok(this.lifestyleInstructionRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getLifestyleInstructionById(@PathVariable("id") Integer id) {
        return ResponseEntity.ok(this.lifestyleInstructionRepository.findById(id));
    }

    @PostMapping("")
    public ResponseEntity<?> createLifestyleInstruction(@RequestBody LifestyleInstruction lifestyleInstruction) {
        return ResponseEntity.ok(this.lifestyleInstructionRepository.save(lifestyleInstruction));
    }

}
