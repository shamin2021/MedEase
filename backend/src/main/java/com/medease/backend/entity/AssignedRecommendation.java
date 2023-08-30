package com.medease.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
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
@Table(name = "assigned_recommendation")
@IdClass(UserRecommendationId.class)
public class AssignedRecommendation {

    @Id
    @JoinColumn(referencedColumnName = "recommendation_id")
    private Integer assignedRecommendationId;

    @Id
    @JoinColumn(referencedColumnName = "id")
    private Integer assigenedUserId;
}
