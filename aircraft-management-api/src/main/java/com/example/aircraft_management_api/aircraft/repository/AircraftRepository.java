package com.example.aircraft_management_api.aircraft.repository;

import com.example.aircraft_management_api.aircraft.entity.Aircraft;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AircraftRepository extends JpaRepository<Aircraft, Long> {
}