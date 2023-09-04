package com.medease.backend.controller;

import com.medease.backend.dto.GlobalResponseDTO;
import com.medease.backend.dto.UserDTO;
import com.medease.backend.service.UserManagementService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor
public class UserManagementController {

    private final UserManagementService userManagementService;

    @GetMapping("/getUserList")
    public ResponseEntity<List<UserDTO>> getAllUsers (){
        return ResponseEntity.ok(userManagementService.getAllUsers());
    }

    @PutMapping("/manageUser/{id}")
    public ResponseEntity<GlobalResponseDTO> manageUser (@PathVariable Integer id, @RequestBody UserDTO userDTO) {
        return ResponseEntity.ok(userManagementService.manageUser(id, userDTO.getEnabled()));
    }

}