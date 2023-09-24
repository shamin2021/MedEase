package com.medease.backend.service;

import com.medease.backend.dto.MapDTO;
import com.medease.backend.entity.HLC;
import com.medease.backend.repository.HLCMapRepository;
import com.medease.backend.repository.HLCRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class HomeService {

    private final HLCRepository hlcRepository;
    private  final HLCMapRepository hlcMapRepository;

    public List<MapDTO> getMapLocations() {

        List<HLC> hlcList = hlcRepository.findAll();
        List<MapDTO> hlcMapList = new ArrayList<>();

        for(HLC hlc : hlcList ) {
            String hlcMapDetails = hlcMapRepository.findHLCMapById(hlc.getHlc_id());
            String[] hlcMapDetailsSplit = hlcMapDetails.split(",");
            String longitude = hlcMapDetailsSplit[0].trim();
            String latitude = hlcMapDetailsSplit[1].trim();

            var mapDTo = MapDTO.builder()
                    .name(hlc.getHlc_name())
                    .longitude(longitude)
                    .latitude(latitude)
                    .build();

            hlcMapList.add(mapDTo);
        }
        return hlcMapList;
    }


}
