package pl.backend.airlinemanagmentapp;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class AirlineManagementAppApplication {

	public static void main(String[] args) {
		var dotenv = Dotenv.load();
		System.setProperty("SPRING_DATASOURCE_USERNAME", dotenv.get("SPRING_DATASOURCE_USERNAME"));
		System.setProperty("SPRING_DATASOURCE_PASSWORD", dotenv.get("SPRING_DATASOURCE_PASSWORD"));
		System.setProperty("MYSQLDB_DATABASE", dotenv.get("MYSQLDB_DATABASE"));
		System.setProperty("MYSQLDB_LOCAL_PORT", dotenv.get("MYSQLDB_LOCAL_PORT"));

		SpringApplication.run(AirlineManagementAppApplication.class, args);
	}

}