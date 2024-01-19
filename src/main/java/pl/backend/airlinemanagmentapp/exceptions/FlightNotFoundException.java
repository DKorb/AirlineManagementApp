package pl.backend.airlinemanagmentapp.exceptions;

public class FlightNotFoundException extends RuntimeException {

    public FlightNotFoundException(String flightNumber) {
        super("Flight with flight number " + flightNumber + " not found");
    }

}