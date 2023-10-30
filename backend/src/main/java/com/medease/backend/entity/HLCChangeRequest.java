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
@Table(name = "hlc_change_request")
public class HLCChangeRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer request_id;

    @ManyToOne
    @JoinColumn(name = "user_requested_id", referencedColumnName = "id")
    private User requested_user;

    @ManyToOne
    @JoinColumn(name = "hlc_requested_id", referencedColumnName = "hlc_id")
    private HLC requested_hlc;

    private String reason;
    private Integer requested=0;
    private Integer accepted=0;


}
