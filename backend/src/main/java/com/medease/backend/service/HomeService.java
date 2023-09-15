package com.medease.backend.service;

import com.medease.backend.entity.HLCMap;
import com.medease.backend.repository.HLCMapRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class HomeService {

    private  final HLCMapRepository hlcMapRepository;
    public List<HLCMap> getMapLocations() {
        return hlcMapRepository.findAll();
    }
}
