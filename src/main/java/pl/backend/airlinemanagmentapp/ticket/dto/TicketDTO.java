package pl.backend.airlinemanagmentapp.ticket.dto;

import java.time.LocalDate;
public record TicketDTO(Integer flightId, LocalDate purchaseTime) {}