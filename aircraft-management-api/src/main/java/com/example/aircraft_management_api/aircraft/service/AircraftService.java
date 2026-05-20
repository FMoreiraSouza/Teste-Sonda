package com.example.aircraft_management_api.aircraft.service;

import com.example.aircraft_management_api.aircraft.entity.Aircraft;
import java.util.List;
import java.util.Map;

public interface AircraftService {
    Aircraft create(Aircraft aircraft);
    List<Aircraft> findAll();
    Aircraft findById(Long id);
    List<Aircraft> searchByName(String name);
    List<Aircraft> searchByBrand(String brand);
    List<Aircraft> searchByYear(Integer year);
    List<Aircraft> searchByDecade(Integer decade);
    Aircraft update(Long id, Aircraft aircraft);
    void deleteById(Long id);
    Long getUnsoldCount();
    Map<Integer, Long> getDistributionByDecade();
    Map<String, Long> getDistributionByManufacturer();
    List<Aircraft> getAircraftsFromLastWeek();
}