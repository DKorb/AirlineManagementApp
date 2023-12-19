package pl.backend.airlinemanagmentapp.flight.dto;

public record FlightDTO(
        String flightNumber,
        String airlineName,
        Integer departureAirportId,
        Integer arrivalAirportId
) {}