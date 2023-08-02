package com.medease.backend.repository;

import com.medease.backend.entity.Test;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TestUserRepository extends JpaRepository<Test, Integer> {
}
