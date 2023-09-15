package com.medease.backend.controller;

import com.medease.backend.entity.HLCMap;
import com.medease.backend.service.HomeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/Home")
@RequiredArgsConstructor
public class HomeController {

    private final HomeService homeService;

    @GetMapping("get-map-locations")
    public ResponseEntity<List<HLCMap>> getMapLocations() {
        return ResponseEntity.ok(homeService.getMapLocations());
    }
}
