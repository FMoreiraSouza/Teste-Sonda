package com.example.aircraft_management_api.aircraft.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.util.Map;

@Data
@AllArgsConstructor
public class DecadeDistributionResponseDTO {
    private Map<Integer, Long> distribution;
}