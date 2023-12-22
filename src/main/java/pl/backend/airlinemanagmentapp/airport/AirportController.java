package pl.backend.airlinemanagmentapp.airport;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.backend.airlinemanagmentapp.airport.dto.AirportDTO;
import pl.backend.airlinemanagmentapp.airport.dto.UpdateAirportDTO;
import pl.backend.airlinemanagmentapp.exceptions.dto.DefaultResponseDTO;


@RestController
@RequestMapping("/api/v1/airports")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class AirportController {

    private final AirportService airportService;

    @GetMapping
    public ResponseEntity<Page<AirportDTO>> getAllAirports(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        var pageable = PageRequest.of(page, size);
        Page<AirportDTO> airportPage = airportService.findAllAirports(pageable);
        return new ResponseEntity<>(airportPage, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AirportDTO> getAirportById(@PathVariable Integer id) {
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
    public ResponseEntity<DefaultResponseDTO> deleteAirport(@PathVariable Integer id) {
        airportService.deleteAirport(id);
        DefaultResponseDTO successResponseDTO = DefaultResponseDTO.builder()
                .message("Airport with ID " + id + " has been successfully deleted.")
                .build();
        return new ResponseEntity<>(successResponseDTO, HttpStatus.OK);
    }
}