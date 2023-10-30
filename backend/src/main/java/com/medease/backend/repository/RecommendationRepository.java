package com.medease.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.medease.backend.entity.Recommendation;

public interface RecommendationRepository extends JpaRepository<Recommendation, Integer> {

}
