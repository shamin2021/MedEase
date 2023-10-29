package com.medease.backend.repository;

import com.medease.backend.entity.HLCChangeRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface HLCChangeRequestRepository extends JpaRepository<HLCChangeRequest, Integer> {

    @Query("""
        select m  from HLCChangeRequest m
    where m.requested_user.id= :id
""")
    Optional<HLCChangeRequest> findRequestedByID(Integer id);

}
