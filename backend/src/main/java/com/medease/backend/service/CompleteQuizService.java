package com.medease.backend.service;

import org.springframework.stereotype.Service;

import com.medease.backend.repository.CompleteQuizRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CompleteQuizService {

    private final CompleteQuizRepository completeQuizRepository;

    public Integer getLastRecordId(Integer userId) {
        var lastRecord = this.completeQuizRepository.findTopByAssigenedUserIdOrderByWeekNumber(userId);
        if (lastRecord == null) {
            return 0;
        }
        
        return lastRecord.getAssigenedUserId();
    }

}
