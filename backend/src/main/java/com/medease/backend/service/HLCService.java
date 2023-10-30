package com.medease.backend.service;

import com.medease.backend.dto.HLCDTO;
import com.medease.backend.repository.HLCRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class HLCService {

    private final HLCRepository hlcRepository;

    // hlc list for setting availability by doctor
    public List<HLCDTO> getHLCListForSchedule() {
        List<Object[]> hlcList = hlcRepository.findAllHlcNames();
        System.out.println(hlcList);
        List<HLCDTO> hlcdtoList = new ArrayList<>();

        for (Object[] hlc : hlcList) {
            HLCDTO hlcdto = HLCDTO.builder()
                    .hlc_id((Integer) hlc[0])
                    .hlc_name((String) hlc[1])
                    .build();

            hlcdtoList.add(hlcdto);
        }
        System.out.println(hlcdtoList);
        return hlcdtoList;
    }

    public Integer getHlcCount() {
        return (int) hlcRepository.count();
    }
}
