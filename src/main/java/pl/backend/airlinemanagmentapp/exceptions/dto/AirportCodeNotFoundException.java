package pl.backend.airlinemanagmentapp.exceptions.dto;

public class AirportCodeNotFoundException extends RuntimeException {
    public AirportCodeNotFoundException(String code) {
        super("Airport with code " + code + " not found");
    }
}
