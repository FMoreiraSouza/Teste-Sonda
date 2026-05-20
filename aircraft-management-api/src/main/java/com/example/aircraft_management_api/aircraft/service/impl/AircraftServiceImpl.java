package com.example.aircraft_management_api.aircraft.service.impl;

import com.example.aircraft_management_api.aircraft.entity.Aircraft;
import com.example.aircraft_management_api.aircraft.repository.AircraftRepository;
import com.example.aircraft_management_api.aircraft.service.AircraftService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AircraftServiceImpl implements AircraftService {

    private final AircraftRepository repository;

    @Override
    public Aircraft create(Aircraft aircraft) {
        return repository.save(aircraft);
    }
}