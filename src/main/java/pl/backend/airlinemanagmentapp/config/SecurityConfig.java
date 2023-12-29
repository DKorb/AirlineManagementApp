package pl.backend.airlinemanagmentapp.config;


import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import pl.backend.airlinemanagmentapp.auth.AuthAccessDeniedHandler;

import static org.springframework.http.HttpMethod.*;
import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableMethodSecurity
public class SecurityConfig {

    private static final String AIRPORT_ENDPOINT = "/api/v1/airports/**";
    private static final String FLIGHT_ENDPOINT = "/api/v1/flights/**";
    private static final String USER_ENDPOINT = "/api/v1/users/**";
    private static final String ROLE_ADMIN = "ADMIN";
    private static final String ROLE_USER = "USER";

    private static final String[] WHITE_LIST_URL = {
            "/api/v1/auth/**",
            "/v2/api-docs",
            "/v3/api-docs",
            "/v3/api-docs/**",
            "/swagger-resources",
            "/swagger-resources/**",
            "/configuration/ui",
            "/configuration/security",
            "/swagger-ui/**",
            "/webjars/**",
            "/swagger-ui.html"};

    private final JWTAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;
    private final LogoutHandler logoutHandler;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(req ->
                        req.requestMatchers(WHITE_LIST_URL)
                                .permitAll()
                                .requestMatchers(POST, AIRPORT_ENDPOINT).hasAnyRole(ROLE_ADMIN)
                                .requestMatchers(PUT, AIRPORT_ENDPOINT).hasAnyRole(ROLE_ADMIN)
                                .requestMatchers(DELETE, AIRPORT_ENDPOINT).hasAnyRole(ROLE_ADMIN)
                                .requestMatchers(GET, AIRPORT_ENDPOINT).hasAnyRole(ROLE_ADMIN)
                                .requestMatchers(PUT, FLIGHT_ENDPOINT).hasAnyRole(ROLE_ADMIN)
                                .requestMatchers(PATCH, FLIGHT_ENDPOINT).hasAnyRole(ROLE_ADMIN)
                                .requestMatchers(DELETE, FLIGHT_ENDPOINT).hasAnyRole(ROLE_ADMIN)
                                .requestMatchers(GET, FLIGHT_ENDPOINT).permitAll()
                                .requestMatchers(POST, USER_ENDPOINT).hasAnyRole(ROLE_ADMIN)
                                .requestMatchers(PUT, USER_ENDPOINT).hasAnyRole(ROLE_ADMIN)
                                .requestMatchers(DELETE, USER_ENDPOINT).hasAnyRole(ROLE_ADMIN)
                                .requestMatchers(GET, USER_ENDPOINT).hasAnyRole(ROLE_ADMIN, ROLE_USER)
                                .requestMatchers(POST, "/api/v1/users/*/tickets").hasAnyRole(ROLE_ADMIN, ROLE_USER)
                                .anyRequest()
                                .authenticated()
                )
                .exceptionHandling(exceptionHandling -> exceptionHandling.accessDeniedHandler(new AuthAccessDeniedHandler()))
                .sessionManagement(session -> session.sessionCreationPolicy(STATELESS))
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .logout(logout ->
                        logout.logoutUrl("/api/v1/auth/logout")
                                .addLogoutHandler(logoutHandler)
                                .logoutSuccessHandler((request, response, authentication) -> SecurityContextHolder.clearContext())
                )
        ;

        return http.build();
    }
}