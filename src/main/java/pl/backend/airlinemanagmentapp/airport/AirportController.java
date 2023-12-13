package pl.backend.airlinemanagmentapp.airport;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.backend.airlinemanagmentapp.exceptions.AirportNotFoundException;

import java.util.List;

@RestController
@RequestMapping("/api/v1/airports")
@RequiredArgsConstructor
public class AirportController {

    private final AirportService airportService;

    @GetMapping
    public ResponseEntity<List<Airport>> getAllAirports() {
        return new ResponseEntity<>(airportService.findAllAirports(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Airport> getAirportById(@PathVariable Integer id) throws AirportNotFoundException {
        return new ResponseEntity<>(airportService.findAirportById(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Airport> createAirport(@RequestBody Airport airport) {
        return new ResponseEntity<>(airportService.createAirport(airport), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Airport> updateAirport(@PathVariable Integer id) throws AirportNotFoundException {
        return new ResponseEntity<>(airportService.updateAirport(id), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAirport(@PathVariable Integer id) {
        airportService.deleteAirport(id);
        return ResponseEntity.ok().build();
    }

}