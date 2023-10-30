package com.medease.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ChangeRequestDTO {
    private String hlc_id;
    private Integer request_id;
    private String hlc_name;
    private String firstname;
    private String lastname;
    private String reason;
}
