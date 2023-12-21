package pl.backend.airlinemanagmentapp.flight;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.backend.airlinemanagmentapp.airport.Airport;
import pl.backend.airlinemanagmentapp.airport.AirportService;
import pl.backend.airlinemanagmentapp.airport.dto.AirportBasicDTO;
import pl.backend.airlinemanagmentapp.exceptions.FlightNotFoundException;
import pl.backend.airlinemanagmentapp.flight.dto.FlightDTO;
import pl.backend.airlinemanagmentapp.flight.dto.FlightResponseDTO;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FlightService {

    private final FlightRepository flightRepository;
    private final AirportService airportService;

    public List<FlightResponseDTO> findAllFlights() {
        return flightRepository.findAll().stream()
                .map(this::convertToFlightResponseDTO)
                .toList();
    }

    public FlightResponseDTO findFlightResponseById(Integer flightId) {
        var flight = flightRepository.findById(flightId)
                .orElseThrow(() -> new FlightNotFoundException(flightId));

        return convertToFlightResponseDTO(flight);
    }

    public Flight findFlightById(Integer flightId) {
        return flightRepository.findById(flightId)
                .orElseThrow(() -> new FlightNotFoundException(flightId));
    }


    public FlightResponseDTO createFlight(FlightDTO flightDTO) {
        var flight = createFlightEntityFromDTO(flightDTO);
        var savedFlight = flightRepository.save(flight);
        return convertToFlightResponseDTO(savedFlight);
    }

    private Flight createFlightEntityFromDTO(FlightDTO flightDTO) {
        var departureAirport = airportService.findAirportById(flightDTO.departureAirportId());
        var arrivalAirport = airportService.findAirportById(flightDTO.arrivalAirportId());

        return Flight.builder()
                .flightNumber(flightDTO.flightNumber())
                .airlineName(flightDTO.airlineName())
                .departureAirport(departureAirport)
                .arrivalAirport(arrivalAirport)
                .build();
    }

    private FlightResponseDTO convertToFlightResponseDTO(Flight flight) {
        var departureInfo = convertToAirportBasicInfo(flight.getDepartureAirport());
        var arrivalInfo = convertToAirportBasicInfo(flight.getArrivalAirport());

        return new FlightResponseDTO(
                flight.getId(),
                flight.getFlightNumber(),
                flight.getAirlineName(),
                departureInfo,
                arrivalInfo);
    }

    private AirportBasicDTO convertToAirportBasicInfo(Airport airport) {
        return new AirportBasicDTO(
                airport.getId(),
                airport.getCode(),
                airport.getName(),
                airport.getCity(),
                airport.getCountry());
    }

    public FlightResponseDTO updateFlight(Integer flightId, FlightDTO flightDTO) {
        var existingFlight = flightRepository.findById(flightId)
                .orElseThrow(() -> new FlightNotFoundException(flightId));

        existingFlight.setFlightNumber(flightDTO.flightNumber());
        existingFlight.setAirlineName(flightDTO.airlineName());

        var departureAirport = airportService.findAirportById(flightDTO.departureAirportId());
        existingFlight.setDepartureAirport(departureAirport);

        var arrivalAirport = airportService.findAirportById(flightDTO.arrivalAirportId());
        existingFlight.setArrivalAirport(arrivalAirport);

        var updatedFlight = flightRepository.save(existingFlight);

        return convertToFlightResponseDTO(updatedFlight);
    }


    public void deleteFlight(Integer flightId) {
        if (!flightRepository.existsById(flightId)) {
            throw new FlightNotFoundException(flightId);
        }
        flightRepository.deleteById(flightId);
    }

}
