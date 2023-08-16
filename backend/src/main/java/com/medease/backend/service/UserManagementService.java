package com.medease.backend.service;

import com.medease.backend.entity.User;
import com.medease.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserManagementService {

    private final UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.retrieveUserList();
    }
}
