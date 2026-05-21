package com.example.aircraft_management_api.aircraft.service;

import com.example.aircraft_management_api.aircraft.entity.Aircraft;

import java.time.LocalDateTime;
import java.util.List;

public interface AircraftService {
    Aircraft create(Aircraft aircraft);
    List<Aircraft> findAll();
    Aircraft findById(Long id);
    List<Aircraft> searchByName(String name);
    List<Aircraft> searchByBrand(String brand);
    List<Aircraft> searchByYear(Integer year);
    List<Aircraft> searchByDecade(Integer decade);
    List<Aircraft> searchByCreatedAfter(LocalDateTime date);
    Aircraft update(Long id, Aircraft aircraft);
    void deleteById(Long id);
}