package pl.backend.airlinemanagmentapp.airport.dto;

import jakarta.validation.constraints.Size;

public record AirportDTO(
        Integer id,
        @Size(min = 3, max = 3, message = "Code must be 3 characters long") String code,
        String name,
        String city,
        String country
) {}