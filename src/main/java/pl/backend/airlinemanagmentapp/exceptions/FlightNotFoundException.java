package pl.backend.airlinemanagmentapp.exceptions;

public class FlightNotFoundException extends RuntimeException {

    public FlightNotFoundException(Integer flightId) {
        super("Flight with ID " + flightId + " not found");
    }

}