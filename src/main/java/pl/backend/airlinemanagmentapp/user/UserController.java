package pl.backend.airlinemanagmentapp.user;

import lombok.RequiredArgsConstructor;
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
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private final TicketService ticketService;

    @GetMapping("/{userId}/tickets")
    public ResponseEntity<List<TicketResponseDTO>> getUserTickets(@PathVariable Integer userId) {
        List<TicketResponseDTO> tickets = ticketService.getTicketsByUserId(userId);
        return ResponseEntity.ok(tickets);
    }

    @PostMapping("/{userId}/tickets")
    public ResponseEntity<TicketResponseDTO> addTicketToUser(@PathVariable Integer userId, @RequestBody TicketDTO ticketDto) {
        TicketResponseDTO ticketResponse = ticketService.addTicketToUser(ticketDto, userId);
        return ResponseEntity.ok(ticketResponse);
    }

    @DeleteMapping("/{userId}/tickets/{ticketId}")
    public ResponseEntity<?> deleteUserTicket(@PathVariable Integer userId, @PathVariable Integer ticketId) {
        ticketService.deleteUserTicket(userId, ticketId);
        var deleteResponse = DefaultResponseDTO.builder()
                .message("Ticket with ID " + ticketId + " for user with ID " + userId + " has been successfully deleted.")
                .build();
        return new ResponseEntity<>(deleteResponse, HttpStatus.OK);
    }

    private final FileService fileService;

    // TODO: działa, ale do poprawki na potem
    @GetMapping("/{userId}/tickets/{ticketId}/pdf")
    public ResponseEntity<byte[]> generateUserTicket(@PathVariable Integer userId, @PathVariable Integer ticketId) {
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