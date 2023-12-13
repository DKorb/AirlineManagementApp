package pl.backend.airlinemanagmentapp.flight;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.backend.airlinemanagmentapp.airport.Airport;
import pl.backend.airlinemanagmentapp.airport.AirportService;
import pl.backend.airlinemanagmentapp.exceptions.AirportNotFoundException;
import pl.backend.airlinemanagmentapp.exceptions.FlightNotFoundException;
import pl.backend.airlinemanagmentapp.flight.dto.FlightDTO;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FlightService {

    private final FlightRepository flightRepository;

    private final AirportService airportService;

    public List<FlightDTO> findAllFlights() {
        List<Flight> flights = flightRepository.findAll();
        return flights.stream()
                .map(this::convertToDto)
                .toList();
    }

    private FlightDTO convertToDto(Flight flight) {
        return new FlightDTO(
                flight.getFlightNumber(),
                flight.getDepartureAirport().getId(),
                flight.getArrivalAirport().getId());
    }

    public Flight findFlightById(Integer id) throws FlightNotFoundException {
        return flightRepository.findById(id)
                .orElseThrow(() -> new FlightNotFoundException("Flight with ID " + id + " not found"));
    }

    public Flight createFlight(FlightDTO flightDTO) throws AirportNotFoundException {
        Airport departureAirport = airportService.findAirportById(flightDTO.getDepartureAirportId());

        Airport arrivalAirport = airportService.findAirportById(flightDTO.getArrivalAirportId());

        Flight flight = Flight.builder()
                .flightNumber(flightDTO.getFlightNumber())
                .departureAirport(departureAirport)
                .arrivalAirport(arrivalAirport)
                .build();

        return flightRepository.save(flight);
    }

    public Flight updateFlight(Integer id) throws FlightNotFoundException {
        Flight existingFlight = findFlightById(id);
        return flightRepository.save(existingFlight);
    }

    public void deleteFlight(Integer id) {
        flightRepository.deleteById(id);
    }

}
