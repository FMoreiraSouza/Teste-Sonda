package com.example.aircraft_management_api.aircraft.controller;

import com.example.aircraft_management_api.aircraft.entity.Aircraft;
import com.example.aircraft_management_api.aircraft.service.AircraftService;
import com.example.aircraft_management_api.files.StorageService;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/aircrafts")
public class UploadController {

    private final AircraftService aircraftService;
    private final StorageService storageService;

    public UploadController(AircraftService aircraftService, StorageService storageService) {
        this.aircraftService = aircraftService;
        this.storageService = storageService;
    }

    @PostMapping(value = "/{id}/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> uploadImage(
            @PathVariable Long id,
            @Parameter(description = "Image file", content = @Content(mediaType = MediaType.MULTIPART_FORM_DATA_VALUE))
            @RequestParam("file") MultipartFile file){
        Aircraft aircraft = aircraftService.findById(id);
        String imageUrl = storageService.upload(file, id);
        aircraft.setImageUrl(imageUrl);
        aircraftService.update(id, aircraft);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}