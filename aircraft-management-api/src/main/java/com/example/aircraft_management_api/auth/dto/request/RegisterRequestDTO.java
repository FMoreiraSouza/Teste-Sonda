package com.example.aircraft_management_api.auth.dto.request;

import lombok.Data;

@Data
public class RegisterRequestDTO {
    private String username;
    private String password;
    private String role;
}