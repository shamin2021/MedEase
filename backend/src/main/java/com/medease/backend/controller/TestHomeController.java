package com.medease.backend.controller;

import com.medease.backend.dto.GlobalResponseDTO;
import com.medease.backend.dto.RegisterRequestDTO;
import com.medease.backend.dto.TestUserResponseDTO;
import com.medease.backend.entity.Test;
import com.medease.backend.entity.User;
import com.medease.backend.service.TestUserService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/Home")
@RequiredArgsConstructor
public class TestHomeController {

    private final TestUserService testUserService;

    // just a blaaaa endpoint
    @GetMapping("/bla")
    public ResponseEntity<String> Users() {
        return ResponseEntity.ok("hii");
    }
    // get all users
    @GetMapping("/getUsers")
    public ResponseEntity<TestUserResponseDTO> getUsers() {
        return ResponseEntity.ok(testUserService.getUsers());
    }

    // get a specific user
    @GetMapping("/getUser/{id}")
    public ResponseEntity<Test> getUser(
            @PathVariable Integer id
    ) {
        return ResponseEntity.ok(testUserService.getUser(id));
    }

    // add user (used the same registerRequestDTO just because this is a test)
    @PostMapping("/addUser")
    public ResponseEntity<GlobalResponseDTO> addUser(
            @RequestBody RegisterRequestDTO registerRequestDTO
    ) {
        System.out.println(registerRequestDTO);
        return ResponseEntity.ok(testUserService.adduser(registerRequestDTO));
    }

    // update user  (used the same registerRequestDTO just because this is a test)
    @PutMapping("/updateUser/{id}")
    public ResponseEntity<GlobalResponseDTO> updateUser(
            @PathVariable Integer id,
            @RequestBody RegisterRequestDTO registerRequestDTO
    ) {
        return ResponseEntity.ok(testUserService.updateUser(id, registerRequestDTO));
    }

    // remove user
    @DeleteMapping("/deleteUser/{id}")
    public ResponseEntity<GlobalResponseDTO> deleteUser(
            @PathVariable Integer id
    ) {
        return ResponseEntity.ok(testUserService.deleteUser(id));
    }


}


