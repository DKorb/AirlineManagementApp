package pl.backend.airlinemanagmentapp.ticket;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import pl.backend.airlinemanagmentapp.airport.Airport;
import pl.backend.airlinemanagmentapp.airport.dto.AirportBasicDTO;
import pl.backend.airlinemanagmentapp.exceptions.TicketNotFoundException;
import pl.backend.airlinemanagmentapp.flight.Flight;
import pl.backend.airlinemanagmentapp.flight.FlightService;
import pl.backend.airlinemanagmentapp.flight.dto.FlightResponseDTO;
import pl.backend.airlinemanagmentapp.ticket.dto.TicketDTO;
import pl.backend.airlinemanagmentapp.ticket.dto.TicketResponseDTO;
import pl.backend.airlinemanagmentapp.user.User;
import pl.backend.airlinemanagmentapp.user.UserService;
import pl.backend.airlinemanagmentapp.user.dto.UserBasicDTO;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TicketService {

    private final TicketRepository ticketRepository;
    private final FlightService flightService;
    private final UserService userService;

    public List<TicketResponseDTO> getTicketsByUsername(String username) {
        List<Ticket> tickets = ticketRepository.findTicketsByUserUsername(username);
        return tickets.stream()
                .map(this::convertToTicketResponseDTO)
                .toList();
    }

    public Page<TicketResponseDTO> getAllTickets(Pageable pageable) {
        return ticketRepository.findAll(pageable)
                .map(this::convertToTicketResponseDTO);
    }

    public void deleteUserTicket(Integer userId, Integer ticketId) {
        if (Boolean.FALSE.equals(ticketRepository.existsByIdAndUserId(ticketId, userId))) {
            throw new TicketNotFoundException("Ticket with ID " + ticketId + " not found for user ID " + userId);
        }
        ticketRepository.deleteByIdAndUserId(ticketId, userId);
    }

    public TicketResponseDTO getTicketByUserIdAndTicketId(Integer userId, Integer ticketId) {
        Ticket ticket = ticketRepository.findTicketByIdAndUserId(ticketId, userId);
        if (ticket == null) {
            throw new EntityNotFoundException("Ticket not found or does not belong to user");
        }
        return convertToTicketResponseDTO(ticket);
    }


    public TicketResponseDTO addTicketToUser(TicketDTO ticketDTO, Integer userId) {
        User user = userService.findUserById(userId);
        Flight flight = flightService.findFlightEntityByFlightNumber(ticketDTO.flightNumber());

        Ticket ticket = Ticket.builder()
                .user(user)
                .flight(flight)
                .purchaseTime(ticketDTO.purchaseTime() != null ? ticketDTO.purchaseTime().atStartOfDay() : LocalDate.now().atStartOfDay())
                .build();

        Ticket savedTicket = ticketRepository.save(ticket);
        return convertToTicketResponseDTO(savedTicket);
    }

    private TicketResponseDTO convertToTicketResponseDTO(Ticket ticket) {
        FlightResponseDTO flightResponse = convertToFlightResponseDTO(ticket.getFlight());

        UserBasicDTO userResponse = new UserBasicDTO(
                ticket.getUser().getId(),
                ticket.getUser().getUsername(),
                ticket.getUser().getFirstName(),
                ticket.getUser().getLastName());

        return new TicketResponseDTO(ticket.getId(), flightResponse, userResponse);
    }

    private FlightResponseDTO convertToFlightResponseDTO(Flight flight) {
        AirportBasicDTO departureInfo = convertToAirportBasicInfo(flight.getDepartureAirport());
        AirportBasicDTO arrivalInfo = convertToAirportBasicInfo(flight.getArrivalAirport());
        return new FlightResponseDTO(flight.getId(),
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
        return new AirportBasicDTO(airport.getId(), airport.getCode(), airport.getName(), airport.getCity(), airport.getCountry());
    }
}
