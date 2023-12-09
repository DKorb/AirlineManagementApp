package pl.backend.airlinemanagmentapp.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.backend.airlinemanagmentapp.user.Role;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {

    private String username;

    private String email;

    private String password;

    private Role role;

}