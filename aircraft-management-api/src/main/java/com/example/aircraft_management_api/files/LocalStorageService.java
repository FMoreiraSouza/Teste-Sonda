package com.example.aircraft_management_api.files;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
@Profile("local")
public class LocalStorageService implements StorageService {

    @Value("${storage.local.path:./uploads}")
    private String uploadPath;

    @Override
    public String upload(MultipartFile file, Long aircraftId) {
        try {
            Path uploadDir = Paths.get(uploadPath);
            if (!Files.exists(uploadDir)) {
                Files.createDirectories(uploadDir);
            }
            String originalFilename = file.getOriginalFilename();
            String extension = "";
            if (originalFilename != null && originalFilename.contains(".")) {
                extension = originalFilename.substring(originalFilename.lastIndexOf("."));
            }
            String fileName = "aircraft_" + aircraftId + "_" + UUID.randomUUID() + extension;
            Path targetPath = uploadDir.resolve(fileName);
            file.transferTo(targetPath.toFile());
            return targetPath.toAbsolutePath().toString();
        } catch (IOException e) {
            throw new RuntimeException("Failed to store file locally", e);
        }
    }
}