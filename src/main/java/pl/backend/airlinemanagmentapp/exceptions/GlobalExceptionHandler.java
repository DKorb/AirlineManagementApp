package pl.backend.airlinemanagmentapp.exceptions;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import pl.backend.airlinemanagmentapp.exceptions.dto.ErrorResponseDTO;

import java.sql.SQLIntegrityConstraintViolationException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ErrorResponseDTO> handleDataIntegrityViolationException(DataIntegrityViolationException ex) {
        String message = "An error occurred. Please check your request.";

        if (ex.getRootCause() instanceof SQLIntegrityConstraintViolationException) {
            message = "Duplicate entry not allowed.";
        }
        var errorResponseDTO = ErrorResponseDTO.builder()
                .message(message)
                .build();
        return new ResponseEntity<>(errorResponseDTO, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(CustomDuplicateKeyException.class)
    public ResponseEntity<ErrorResponseDTO> handleCustomDuplicateKeyException(CustomDuplicateKeyException ex) {
        ErrorResponseDTO errorResponseDTO = ErrorResponseDTO.builder()
                .message(ex.getMessage())
                .build();
        return new ResponseEntity<>(errorResponseDTO, HttpStatus.CONFLICT);
    }
}
