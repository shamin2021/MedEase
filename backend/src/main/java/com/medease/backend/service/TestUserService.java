package com.medease.backend.service;

import com.medease.backend.Exception.CustomException;
import com.medease.backend.dto.GlobalResponseDTO;
import com.medease.backend.dto.RegisterRequestDTO;
import com.medease.backend.dto.TestUserResponseDTO;
import com.medease.backend.entity.Test;
import com.medease.backend.repository.TestUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TestUserService {

    private final TestUserRepository testUserRepository;

    public TestUserResponseDTO getUsers() {
        List<Test> userList = testUserRepository.findAll();
        return new TestUserResponseDTO(userList);
    }

    public Test getUser(Integer id) {
        return testUserRepository.findById(id)
                .orElseThrow(() -> new CustomException("User with id: " + id + " not found" ));  // use this exception to send custom exceptions
    }

    // used the register request here just for test, Register request should only be used to registration
    public GlobalResponseDTO adduser(RegisterRequestDTO registerRequestDTO) {
        var test = Test.builder()
                .firstname(registerRequestDTO.getFirstname())
                .lastname(registerRequestDTO.getLastname())
                .build();

        testUserRepository.save(test);
        return GlobalResponseDTO.builder()
                .status(200)
                .message("Saved")
                .build();
    }

    // used the register request here just for test, Register request should only be used to registration (request should include only firstname and/or email)
    public GlobalResponseDTO updateUser(Integer id, RegisterRequestDTO registerRequestDTO) {
        var currentUser = testUserRepository.findById(id)
                .orElseThrow(() -> new CustomException("User with id: " + id + " not found" ));
        currentUser.setFirstname(registerRequestDTO.getFirstname());
        currentUser.setLastname(registerRequestDTO.getLastname());
        testUserRepository.save(currentUser);

        return GlobalResponseDTO.builder()
                .status(200)
                .message("Updated")
                .build();
    }

    public GlobalResponseDTO deleteUser(Integer id) {
        var currentUser = testUserRepository.findById(id)
                .orElseThrow(() -> new CustomException("User with id: " + id + " not found" ));

        testUserRepository.delete(currentUser);

        return GlobalResponseDTO.builder()
                .status(200)
                .message("Deleted")
                .build();
    }
}
