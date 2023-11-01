package com.medease.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GlobalResponseDTO {

//    use this to send success, error responses to front end

    private Integer status;
    private String message;

}
