package pl.backend.airlinemanagmentapp.flight.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import pl.backend.airlinemanagmentapp.airport.dto.AirportBasicDTO;
import pl.backend.airlinemanagmentapp.flight.FlightStatus;

import java.time.LocalDateTime;

public record FlightResponseDTO(
        Integer id,
        String flightNumber,
        String airlineName,
        AirportBasicDTO departureAirport,
        AirportBasicDTO arrivalAirport,
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
        LocalDateTime departureTime,
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
        LocalDateTime arrivalTime,
        FlightStatus flightStatus,
        Long flightDuration
) {}