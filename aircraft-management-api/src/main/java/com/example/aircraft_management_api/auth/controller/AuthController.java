package com.example.aircraft_management_api.auth.controller;

import com.example.aircraft_management_api.auth.dto.request.AuthRequestDTO;
import com.example.aircraft_management_api.auth.dto.request.RegisterRequestDTO;
import com.example.aircraft_management_api.auth.dto.response.AuthResponseDTO;
import com.example.aircraft_management_api.auth.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponseDTO> register(@RequestBody RegisterRequestDTO request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@RequestBody AuthRequestDTO request) {
        return ResponseEntity.ok(authService.login(request));
    }
}