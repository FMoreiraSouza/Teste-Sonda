package com.example.aircraft_management_api.aircraft.service.impl;

import com.example.aircraft_management_api.aircraft.entity.Aircraft;
import com.example.aircraft_management_api.aircraft.repository.AircraftRepository;
import com.example.aircraft_management_api.aircraft.service.AircraftService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
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

    @Override
    public List<Aircraft> searchByName(String name) {
        return repository.findByNameContainingIgnoreCase(name);
    }

    @Override
    public List<Aircraft> searchByBrand(String brand) {
        return repository.findByBrandContainingIgnoreCase(brand);
    }

    @Override
    public List<Aircraft> searchByYear(Integer year) {
        return repository.findByYear(year);
    }

    @Override
    public List<Aircraft> searchByDecade(Integer decade) {
        int start = decade;
        int end = decade + 9;
        return repository.findByDecade(start, end);
    }

    @Override
    @Transactional
    public Aircraft update(Long id, Aircraft updatedAircraft) {
        Aircraft existing = findById(id);

        if (repository.existsByNameAndBrandAndIdNot(updatedAircraft.getName(), updatedAircraft.getBrand(), id)) {
            throw new RuntimeException("Another aircraft with same name and brand already exists");
        }

        existing.setName(updatedAircraft.getName());
        existing.setBrand(updatedAircraft.getBrand());
        existing.setYear(updatedAircraft.getYear());
        existing.setDescription(updatedAircraft.getDescription());
        existing.setSold(updatedAircraft.getSold());
        existing.setIcaoCode(updatedAircraft.getIcaoCode());
        existing.setFuelCapacity(updatedAircraft.getFuelCapacity());
        existing.setAverageConsumption(updatedAircraft.getAverageConsumption());

        return repository.save(existing);
    }
}