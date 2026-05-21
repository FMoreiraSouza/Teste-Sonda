package com.example.aircraft_management_api.aircraft.controller;

import com.example.aircraft_management_api.aircraft.dto.request.AircraftRequestDTO;
import com.example.aircraft_management_api.aircraft.dto.response.AircraftResponseDTO;
import com.example.aircraft_management_api.aircraft.dto.response.DecadeDistributionResponseDTO;
import com.example.aircraft_management_api.aircraft.dto.response.ManufacturerDistributionResponseDTO;
import com.example.aircraft_management_api.aircraft.dto.response.UnsoldResponseDTO;
import com.example.aircraft_management_api.aircraft.entity.Aircraft;
import com.example.aircraft_management_api.aircraft.service.AircraftService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/aircrafts")
@RequiredArgsConstructor
public class AircraftController {

    private final AircraftService service;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<AircraftResponseDTO> create(@Valid @RequestBody AircraftRequestDTO dto) {
        var aircraft = service.create(dto.toEntity());
        return ResponseEntity.status(HttpStatus.CREATED).body(new AircraftResponseDTO(aircraft));
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<List<AircraftResponseDTO>> findAll() {
        List<AircraftResponseDTO> list = service.findAll()
                .stream()
                .map(AircraftResponseDTO::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(list);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<AircraftResponseDTO> findById(@PathVariable Long id) {
        var aircraft = service.findById(id);
        return ResponseEntity.ok(new AircraftResponseDTO(aircraft));
    }

    @GetMapping("/search")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<List<AircraftResponseDTO>> search(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String brand,
            @RequestParam(required = false) Integer year,
            @RequestParam(required = false) Integer decade,
            @RequestParam(required = false) String createdAfter) {

        List<Aircraft> result;

        if (name != null && !name.isBlank()) {
            result = service.searchByName(name);
        } else if (brand != null && !brand.isBlank()) {
            result = service.searchByBrand(brand);
        } else if (year != null) {
            result = service.searchByYear(year);
        } else if (decade != null) {
            result = service.searchByDecade(decade);
        } else if (createdAfter != null && !createdAfter.isBlank()) {
            LocalDateTime date = LocalDateTime.parse(createdAfter + "T00:00:00");
            result = service.searchByCreatedAfter(date);
        } else {
            result = service.findAll();
        }

        List<AircraftResponseDTO> list = result.stream()
                .map(AircraftResponseDTO::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(list);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<AircraftResponseDTO> update(@PathVariable Long id, @Valid @RequestBody AircraftRequestDTO dto) {
        Aircraft updated = service.update(id, dto.toEntity());
        return ResponseEntity.ok(new AircraftResponseDTO(updated));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/reports/unsold-count")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<UnsoldResponseDTO> getUnsoldCount() {
        Long count = service.getUnsoldCount();
        return ResponseEntity.ok(new UnsoldResponseDTO(count));
    }

    @GetMapping("/reports/distribution-by-decade")
    @   PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<DecadeDistributionResponseDTO> getDistributionByDecade() {
        Map<Integer, Long> distribution = service.getDistributionByDecade();
        return ResponseEntity.ok(new DecadeDistributionResponseDTO(distribution));
    }

    @GetMapping("/reports/distribution-by-manufacturer")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<ManufacturerDistributionResponseDTO> getDistributionByManufacturer() {
        Map<String, Long> distribution = service.getDistributionByManufacturer();
        return ResponseEntity.ok(new ManufacturerDistributionResponseDTO(distribution));
    }

    @GetMapping("/reports/last-week")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<List<AircraftResponseDTO>> getAircraftsFromLastWeek() {
        List<AircraftResponseDTO> list = service.getAircraftsFromLastWeek()
                .stream()
                .map(AircraftResponseDTO::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(list);
    }
}