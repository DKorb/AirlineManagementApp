package pl.backend.airlinemanagmentapp.airport;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.backend.airlinemanagmentapp.airport.dto.AirportDTO;
import pl.backend.airlinemanagmentapp.airport.dto.UpdateAirportDTO;
import pl.backend.airlinemanagmentapp.exceptions.AirportNotFoundException;

import java.util.List;

@RestController
@RequestMapping("/api/v1/airports")
@RequiredArgsConstructor
public class AirportController {

    private final AirportService airportService;

    @GetMapping
    public ResponseEntity<List<AirportDTO>> getAllAirports() {
        return new ResponseEntity<>(airportService.findAllAirports(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Airport> getAirportById(@PathVariable Integer id) {
        return new ResponseEntity<>(airportService.findAirportById(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<AirportDTO> createAirport(@RequestBody Airport airport) {
        return new ResponseEntity<>(airportService.createAirport(airport), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AirportDTO> updateAirport(@PathVariable Integer id, @RequestBody UpdateAirportDTO updateAirportDTO) {
        AirportDTO airportDTO = airportService.updateAirport(id, updateAirportDTO);
        return ResponseEntity.ok(airportDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAirport(@PathVariable Integer id) {
        airportService.deleteAirport(id);
        return ResponseEntity.ok().build();
    }

}