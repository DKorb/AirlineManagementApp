package pl.backend.airlinemanagmentapp.flight.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import pl.backend.airlinemanagmentapp.flight.FlightStatus;

import java.time.LocalDateTime;

public record FlightDTO(
        String flightNumber,
        String airlineName,
        Integer departureAirportId,
        Integer arrivalAirportId,
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
        LocalDateTime departureTime,
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
        LocalDateTime arrivalTime,
        FlightStatus flightStatus
) {}