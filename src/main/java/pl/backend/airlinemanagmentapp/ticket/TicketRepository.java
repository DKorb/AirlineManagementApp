package pl.backend.airlinemanagmentapp.ticket;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Integer> {
    List<Ticket> findTicketsByUserId(Integer userId);

    List<Ticket> findTicketsByUserUsername(String username);

    Boolean existsByIdAndUserId(Integer ticketId, Integer userId);

    Ticket findTicketByIdAndUserId(Integer ticketId, Integer userId);

    @Transactional
    void deleteByIdAndUserId(Integer ticketId, Integer userId);

    @Transactional
    @Modifying
    @Query("DELETE FROM Ticket t WHERE t.flight.flightNumber = :flightNumber")
    void deleteTicketsByFlightNumber(String flightNumber);

}
