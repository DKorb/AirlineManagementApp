package pl.backend.airlinemanagmentapp.exceptions;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import pl.backend.airlinemanagmentapp.exceptions.dto.DefaultResponseDTO;

import java.sql.SQLIntegrityConstraintViolationException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<DefaultResponseDTO> handleDataIntegrityViolationException(DataIntegrityViolationException ex) {
        String message = "An error occurred. Please check your request.";

        if (ex.getRootCause() instanceof SQLIntegrityConstraintViolationException) {
            message = "Duplicate entry not allowed.";
        }
        var errorResponseDTO = DefaultResponseDTO.builder()
                .message(message)
                .build();
        return new ResponseEntity<>(errorResponseDTO, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(CustomDuplicateKeyException.class)
    public ResponseEntity<DefaultResponseDTO> handleCustomDuplicateKeyException(CustomDuplicateKeyException ex) {
        DefaultResponseDTO defaultResponseDTO = DefaultResponseDTO.builder()
                .message(ex.getMessage())
                .build();
        return new ResponseEntity<>(defaultResponseDTO, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(AirportNotFoundException.class)
    public ResponseEntity<DefaultResponseDTO> handleAirportNotFoundException(AirportNotFoundException ex) {
        DefaultResponseDTO defaultResponseDTO = DefaultResponseDTO.builder()
                .message(ex.getMessage())
                .build();
        return new ResponseEntity<>(defaultResponseDTO, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(FlightNotFoundException.class)
    public ResponseEntity<DefaultResponseDTO> handleFlightNotFoundException(FlightNotFoundException ex) {
        DefaultResponseDTO defaultResponseDTO = DefaultResponseDTO.builder()
                .message(ex.getMessage())
                .build();
        return new ResponseEntity<>(defaultResponseDTO, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(InvalidAirportCodeException.class)
    public ResponseEntity<DefaultResponseDTO> handleInvalidAirportCodeException(InvalidAirportCodeException ex) {
        DefaultResponseDTO defaultResponseDTO = DefaultResponseDTO.builder()
                .message(ex.getMessage())
                .build();
        return new ResponseEntity<>(defaultResponseDTO, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(TicketNotFoundException.class)
    public ResponseEntity<DefaultResponseDTO> handleTicketNotFoundException(TicketNotFoundException ex) {
        DefaultResponseDTO defaultResponseDTO = DefaultResponseDTO.builder()
                .message(ex.getMessage())
                .build();
        return new ResponseEntity<>(defaultResponseDTO, HttpStatus.NOT_FOUND);
    }

}
