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
@Table(name = "hlc_map")
public class HLCMap {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer location_id;

    private String name;
    private String moh_division;
    private Double longitude;
    private Double latitude;

}
