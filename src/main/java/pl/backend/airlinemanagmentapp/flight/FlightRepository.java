package pl.backend.airlinemanagmentapp.flight;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;;import java.util.Optional;

@Repository
public interface FlightRepository extends JpaRepository<Flight, Integer> {

    Optional<Flight> findFlightByFlightNumber(String flightNumber);

    boolean existsByFlightNumber(String flightNumber);

    @Transactional
    void deleteByFlightNumber(String flightNumber);

    @Transactional
    @Modifying
    @Query("UPDATE Flight f SET f.flightStatus = :status WHERE f.flightNumber = :flightNumber")
    void updateFlightStatus(String flightNumber, FlightStatus status);

}