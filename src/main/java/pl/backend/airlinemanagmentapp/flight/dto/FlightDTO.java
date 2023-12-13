package pl.backend.airlinemanagmentapp.flight.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FlightDTO {

    private String flightNumber;
    private Integer departureAirportId;
    private Integer arrivalAirportId;

}