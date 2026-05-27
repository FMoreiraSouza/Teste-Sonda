package com.example.aircraft_management_api.aircraft.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "aircrafts")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Aircraft {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String name;

    @NotBlank
    private String brand;

    @NotNull
    @Min(1900)
    @Max(2026)
    private Integer year;

    private String description;

    @NotNull
    private Boolean sold;

    @Column(length = 4)
    private String icaoCode;

    @NotNull
    @Positive
    private Double fuelCapacity;

    @NotNull
    @Positive
    private Double averageConsumption;

    private Double range;

    @Column(updatable = false)
    private LocalDateTime createdAt;

    @Column(columnDefinition = "TEXT")
    private String imageUrl;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        calculateRange();
        validateIcaoCode();
    }

    @PreUpdate
    protected void onUpdate() {
        calculateRange();
        validateIcaoCode();
    }

    private void calculateRange() {
        if (fuelCapacity != null && averageConsumption != null) {
            this.range = fuelCapacity * averageConsumption;
        }
    }

    private void validateIcaoCode() {
        if (icaoCode != null && !icaoCode.isBlank()) {
            if (icaoCode.length() != 4) {
                throw new IllegalArgumentException("ICAO code must have exactly 4 characters");
            }
            char firstLetter = Character.toUpperCase(icaoCode.charAt(0));
            char firstLetterBrand = Character.toUpperCase(brand.charAt(0));
            if (firstLetter != firstLetterBrand) {
                throw new IllegalArgumentException("ICAO code must start with the same letter as the brand");
            }
        }
    }

    public String getRangeCategory() {
        if (range == null) return "N/A";
        if (range <= 3000) return "Short";
        if (range <= 7000) return "Medium";
        return "Long";
    }
}