package com.example.aircraft_management_api.auth.service;

import com.example.aircraft_management_api.auth.dto.request.AuthRequestDTO;
import com.example.aircraft_management_api.auth.dto.request.RegisterRequestDTO;
import com.example.aircraft_management_api.auth.dto.response.AuthResponseDTO;
import com.example.aircraft_management_api.auth.entity.User;
import com.example.aircraft_management_api.auth.repository.UserRepository;
import com.example.aircraft_management_api.exception.BusinessException;
import com.example.aircraft_management_api.security.JwtUtil;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       AuthenticationManager authenticationManager,
                       JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }

    public AuthResponseDTO register(RegisterRequestDTO request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new BusinessException("Username already exists");
        }
        String role = request.getRole() != null ? request.getRole().toUpperCase() : "USER";
        User user = User.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(role)
                .build();
        userRepository.save(user);
        String token = jwtUtil.generateToken(user.getUsername(), user.getRole());
        return new AuthResponseDTO(token, user.getUsername(), user.getRole());
    }

    public AuthResponseDTO login(AuthRequestDTO request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new BusinessException("User not found"));
        String token = jwtUtil.generateToken(user.getUsername(), user.getRole());
        return new AuthResponseDTO(token, user.getUsername(), user.getRole());
    }
}