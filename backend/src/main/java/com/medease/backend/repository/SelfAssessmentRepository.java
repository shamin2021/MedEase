package com.medease.backend.repository;

import com.medease.backend.entity.SelfAssessment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface SelfAssessmentRepository extends JpaRepository<SelfAssessment, Integer>{

}