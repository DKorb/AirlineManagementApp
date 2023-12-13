package pl.backend.airlinemanagmentapp.user;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.backend.airlinemanagmentapp.exceptions.FlightNotFoundException;
import pl.backend.airlinemanagmentapp.ticket.Ticket;
import pl.backend.airlinemanagmentapp.ticket.TicketService;
import pl.backend.airlinemanagmentapp.ticket.dto.TicketDTO;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final TicketService ticketService;

    @GetMapping("/{userId}/tickets")
    public ResponseEntity<List<Ticket>> getUserTickets(@PathVariable Integer userId) {
        List<Ticket> tickets = ticketService.getTicketsByUserId(userId);
        return ResponseEntity.ok(tickets);
    }

    @PostMapping("/{userId}/tickets")
    public ResponseEntity<Ticket> addTicketToUser(@PathVariable Integer userId, @RequestBody TicketDTO ticketDto) throws FlightNotFoundException {
        Ticket ticket = ticketService.addTicketToUser(ticketDto, userId);
        return ResponseEntity.ok(ticket);
    }

    @DeleteMapping("/{userId}/tickets/{ticketId}")
    public ResponseEntity<?> deleteUserTicket(@PathVariable Integer userId, @PathVariable Integer ticketId) {
        ticketService.deleteUserTicket(userId, ticketId);
        return ResponseEntity.ok().build();
    }

}