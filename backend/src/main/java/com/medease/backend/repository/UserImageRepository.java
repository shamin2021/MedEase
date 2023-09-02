package com.medease.backend.repository;

import com.medease.backend.entity.UserImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UserImageRepository extends JpaRepository<UserImage, Integer> {

    @Query("""
        select u from UserImage u where u.userId.id = :userID
""")
    Optional<UserImage> findByUserId(Integer userID);
}
