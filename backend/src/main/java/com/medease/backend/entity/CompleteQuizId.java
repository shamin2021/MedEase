package com.medease.backend.entity;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
public class CompleteQuizId implements Serializable {
    private Integer assigenedUserId;
    private Integer assignedRecommendationId;
    private Integer weekNumber;
    private Integer dayNumber;

    // public CompleteQuizId(Integer assigenedUserid,
    //         Integer assignedRecommendationId,
    //         Integer weekNumber,
    //         Integer dayNumber) {
    //     this.assigenedUserId = assigenedUserid;
    //     this.assignedRecommendationId = assignedRecommendationId;
    //     this.weekNumber = weekNumber;
    //     this.dayNumber = dayNumber;
    // }
}
