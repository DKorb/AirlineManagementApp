CREATE TABLE `flights`
(
    `id`                   int          NOT NULL AUTO_INCREMENT,
    `airline_name`         varchar(255) NOT NULL,
    `flight_number`        varchar(255) NOT NULL,
    `arrival_airport_id`   int          NOT NULL,
    `departure_airport_id` int          NOT NULL,
    PRIMARY KEY (`id`),
    KEY `FKr90ujcvdphv3co3ry7aiel6l4` (`arrival_airport_id`),
    KEY `FK27lt4nklvbrwsw7x32dw0d05q` (`departure_airport_id`),
    CONSTRAINT `FK27lt4nklvbrwsw7x32dw0d05q` FOREIGN KEY (`departure_airport_id`) REFERENCES `airports` (`id`),
    CONSTRAINT `FKr90ujcvdphv3co3ry7aiel6l4` FOREIGN KEY (`arrival_airport_id`) REFERENCES `airports` (`id`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 1
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;


INSERT INTO `flights` (`departure_airport_id`, `arrival_airport_id`, `airline_name`, `flight_number`)
VALUES (1, 2, 'LOT Polish Airlines', 'LO308'),
       (3, 4, 'British Airways', 'BA287'),
       (5, 6, 'Emirates', 'EK450'),
       (7, 8, 'Qantas', 'QF12'),
       (9, 10, 'Lufthansa', 'LH400'),
       (11, 12, 'Air France', 'AF356'),
       (13, 14, 'United Airlines', 'UA900'),
       (15, 16, 'Singapore Airlines', 'SQ321'),
       (17, 18, 'Aeroflot', 'SU100'),
       (19, 20, 'Cathay Pacific', 'CX250'),
       (2, 1, 'KLM', 'KL601'),
       (4, 3, 'Delta Air Lines', 'DL200'),
       (6, 5, 'Air Canada', 'AC33'),
       (8, 7, 'Thai Airways', 'TG910'),
       (10, 9, 'SWISS', 'LX41'),
       (12, 11, 'Finnair', 'AY57'),
       (14, 13, 'Iberia', 'IB6400'),
       (16, 15, 'Alitalia', 'AZ608'),
       (18, 17, 'ANA', 'NH203'),
       (20, 19, 'Turkish Airlines', 'TK5'),
       (1, 3, 'Ryanair', 'FR2376'),
       (2, 4, 'easyJet', 'U28522'),
       (3, 5, 'Norwegian', 'DY7082'),
       (4, 6, 'JetBlue', 'B62015'),
       (5, 7, 'Alaska Airlines', 'AS102'),
       (6, 8, 'Spirit Airlines', 'NK301'),
       (7, 9, 'Frontier Airlines', 'F92141'),
       (8, 10, 'Hawaiian Airlines', 'HA445'),
       (9, 11, 'Aer Lingus', 'EI105'),
       (10, 12, 'Air New Zealand', 'NZ6'),
       (11, 13, 'Virgin Atlantic', 'VS103'),
       (12, 14, 'South African Airways', 'SA203'),
       (13, 15, 'Ethiopian Airlines', 'ET501'),
       (14, 16, 'EgyptAir', 'MS985'),
       (15, 17, 'Royal Air Maroc', 'AT201'),
       (16, 18, 'Kenya Airways', 'KQ101'),
       (17, 19, 'Qatar Airways', 'QR707'),
       (18, 20, 'Etihad Airways', 'EY101'),
       (19, 1, 'Saudi Arabian Airlines', 'SV21'),
       (20, 2, 'LATAM Airlines', 'LA800');