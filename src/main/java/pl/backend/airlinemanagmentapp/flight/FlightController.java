package pl.backend.airlinemanagmentapp.flight;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.backend.airlinemanagmentapp.exceptions.dto.DefaultResponseDTO;
import pl.backend.airlinemanagmentapp.flight.dto.FlightDTO;
import pl.backend.airlinemanagmentapp.flight.dto.FlightResponseDTO;

import java.util.List;

@RestController
@RequestMapping("/api/v1/flights")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class FlightController {

    private final FlightService flightService;

    @PostMapping
    public ResponseEntity<FlightResponseDTO> createFlight(@RequestBody FlightDTO flight) {
        return new ResponseEntity<>(flightService.createFlight(flight), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<FlightResponseDTO> getFlightById(@PathVariable Integer id) {
        return new ResponseEntity<>(flightService.findFlightResponseById(id), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<FlightResponseDTO>> getAllFlights() {
        return new ResponseEntity<>(flightService.findAllFlights(), HttpStatus.OK);
    }

    @PutMapping("/{flightId}")
    public ResponseEntity<FlightResponseDTO> updateFlight(@PathVariable Integer flightId, @RequestBody FlightDTO flightDTO) {
        return new ResponseEntity<>(flightService.updateFlight(flightId, flightDTO), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteFlight(@PathVariable Integer id) {
        flightService.deleteFlight(id);
        var deleteResponse = DefaultResponseDTO.builder()
                .message("Flight with ID " + id + " has been successfully deleted.")
                .build();
        return new ResponseEntity<>(deleteResponse, HttpStatus.OK);
    }

}