package pl.backend.airlinemanagmentapp.airport.dto;

import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AirportDTO {

    @Size(min = 3, max = 3, message = "Code must be 3 characters long")
    private String code;

    private String name;

    private String city;

    private String country;

}