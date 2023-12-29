package pl.backend.airlinemanagmentapp.flight.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import pl.backend.airlinemanagmentapp.airport.dto.AirportBasicDTO;
import pl.backend.airlinemanagmentapp.flight.FlightStatus;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;

public record FlightResponseDTO(
        Integer id,
        String flightNumber,
        String airlineName,
        AirportBasicDTO departureAirport,
        AirportBasicDTO arrivalAirport,
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
        ZonedDateTime departureTime,
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
        ZonedDateTime arrivalTime,
        FlightStatus flightStatus,
        Long flightDuration
) {}