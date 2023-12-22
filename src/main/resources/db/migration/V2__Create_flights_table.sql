CREATE TABLE `flights`
(
    `id`                   int                                                         NOT NULL AUTO_INCREMENT,
    `arrival_airport_id`   int                                                         NOT NULL,
    `departure_airport_id` int                                                         NOT NULL,
    `arrival_time`         datetime(6)                                                 NOT NULL,
    `departure_time`       datetime(6)                                                 NOT NULL,
    `flight_duration`      bigint DEFAULT NULL,
    `airline_name`         varchar(255)                                                NOT NULL,
    `flight_number`        varchar(255)                                                NOT NULL UNIQUE,
    `flight_status`        enum ('DELAYED','IN_AIR','ARRIVED','CANCELLED','SCHEDULED') NOT NULL,
    PRIMARY KEY (`id`),
    KEY `FKr90ujcvdphv3co3ry7aiel6l4` (`arrival_airport_id`),
    KEY `FK27lt4nklvbrwsw7x32dw0d05q` (`departure_airport_id`),
    CONSTRAINT `FK27lt4nklvbrwsw7x32dw0d05q` FOREIGN KEY (`departure_airport_id`) REFERENCES `airports` (`id`),
    CONSTRAINT `FKr90ujcvdphv3co3ry7aiel6l4` FOREIGN KEY (`arrival_airport_id`) REFERENCES `airports` (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;

INSERT INTO `flights`
(`departure_airport_id`, `arrival_airport_id`, `arrival_time`, `departure_time`, `flight_duration`, `airline_name`,
 `flight_number`, `flight_status`)
VALUES (1, 2, '2023-12-10 10:00:00', '2023-12-10 08:00:00', 120, 'LOT Polish Airlines', 'LO308', 'SCHEDULED'),
       (3, 4, '2023-12-11 12:30:00', '2023-12-11 10:30:00', 120, 'British Airways', 'BA287', 'SCHEDULED'),
       (5, 6, '2023-12-12 16:00:00', '2023-12-12 14:00:00', 120, 'Emirates', 'EK450', 'DELAYED'),
       (7, 8, '2023-12-13 18:30:00', '2023-12-13 16:30:00', 120, 'Qantas', 'QF12', 'SCHEDULED'),
       (9, 10, '2023-12-14 20:00:00', '2023-12-14 18:00:00', 120, 'Lufthansa', 'LH400', 'ARRIVED'),
       (11, 12, '2023-12-15 09:00:00', '2023-12-15 07:00:00', 120, 'Air France', 'AF356', 'CANCELLED'),
       (13, 14, '2023-12-16 11:30:00', '2023-12-16 09:30:00', 120, 'United Airlines', 'UA900', 'SCHEDULED'),
       (15, 16, '2023-12-17 14:00:00', '2023-12-17 12:00:00', 120, 'Singapore Airlines', 'SQ321', 'IN_AIR'),
       (17, 18, '2023-12-18 16:30:00', '2023-12-18 14:30:00', 120, 'Aeroflot', 'SU100', 'SCHEDULED'),
       (19, 20, '2023-12-19 19:00:00', '2023-12-19 17:00:00', 120, 'Cathay Pacific', 'CX250', 'SCHEDULED'),
       (2, 1, '2023-12-20 08:30:00', '2023-12-20 06:30:00', 120, 'KLM', 'KL601', 'SCHEDULED'),
       (4, 3, '2023-12-21 11:00:00', '2023-12-21 09:00:00', 120, 'Delta Air Lines', 'DL200', 'SCHEDULED'),
       (6, 5, '2023-12-22 13:30:00', '2023-12-22 11:30:00', 120, 'Air Canada', 'AC33', 'SCHEDULED'),
       (8, 7, '2023-12-23 16:00:00', '2023-12-23 14:00:00', 120, 'Thai Airways', 'TG910', 'SCHEDULED'),
       (10, 9, '2023-12-24 18:30:00', '2023-12-24 16:30:00', 120, 'SWISS', 'LX41', 'SCHEDULED'),
       (12, 11, '2023-12-25 21:00:00', '2023-12-25 19:00:00', 120, 'Finnair', 'AY57', 'SCHEDULED'),
       (14, 13, '2023-12-26 09:30:00', '2023-12-26 07:30:00', 120, 'Iberia', 'IB6400', 'SCHEDULED'),
       (16, 15, '2023-12-27 12:00:00', '2023-12-27 10:00:00', 120, 'Alitalia', 'AZ608', 'SCHEDULED'),
       (18, 17, '2023-12-28 14:30:00', '2023-12-28 12:30:00', 120, 'ANA', 'NH203', 'SCHEDULED'),
       (20, 19, '2023-12-29 17:00:00', '2023-12-29 15:00:00', 120, 'Turkish Airlines', 'TK5', 'SCHEDULED');
