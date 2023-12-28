package pl.backend.airlinemanagmentapp.user;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import pl.backend.airlinemanagmentapp.exceptions.dto.DefaultResponseDTO;
import pl.backend.airlinemanagmentapp.file.FileService;
import pl.backend.airlinemanagmentapp.ticket.TicketService;
import pl.backend.airlinemanagmentapp.ticket.dto.TicketDTO;
import pl.backend.airlinemanagmentapp.ticket.dto.TicketResponseDTO;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private final TicketService ticketService;

    private final FileService fileService;

    @GetMapping("/{username}/tickets")
    public ResponseEntity<List<TicketResponseDTO>> getUserTickets(@PathVariable String username) {
        log.info("Fetching tickets for user: {}", username);
        List<TicketResponseDTO> tickets = ticketService.getTicketsByUsername(username);
        return ResponseEntity.ok(tickets);
    }

    @GetMapping("tickets")
    public ResponseEntity<Page<TicketResponseDTO>> getAllTickets(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        log.info("Fetching all tickets - page: {}, size: {}", page, size);
        var pageable = PageRequest.of(page, size);
        Page<TicketResponseDTO> ticketsPage = ticketService.getAllTickets(pageable);
        return new ResponseEntity<>(ticketsPage, HttpStatus.OK);
    }

    @PostMapping("/{userId}/tickets")
    public ResponseEntity<TicketResponseDTO> addTicketToUser(@PathVariable Integer userId, @RequestBody TicketDTO ticketDto) {
        log.info("Adding a new ticket to user ID: {}", userId);
        TicketResponseDTO ticketResponse = ticketService.addTicketToUser(ticketDto, userId);
        return ResponseEntity.ok(ticketResponse);
    }

    @DeleteMapping("/{userId}/tickets/{ticketId}")
    public ResponseEntity<?> deleteUserTicket(@PathVariable Integer userId, @PathVariable Integer ticketId) {
        log.info("Deleting ticket ID: {} for user ID: {}", ticketId, userId);
        ticketService.deleteUserTicket(userId, ticketId);
        var deleteResponse = DefaultResponseDTO.builder()
                .message("Ticket with ID " + ticketId + " for user with ID " + userId + " has been successfully deleted.")
                .build();
        return new ResponseEntity<>(deleteResponse, HttpStatus.OK);
    }

    @GetMapping("/{userId}/tickets/{ticketId}/pdf")
    public ResponseEntity<byte[]> generateUserTicket(@PathVariable Integer userId, @PathVariable Integer ticketId) {
        log.info("Generating PDF for ticket ID: {} of user ID: {}", ticketId, userId);
        var ticket = ticketService.getTicketByUserIdAndTicketId(userId, ticketId);
        var pdfContent = fileService.generateTicketPdf(ticket);

        var headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDisposition(ContentDisposition.attachment()
                .filename("ticket-" + ticketId + ".pdf")
                .build());

        return new ResponseEntity<>(pdfContent, headers, HttpStatus.OK);
    }

}