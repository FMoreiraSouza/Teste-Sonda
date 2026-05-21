package com.example.aircraft_management_api.aircraft.repository;

import com.example.aircraft_management_api.aircraft.entity.Aircraft;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AircraftRepository extends JpaRepository<Aircraft, Long> {
    List<Aircraft> findByNameContainingIgnoreCase(String name);
    List<Aircraft> findByBrandContainingIgnoreCase(String brand);
    List<Aircraft> findByYear(Integer year);
    boolean existsByNameAndBrandAndIdNot(String name, String brand, Long id);
    boolean existsByNameAndBrand(String name, String brand);

    @Query("SELECT a FROM Aircraft a WHERE a.year BETWEEN :start AND :end")
    List<Aircraft> findByDecade(@Param("start") Integer start, @Param("end") Integer end);

}