package pl.backend.airlinemanagmentapp.flight.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import pl.backend.airlinemanagmentapp.flight.FlightStatus;

import java.time.ZonedDateTime;

public record FlightDTO(
        String flightNumber,
        String airlineName,
        Integer departureAirportId,
        Integer arrivalAirportId,
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX")
        ZonedDateTime departureTime,
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX")
        ZonedDateTime arrivalTime,
        FlightStatus flightStatus
) {}