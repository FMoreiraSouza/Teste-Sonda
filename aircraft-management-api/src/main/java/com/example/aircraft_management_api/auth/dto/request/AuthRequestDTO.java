package com.example.aircraft_management_api.auth.dto.request;

import lombok.Data;

@Data
public class AuthRequestDTO {
    private String username;
    private String password;
}