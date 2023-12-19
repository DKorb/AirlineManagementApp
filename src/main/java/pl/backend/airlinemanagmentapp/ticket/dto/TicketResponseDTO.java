package pl.backend.airlinemanagmentapp.ticket.dto;

import pl.backend.airlinemanagmentapp.flight.dto.FlightResponseDTO;
import pl.backend.airlinemanagmentapp.user.dto.UserBasicDTO;

public record TicketResponseDTO(
        Integer ticketId,
        FlightResponseDTO flight,
        UserBasicDTO user
) {}