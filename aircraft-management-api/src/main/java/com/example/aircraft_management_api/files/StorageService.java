package com.example.aircraft_management_api.files;

import org.springframework.web.multipart.MultipartFile;

public interface StorageService {
    String upload(MultipartFile file, Long aircraftId);
}