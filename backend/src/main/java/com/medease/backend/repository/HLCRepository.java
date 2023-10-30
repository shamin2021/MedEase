package com.medease.backend.repository;

import com.medease.backend.entity.HLC;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface HLCRepository extends JpaRepository<HLC, Integer> {

    @Query("""
        select hlc_name,moh_area,gn_number,gn_division,ds_division,phi_area,phm_area, in_charge,in_charge_designation,in_charge_email,in_charge_mobile,hlc_id   from HLC
    where hlc_user.id= :id
""")
    String findHLCById(Integer id);

    @Query("""
        select h from HLC h
    where h.hlc_user.id= :id
""")
    Optional<HLC> findHLC(Integer id);

    @Query(value = "SELECT * FROM HLC WHERE hlc_name = :name", nativeQuery = true)
    HLC findHLCByName(String name);


    @Query("""
        select hlc_name from HLC
    where hlc_user.id= :id
""")
    String findHLCNameByUserId(Integer id);

    @Query("""
        select hlc_name from HLC
    where hlc_id= :id
""")
    String findHLCNameByHLCId(Integer id);


    @Query("""
        select hlc_id,hlc_name from HLC
""")
    List<Object[]> findAllHlcNames();
}
