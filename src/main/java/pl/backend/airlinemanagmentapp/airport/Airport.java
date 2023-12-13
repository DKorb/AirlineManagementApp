package pl.backend.airlinemanagmentapp.airport;


import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.backend.airlinemanagmentapp.flight.Flight;

import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "airports")
public class Airport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, unique = true)
    @Size(min = 3, max = 3, message = "Code must be 3 characters long")
    private String code;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String city;

    @Column(nullable = false)
    private String country;

    @OneToMany(mappedBy = "departureAirport")
    private Set<Flight> departingFlights;

    @OneToMany(mappedBy = "arrivalAirport")
    private Set<Flight> arrivingFlights;


}