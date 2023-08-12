package com.medease.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.medease.backend.enumeration.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponseDTO {

    @JsonProperty("message")
    private String message;
    @JsonProperty("access_token")
    private String accessToken;
    @JsonProperty("role")
    private Role role;
    @JsonProperty("user_id")
    private Integer id;
    @JsonProperty("user_name")
    private String name;
}
