package com.medease.backend.repository;

import com.medease.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String email);

    @Query("""
        select id,firstname,lastname,email,mobileNumber,activated,enabled, role from User
    where role = 'PATIENT' or role = 'HLC' or role = 'DOCTOR'
""")
    List<Object[]> retrieveUserList();

    @Query("""
        select id,firstname,lastname,email,mobileNumber from User
    where role = 'PATIENT'
""")
    List<Object[]> retrievePatientList();

    @Query(value = "SELECT id,firstname,lastname,email,mobile_number FROM _user WHERE id= :userId", nativeQuery = true)
    String retrieveDoctorUser(Integer userId);
}
