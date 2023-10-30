package com.medease.backend.repository;

import com.medease.backend.entity.HLC;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HlcRepository extends JpaRepository<HLC, Integer> {
}
