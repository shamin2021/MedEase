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
@Table(name = "complete_quiz")
@IdClass(CompleteQuizId.class)
public class CompletQuiz {

    @Id
    @JoinColumn(referencedColumnName = "id")
    private Integer assigenedUserId;

    @Id
    @JoinColumn(referencedColumnName = "assignedRecommendationId")
    private Integer assignedRecommendationId;

    @Id
    private Integer weekNumber;

    @Id
    private Integer dayNumber;
}
