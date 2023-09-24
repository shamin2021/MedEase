package com.medease.backend.repository;

import com.medease.backend.entity.HLCMap;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface HLCMapRepository extends JpaRepository<HLCMap, Integer> {

    @Query("""
        select longitude,latitude  from HLCMap
    where hlc.hlc_id= :id
""")
    String findHLCMapById(Integer id);

}