package com.medease.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.medease.backend.entity.AssignedRecommendation;
import com.medease.backend.entity.UserRecommendationId;

public interface AssignedRecommendationRepository extends JpaRepository<AssignedRecommendation, UserRecommendationId> {
    List<AssignedRecommendation> findByAssigenedUserId(Integer user_id);

    List<AssignedRecommendation> findByAssigenedUserIdAndAssignedWeek(Integer user_id, Integer week);

    boolean existsByAssigenedUserIdAndAssignedRecommendationId(Integer assigenedUserId,
            Integer assignedRecommendationId);

    AssignedRecommendation findTopByAssigenedUserIdOrderByAssignedWeek(Integer assigenedUserId);
}
