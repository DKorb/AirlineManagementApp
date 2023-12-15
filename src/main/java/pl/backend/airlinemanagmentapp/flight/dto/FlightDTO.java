package pl.backend.airlinemanagmentapp.flight.dto;

public record FlightDTO(String flightNumber, Integer departureAirportId, Integer arrivalAirportId) {}