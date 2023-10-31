package com.medease.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

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

    @ManyToOne
    @JoinColumn(name = "doctor_prescription_id" , referencedColumnName = "doctor_id")
    private Doctor doctor;

    @Column(name = "given_date")
    private LocalDate givenDate;

    @Lob
    @Basic(fetch = FetchType.LAZY)
    private byte[] prescription;

    @PrePersist
    public void prePersist() {
        this.givenDate = LocalDate.now();
    }

}
