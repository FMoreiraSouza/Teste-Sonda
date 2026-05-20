package com.example.aircraft_management_api.aircraft.controller;

import com.example.aircraft_management_api.aircraft.dto.request.AircraftRequestDTO;
import com.example.aircraft_management_api.aircraft.dto.response.AircraftResponseDTO;
import com.example.aircraft_management_api.aircraft.entity.Aircraft;
import com.example.aircraft_management_api.aircraft.service.AircraftService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/aircrafts")
@RequiredArgsConstructor
public class AircraftController {

    private final AircraftService service;

    @PostMapping
    public ResponseEntity<AircraftResponseDTO> create(@Valid @RequestBody AircraftRequestDTO dto) {
        Aircraft aircraft = service.create(dto.toEntity());
        return ResponseEntity.status(HttpStatus.CREATED).body(new AircraftResponseDTO(aircraft));
    }
}