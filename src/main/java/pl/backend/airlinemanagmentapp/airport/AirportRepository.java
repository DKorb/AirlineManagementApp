package pl.backend.airlinemanagmentapp.airport;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AirportRepository extends JpaRepository<Airport, Integer> {

    boolean existsByCode(String code);

}