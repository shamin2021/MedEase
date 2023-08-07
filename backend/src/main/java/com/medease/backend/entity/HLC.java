package com.medease.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "hlc")
public class HLC {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer hlc_id;

    @OneToOne
    @JoinColumn(name = "hlc_user_id", referencedColumnName = "id")
    private User hlc_user;

    private String hlc_name;
    private String moh_area;
    private String gn_number;
    private String gn_division;
    private String ds_division;
    private String phi_area;
    private String phm_area;
    private String in_charge;
    private String in_charge_designation;
    private String in_charge_email;
    private String in_charge_mobile;

}
