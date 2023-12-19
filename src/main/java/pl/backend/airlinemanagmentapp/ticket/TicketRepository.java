package pl.backend.airlinemanagmentapp.ticket;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Integer> {
    List<Ticket> findTicketsByUserId(Integer userId);

    Boolean existsByIdAndUserId(Integer ticketId, Integer userId);

    Ticket findTicketByIdAndUserId(Integer ticketId, Integer userId);

    @Transactional
    void deleteByIdAndUserId(Integer ticketId, Integer userId);
}
