package com.example.aircraft_management_api.aircraft.controller;

import com.example.aircraft_management_api.aircraft.dto.request.AircraftRequestDTO;
import com.example.aircraft_management_api.aircraft.dto.response.AircraftResponseDTO;
import com.example.aircraft_management_api.aircraft.service.AircraftService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/aircrafts")
@RequiredArgsConstructor
public class AircraftController {

    private final AircraftService service;

    @PostMapping
    public ResponseEntity<AircraftResponseDTO> create(@Valid @RequestBody AircraftRequestDTO dto) {
        var aircraft = service.create(dto.toEntity());
        return ResponseEntity.status(HttpStatus.CREATED).body(new AircraftResponseDTO(aircraft));
    }

    @GetMapping
    public ResponseEntity<List<AircraftResponseDTO>> findAll() {
        List<AircraftResponseDTO> list = service.findAll()
                .stream()
                .map(AircraftResponseDTO::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(list);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AircraftResponseDTO> findById(@PathVariable Long id) {
        var aircraft = service.findById(id);
        return ResponseEntity.ok(new AircraftResponseDTO(aircraft));
    }
}