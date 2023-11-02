package com.medease.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.medease.backend.entity.HLC;

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

    @Query(value = """
            SELECT hlc.hlc_name,hlc.in_charge, COUNT(patient.patient_id) AS patient_count 
            FROM hlc LEFT JOIN patient 
            ON patient.patient_hlc_id = hlc.hlc_id 
            GROUP BY hlc.hlc_name,hlc.in_charge;  
            """, nativeQuery = true)
    List<Object> findHLCpatient();

    @Query(value = "SELECT hlc_id FROM hlc WHERE hlc_user_id = :hlcId", nativeQuery = true)
    Integer findHlcIdByUser(Integer hlcId);
}
