package pl.backend.airlinemanagmentapp.ticket.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TicketDTO {

    private Integer flightId;
    private LocalDate purchaseTime;

}