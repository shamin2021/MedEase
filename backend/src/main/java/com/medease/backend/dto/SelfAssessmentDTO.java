package com.medease.backend.dto;

import com.medease.backend.entity.Test;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SelfAssessmentDTO {

    // sends a user list
    private  List<Test> users;

}
