package pl.backend.airlinemanagmentapp.airport;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.backend.airlinemanagmentapp.exceptions.AirportNotFoundException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AirportService {

    private final AirportRepository airportRepository;

    public List<Airport> findAllAirports() {
        return airportRepository.findAll();
    }

    public Airport findAirportById(Integer id) throws AirportNotFoundException {
        return airportRepository.findById(id)
                .orElseThrow(() -> new AirportNotFoundException("Airport with ID " + id + " not found"));
    }

    public Airport createAirport(Airport airport) {
        return airportRepository.save(airport);
    }

    public Airport updateAirport(Integer id) throws AirportNotFoundException {
        Airport existingAirport = findAirportById(id);
        return airportRepository.save(existingAirport);
    }

    public void deleteAirport(Integer id) {
        airportRepository.deleteById(id);
    }
}