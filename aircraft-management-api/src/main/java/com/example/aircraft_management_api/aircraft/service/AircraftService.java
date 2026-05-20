package com.example.aircraft_management_api.aircraft.service;

import com.example.aircraft_management_api.aircraft.entity.Aircraft;
import java.util.List;

public interface AircraftService {
    Aircraft create(Aircraft aircraft);
    List<Aircraft> findAll();
    Aircraft findById(Long id);
}