package com.medease.backend.repository;

import com.medease.backend.entity.Prescription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface PrescriptionRepository extends JpaRepository<Prescription, Integer> {

    @Query("""
        select u from Prescription u where u.user.id = :userID
""")
    List<Optional<Prescription>> findPrescriptionByUser(Integer userID);
}
