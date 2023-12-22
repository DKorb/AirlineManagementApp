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
                .map(this::convertToAirportDto)
                .toList();
    }

    public Airport fetchAirportById(Integer airportId) {
        return airportRepository.findById(airportId)
                .orElseThrow(() -> new AirportNotFoundException(airportId));
    }

    public AirportDTO findAirportById(Integer airportId) {
        return airportRepository.findById(airportId)
                .map(this::convertToAirportDto)
                .orElseThrow(() -> new AirportNotFoundException(airportId));
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
        return convertToAirportDto(savedAirport);
    }

    public AirportDTO updateAirport(Integer airportId, UpdateAirportDTO updateAirportDTO) {
        Airport existingAirport = airportRepository.findById(airportId)
                .orElseThrow(() -> new AirportNotFoundException(airportId));

        existingAirport.setName(updateAirportDTO.name());
        existingAirport.setCity(updateAirportDTO.city());
        existingAirport.setCountry(updateAirportDTO.country());

        Airport updatedAirport = airportRepository.save(existingAirport);
        return convertToAirportDto(updatedAirport);
    }

    public void deleteAirport(Integer airportId) {
        if (!airportRepository.existsById(airportId)) {
            throw new AirportNotFoundException(airportId);
        }
        airportRepository.deleteById(airportId);
    }


    private AirportDTO convertToAirportDto(Airport airport) {
        return new AirportDTO(
                airport.getId(),
                airport.getCode(),
                airport.getName(),
                airport.getCity(),
                airport.getCountry()
        );
    }
}