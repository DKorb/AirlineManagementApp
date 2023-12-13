package pl.backend.airlinemanagmentapp.exceptions;

public class AirportNotFoundException extends RuntimeException {

    public AirportNotFoundException(String message) {
        super(message);
    }

}