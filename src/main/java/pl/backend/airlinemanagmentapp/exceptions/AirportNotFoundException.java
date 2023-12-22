package pl.backend.airlinemanagmentapp.exceptions;


public class AirportNotFoundException extends RuntimeException {

    public AirportNotFoundException(Integer airportId) {
        super("Airport with ID " + airportId + " not found");
    }

}