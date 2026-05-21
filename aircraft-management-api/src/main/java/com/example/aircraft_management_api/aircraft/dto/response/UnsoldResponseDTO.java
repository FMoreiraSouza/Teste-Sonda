package com.example.aircraft_management_api.aircraft.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UnsoldResponseDTO {
    private Long unsoldCount;
}