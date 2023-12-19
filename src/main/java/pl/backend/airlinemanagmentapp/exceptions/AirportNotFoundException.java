package pl.backend.airlinemanagmentapp.exceptions;

import org.aspectj.bridge.IMessage;

public class AirportNotFoundException extends RuntimeException {

    public AirportNotFoundException(String message) {
        super(message);
    }

}