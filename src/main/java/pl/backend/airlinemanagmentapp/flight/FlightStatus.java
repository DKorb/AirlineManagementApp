package pl.backend.airlinemanagmentapp.flight;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum FlightStatus {
    DELAYED,
    IN_AIR,
    ARRIVED,
    CANCELLED,
    SCHEDULED
}