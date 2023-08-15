package com.medease.backend.repository;

import com.medease.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String email);

    @Query("""
        select firstname,lastname,email,mobileNumber,activated from User
    where role = 'PATIENT' or role = 'HLC' or role = 'DOCTOR'
""")
    List<User> retrieveUserList();
}
