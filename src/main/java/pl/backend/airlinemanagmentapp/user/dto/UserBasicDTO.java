package pl.backend.airlinemanagmentapp.user.dto;

public record UserBasicDTO(
        Integer id,
        String username,
        String firstname,
        String lastName
) {}