package com.example.aircraft_management_api.aircraft.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.util.Map;

@Data
@AllArgsConstructor
public class ManufacturerDistributionResponseDTO {
    private Map<String, Long> distribution;
}