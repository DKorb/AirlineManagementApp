package pl.backend.airlinemanagmentapp.airport.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AirportDTO {

    private String code;

    private String name;

    private String city;

    private String country;

}