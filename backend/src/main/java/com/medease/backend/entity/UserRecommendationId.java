package com.medease.backend.entity;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
public class UserRecommendationId implements Serializable {
    private Integer assignedRecommendationId;
    private Integer assigenedUserId;
    private Integer assignedWeek; 
}
