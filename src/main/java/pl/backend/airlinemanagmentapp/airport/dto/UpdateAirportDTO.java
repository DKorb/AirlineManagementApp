package pl.backend.airlinemanagmentapp.airport.dto;

public record UpdateAirportDTO(
        String name,
        String city,
        String country
) {}
