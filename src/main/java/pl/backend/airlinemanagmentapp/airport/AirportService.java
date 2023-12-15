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

        existingAirport.setName(updateAirportDTO.name());
        existingAirport.setCity(updateAirportDTO.city());
        existingAirport.setCountry(updateAirportDTO.country());

        Airport updatedAirport = airportRepository.save(existingAirport);
        return convertToDto(updatedAirport);
    }

    public void deleteAirport(Integer airportId) {
        airportRepository.deleteById(airportId);
    }

    private AirportDTO convertToDto(Airport airport) {
        return new AirportDTO(
                airport.getId(),
                airport.getCode(),
                airport.getName(),
                airport.getCity(),
                airport.getCountry()
        );
    }
}