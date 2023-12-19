package pl.backend.airlinemanagmentapp.airport.dto;

public record AirportBasicDTO(
        Integer id,
        String code,
        String name,
        String city,
        String country
) {}
