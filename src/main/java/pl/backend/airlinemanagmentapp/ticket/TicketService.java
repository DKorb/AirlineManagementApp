package pl.backend.airlinemanagmentapp.ticket;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.backend.airlinemanagmentapp.exceptions.FlightNotFoundException;
import pl.backend.airlinemanagmentapp.flight.Flight;
import pl.backend.airlinemanagmentapp.flight.FlightService;
import pl.backend.airlinemanagmentapp.ticket.dto.TicketDTO;
import pl.backend.airlinemanagmentapp.user.User;
import pl.backend.airlinemanagmentapp.user.UserService;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TicketService {

    private final TicketRepository ticketRepository;

    private final FlightService flightService;

    private final UserService userService;

    public List<Ticket> getTicketsByUserId(Integer userId) {
        return ticketRepository.findTicketsByUserId(userId);
    }

    public void deleteUserTicket(Integer userId, Integer ticketId) {
        ticketRepository.deleteByIdAndUserId(ticketId, userId);
    }

    public Ticket addTicketToUser(TicketDTO ticketDTO, Integer userId) throws FlightNotFoundException {
        User user = userService.findUserById(userId);
        Flight flight = flightService.findFlightById(ticketDTO.flightId());

        Ticket ticket = Ticket.builder()
                .user(user)
                .flight(flight)
                .purchaseTime((ticketDTO.purchaseTime() != null ? ticketDTO.purchaseTime() : LocalDate.now()).atStartOfDay())
                .build();

        return ticketRepository.save(ticket);
    }

}