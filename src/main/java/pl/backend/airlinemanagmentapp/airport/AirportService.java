package pl.backend.airlinemanagmentapp.airport;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.backend.airlinemanagmentapp.airport.dto.AirportDTO;
import pl.backend.airlinemanagmentapp.airport.dto.UpdateAirportDTO;
import pl.backend.airlinemanagmentapp.exceptions.AirportNotFoundException;
import pl.backend.airlinemanagmentapp.exceptions.CustomDuplicateKeyException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AirportService {

    private final AirportRepository airportRepository;

    public List<AirportDTO> findAllAirports() {
        return airportRepository.findAll().stream()
                .map(this::convertToDto)
                .toList();
    }

    public Airport findAirportById(Integer id) {
        return airportRepository.findById(id)
                .orElseThrow(() -> new AirportNotFoundException("Airport with ID " + id + " not found"));
    }

    public AirportDTO createAirport(Airport airport) {
        if (airportRepository.existsByCode(airport.getCode())) {
            throw new CustomDuplicateKeyException("Airport with code " + airport.getCode() + " already exists.");
        }
        Airport savedAirport = airportRepository.save(airport);
        return convertToDto(savedAirport);
    }

    public AirportDTO updateAirport(Integer airportId, UpdateAirportDTO updateAirportDTO) {
        Airport existingAirport = airportRepository.findById(airportId)
                .orElseThrow(() -> new AirportNotFoundException("Airport with ID " + airportId + " not found"));

        existingAirport.setName(updateAirportDTO.getName());
        existingAirport.setCity(updateAirportDTO.getCity());
        existingAirport.setCountry(updateAirportDTO.getCountry());

        Airport updatedAirport = airportRepository.save(existingAirport);
        return convertToDto(updatedAirport);
    }

    public void deleteAirport(Integer airportId) {
        airportRepository.deleteById(airportId);
    }

    private AirportDTO convertToDto(Airport airport) {
        return AirportDTO.builder()
                .code(airport.getCode())
                .name(airport.getName())
                .city(airport.getCity())
                .country(airport.getCountry())
                .build();
    }
}