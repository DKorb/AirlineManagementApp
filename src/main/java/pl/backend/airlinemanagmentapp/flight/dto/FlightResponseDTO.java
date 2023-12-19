package pl.backend.airlinemanagmentapp.flight.dto;

import pl.backend.airlinemanagmentapp.airport.dto.AirportBasicDTO;

public record FlightResponseDTO(
        Integer id,
        String flightNumber,
        AirportBasicDTO departureAirport,
        AirportBasicDTO arrivalAirport
) {}