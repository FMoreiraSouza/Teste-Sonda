package com.example.aircraft_management_api.aircraft.dto.request;

import com.example.aircraft_management_api.aircraft.entity.Aircraft;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AircraftRequestDTO {

    @NotBlank
    private String name;

    @NotBlank
    private String brand;

    @NotNull
    @Min(1900)
    @Max(2026)
    private Integer year;

    private String description;

    @NotNull
    private Boolean sold;

    @Size(min = 4, max = 4)
    private String icaoCode;

    @NotNull
    @Positive
    private Double fuelCapacity;

    @NotNull
    @Positive
    private Double averageConsumption;

    public Aircraft toEntity() {
        return Aircraft.builder()
                .name(name)
                .brand(brand)
                .year(year)
                .description(description)
                .sold(sold)
                .icaoCode(icaoCode)
                .fuelCapacity(fuelCapacity)
                .averageConsumption(averageConsumption)
                .build();
    }
}