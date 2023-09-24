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

    @OneToOne
    @JoinColumn(name = "hlc_id", referencedColumnName = "hlc_id")
    private HLC hlc;

    private String longitude;
    private String latitude;

}
