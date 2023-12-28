package pl.backend.airlinemanagmentapp.flight;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import pl.backend.airlinemanagmentapp.airport.Airport;
import pl.backend.airlinemanagmentapp.airport.AirportService;
import pl.backend.airlinemanagmentapp.airport.dto.AirportBasicDTO;
import pl.backend.airlinemanagmentapp.exceptions.CustomDuplicateKeyException;
import pl.backend.airlinemanagmentapp.exceptions.FlightNotFoundException;
import pl.backend.airlinemanagmentapp.flight.dto.FlightDTO;
import pl.backend.airlinemanagmentapp.flight.dto.FlightResponseDTO;
import pl.backend.airlinemanagmentapp.flight.dto.FlightStatusDTO;
import pl.backend.airlinemanagmentapp.ticket.TicketRepository;

import java.time.Duration;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class FlightService {

    private final FlightRepository flightRepository;
    private final TicketRepository ticketRepository;
    private final AirportService airportService;

    public Page<FlightResponseDTO> findAllFlights(Pageable pageable) {
        return flightRepository.findAll(pageable)
                .map(this::convertToFlightResponseDTO);
    }

    public FlightResponseDTO findFlightResponseById(Integer flightId) {
        return flightRepository.findById(flightId)
                .map(this::convertToFlightResponseDTO)
                .orElseThrow(() -> new FlightNotFoundException(flightId));
    }

    public FlightResponseDTO findFlightByFlightNumber(String flightNumber) {
        return flightRepository.findFlightByFlightNumber(flightNumber)
                .map(this::convertToFlightResponseDTO)
                .orElseThrow(() -> new FlightNotFoundException(flightNumber));
    }

    public Flight findFlightEntityByFlightNumber(String flightNumber) {
        return flightRepository.findFlightByFlightNumber(flightNumber)
                .orElseThrow(() -> new FlightNotFoundException(flightNumber));
    }

    public FlightResponseDTO createFlight(FlightDTO flightDTO) {
        var flightDuration = calculateMinutesBetweenFlights(flightDTO.departureTime(), flightDTO.arrivalTime());
        if (flightRepository.existsByFlightNumber(flightDTO.flightNumber())) {
            throw new CustomDuplicateKeyException(flightDTO.flightNumber());
        }
        var flight = createFlightEntityFromDTO(flightDTO, flightDuration);
        var savedFlight = flightRepository.save(flight);
        return convertToFlightResponseDTO(savedFlight);
    }

    private Flight createFlightEntityFromDTO(FlightDTO flightDTO, Long flightDuration) {
        var departureAirport = airportService.fetchAirportById(flightDTO.departureAirportId());
        var arrivalAirport = airportService.fetchAirportById(flightDTO.arrivalAirportId());

        return Flight.builder()
                .flightNumber(flightDTO.flightNumber())
                .airlineName(flightDTO.airlineName())
                .departureAirport(departureAirport)
                .arrivalAirport(arrivalAirport)
                .arrivalTime(flightDTO.arrivalTime())
                .departureTime(flightDTO.departureTime())
                .flightStatus(flightDTO.flightStatus())
                .flightDuration(flightDuration)
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
                arrivalInfo,
                flight.getDepartureTime(),
                flight.getArrivalTime(),
                flight.getFlightStatus(),
                flight.getFlightDuration());
    }

    private AirportBasicDTO convertToAirportBasicInfo(Airport airport) {
        return new AirportBasicDTO(
                airport.getId(),
                airport.getCode(),
                airport.getName(),
                airport.getCity(),
                airport.getCountry());
    }

    public FlightResponseDTO updateFlight(FlightDTO flightDTO) {

        var existingFlight = flightRepository.findFlightByFlightNumber(flightDTO.flightNumber())
                .orElseThrow(() -> new FlightNotFoundException(flightDTO.flightNumber()));
        existingFlight.setFlightNumber(flightDTO.flightNumber());
        existingFlight.setAirlineName(flightDTO.airlineName());

        var departureAirport = airportService.fetchAirportById(flightDTO.departureAirportId());
        existingFlight.setDepartureAirport(departureAirport);

        var arrivalAirport = airportService.fetchAirportById(flightDTO.arrivalAirportId());
        existingFlight.setArrivalAirport(arrivalAirport);

        existingFlight.setArrivalTime(flightDTO.arrivalTime());
        existingFlight.setDepartureTime(flightDTO.departureTime());
        existingFlight.setFlightDuration(calculateMinutesBetweenFlights(flightDTO.departureTime(), flightDTO.arrivalTime()));
        existingFlight.setFlightStatus(flightDTO.flightStatus());

        var updatedFlight = flightRepository.save(existingFlight);

        return convertToFlightResponseDTO(updatedFlight);
    }

    public void changeFlightStatus(String flightNumber, FlightStatusDTO flightStatusDTO) {
        if (!flightRepository.existsByFlightNumber(flightNumber)) {
            throw new FlightNotFoundException(flightNumber);
        }
        flightRepository.updateFlightStatus(flightNumber, flightStatusDTO.flightStatus());
    }



    public void deleteFlight(String flightNumber) {
        if (!flightRepository.existsByFlightNumber(flightNumber)) {
            throw new FlightNotFoundException(flightNumber);
        }
        ticketRepository.deleteTicketsByFlightNumber(flightNumber);
        flightRepository.deleteByFlightNumber(flightNumber);
    }

    public Long calculateMinutesBetweenFlights(LocalDateTime departureTime, LocalDateTime arrivalTime) {
        return Duration.between(departureTime, arrivalTime).toMinutes();
    }

}