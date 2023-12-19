package pl.backend.airlinemanagmentapp.ticket;

import jakarta.persistence.*;
import lombok.*;
import pl.backend.airlinemanagmentapp.flight.Flight;
import pl.backend.airlinemanagmentapp.user.User;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tickets")
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "flight_id", nullable = false)
    private Flight flight;

    @Column(nullable = false)
    private LocalDateTime purchaseTime;

}