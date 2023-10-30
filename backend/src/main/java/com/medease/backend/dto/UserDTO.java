package com.medease.backend.dto;

import com.medease.backend.enumeration.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
    private Integer id;
    private String firstname;
    private String lastname;
    private String hlc_name;
    private String email;
    private String mobileNumber;
    private Boolean activated;
    private Boolean enabled;
    private Role role;
}
