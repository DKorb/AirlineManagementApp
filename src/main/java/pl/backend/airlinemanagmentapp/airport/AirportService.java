package pl.backend.airlinemanagmentapp.airport;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.backend.airlinemanagmentapp.airport.dto.AirportDTO;
import pl.backend.airlinemanagmentapp.airport.dto.UpdateAirportDTO;
import pl.backend.airlinemanagmentapp.exceptions.AirportNotFoundException;
import pl.backend.airlinemanagmentapp.exceptions.CustomDuplicateKeyException;
import pl.backend.airlinemanagmentapp.exceptions.InvalidAirportCodeException;

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
        String airportCode = airport.getCode();
        if (airportCode.length() != 3) {
            throw new InvalidAirportCodeException(airportCode);
        }
        if (airportRepository.existsByCode(airportCode)) {
            throw new CustomDuplicateKeyException(airportCode);
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

    public void deleteAirport(Integer id) {
        if (!airportRepository.existsById(id)) {
            throw new AirportNotFoundException("Airport with ID " + id + " does not exist.");
        }
        airportRepository.deleteById(id);
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