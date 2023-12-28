package pl.backend.airlinemanagmentapp.flight;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.backend.airlinemanagmentapp.exceptions.dto.DefaultResponseDTO;
import pl.backend.airlinemanagmentapp.flight.dto.FlightDTO;
import pl.backend.airlinemanagmentapp.flight.dto.FlightResponseDTO;
import pl.backend.airlinemanagmentapp.flight.dto.FlightStatusDTO;

@RestController
@RequestMapping("/api/v1/flights")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "http://localhost:3000")
public class FlightController {

    private final FlightService flightService;

    @PostMapping
    public ResponseEntity<FlightResponseDTO> createFlight(@RequestBody FlightDTO flight) {
        return new ResponseEntity<>(flightService.createFlight(flight), HttpStatus.OK);
    }

    @GetMapping("/{flightNumber}")
    public ResponseEntity<FlightResponseDTO> getFlightByFlightNumber(@PathVariable String flightNumber) {
        log.info("Fetching flight with flight number: {}", flightNumber);
        return new ResponseEntity<>(flightService.findFlightByFlightNumber(flightNumber), HttpStatus.OK);
    }

//    @GetMapping("/{id}")
//    public ResponseEntity<FlightResponseDTO> getFlightById(@PathVariable Integer id) {
//        return new ResponseEntity<>(flightService.findFlightResponseById(id), HttpStatus.OK);
//    }

    @GetMapping
    public ResponseEntity<Page<FlightResponseDTO>> getAllFlights(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        log.info("Fetching all flights - page: {}, size: {}", page, size);
        var pageable = PageRequest.of(page, size);
        Page<FlightResponseDTO> flightPage = flightService.findAllFlights(pageable);
        return new ResponseEntity<>(flightPage, HttpStatus.OK);
    }

    @PutMapping("{flightId}")
    public ResponseEntity<FlightResponseDTO> updateFlight(@RequestBody FlightDTO flightDTO) {
        return new ResponseEntity<>(flightService.updateFlight(flightDTO), HttpStatus.OK);
    }

    @DeleteMapping("/{flightNumber}")
    public ResponseEntity<?> deleteFlight(@PathVariable String flightNumber) {
        log.info("Deleting flight with flight number: {}", flightNumber);
        flightService.deleteFlight(flightNumber);
        var deleteResponse = DefaultResponseDTO.builder()
                .message("Flight with number " + flightNumber + " has been successfully deleted.")
                .build();
        return new ResponseEntity<>(deleteResponse, HttpStatus.OK);
    }

    @PatchMapping("{flightNumber}")
    public ResponseEntity<?> changeFlightStatus(@PathVariable String flightNumber,
                                                @RequestBody FlightStatusDTO flightStatusDTO) {
        log.info("Changing flight status - Flight Number: {}, New Status: {}", flightNumber, flightStatusDTO.flightStatus());
        flightService.changeFlightStatus(flightNumber, flightStatusDTO);
        var updateResponse = DefaultResponseDTO.builder()
                .message("Flight " + flightNumber + " status has been successfully updated to " + flightStatusDTO.flightStatus())
                .build();
        return new ResponseEntity<>(updateResponse, HttpStatus.OK);
    }

}

