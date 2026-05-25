package com.example.aircraft_management_api.aircraft.dto.response;

import com.example.aircraft_management_api.aircraft.entity.Aircraft;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class AircraftResponseDTO {
    private Long id;
    private String name;
    private String brand;
    private Integer year;
    private String description;
    private Boolean sold;
    private String icaoCode;
    private Double fuelCapacity;
    private Double averageConsumption;
    private Double range;
    private String rangeCategory;
    private LocalDateTime createdAt;

    public AircraftResponseDTO(Aircraft aircraft) {
        this.id = aircraft.getId();
        this.name = aircraft.getName();
        this.brand = aircraft.getBrand();
        this.year = aircraft.getYear();
        this.description = aircraft.getDescription();
        this.sold = aircraft.getSold();
        this.icaoCode = aircraft.getIcaoCode();
        this.fuelCapacity = aircraft.getFuelCapacity();
        this.averageConsumption = aircraft.getAverageConsumption();
        this.range = aircraft.getRange();
        this.rangeCategory = aircraft.getRangeCategory();
        this.createdAt = aircraft.getCreatedAt();
    }
}