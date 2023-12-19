package pl.backend.airlinemanagmentapp.exceptions;

public class InvalidAirportCodeException extends RuntimeException {
    public InvalidAirportCodeException(String code) {
        super("Invalid airport code '" + code + "': must be exactly 3 characters long.");
    }
}