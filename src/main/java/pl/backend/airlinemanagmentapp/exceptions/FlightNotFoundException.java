package pl.backend.airlinemanagmentapp.exceptions;

public class FlightNotFoundException extends RuntimeException {

    public FlightNotFoundException(String message) {
        super(message);
    }

}