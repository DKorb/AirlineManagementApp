package pl.backend.airlinemanagmentapp.ticket.dto;

import java.time.LocalDate;
public record TicketDTO(
        String flightNumber,
        LocalDate purchaseTime
) {}