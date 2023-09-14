package com.medease.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.medease.backend.entity.CompletQuiz;
import com.medease.backend.entity.CompleteQuizId;

public interface CompleteQuizRepository extends JpaRepository<CompletQuiz, CompleteQuizId> {
    List<CompletQuiz> findByAssigenedUserId(Integer assigenedUserId);

    List<CompletQuiz> findByAssigenedUserIdAndWeekNumber(Integer assigenedUserId, Integer weekNumber);

    boolean existsById(CompleteQuizId id);
}
