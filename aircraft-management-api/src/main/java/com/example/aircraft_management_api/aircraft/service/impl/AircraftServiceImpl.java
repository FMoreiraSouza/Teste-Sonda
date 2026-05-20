package com.example.aircraft_management_api.aircraft.service.impl;

import com.example.aircraft_management_api.aircraft.entity.Aircraft;
import com.example.aircraft_management_api.aircraft.repository.AircraftRepository;
import com.example.aircraft_management_api.aircraft.service.AircraftService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AircraftServiceImpl implements AircraftService {

    private final AircraftRepository repository;

    @Override
    public Aircraft create(Aircraft aircraft) {
        return repository.save(aircraft);
    }

    @Override
    public List<Aircraft> findAll() {
        return repository.findAll();
    }

    @Override
    public Aircraft findById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Aircraft not found with id: " + id));
    }
}