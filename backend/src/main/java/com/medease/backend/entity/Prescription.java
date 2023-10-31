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
@Table(name = "prescription")
public class Prescription {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer prescription_id;

    @ManyToOne
    @JoinColumn(name = "user_prescription_id" , referencedColumnName = "id")
    private User user;

    @Lob
    @Basic(fetch = FetchType.LAZY)
    private byte[] prescription;

}
