CREATE TABLE `airports`
(
    `id`      int          NOT NULL AUTO_INCREMENT,
    `name`    varchar(255) NOT NULL,
    `city`    varchar(255) NOT NULL,
    `code`    varchar(255) NOT NULL,
    `country` varchar(255) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `UK_8x5wlokxte7yksdsllxtxbjf0` (`code`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 1
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;


INSERT INTO `airports` (`city`, `code`, `country`, `name`)
VALUES ('Warszawa', 'WAW', 'Polska', 'Lotnisko Chopina'),
       ('Kraków', 'KRK', 'Polska', 'Lotnisko Balice'),
       ('Londyn', 'LHR', 'Wielka Brytania', 'Heathrow Airport'),
       ('Nowy Jork', 'JFK', 'USA', 'John F. Kennedy International Airport'),
       ('Tokio', 'HND', 'Japonia', 'Tokyo Haneda Airport'),
       ('Dubaj', 'DXB', 'Zjednoczone Emiraty Arabskie', 'Dubai International Airport'),
       ('Sydney', 'SYD', 'Australia', 'Sydney Airport'),
       ('Paryż', 'CDG', 'Francja', 'Charles de Gaulle Airport'),
       ('Frankfurt', 'FRA', 'Niemcy', 'Frankfurt Airport'),
       ('Singapur', 'SIN', 'Singapur', 'Singapore Changi Airport'),
       ('Madryt', 'MAD', 'Hiszpania', 'Adolfo Suárez Madrid–Barajas Airport'),
       ('Toronto', 'YYZ', 'Kanada', 'Toronto Pearson International Airport'),
       ('Moskwa', 'SVO', 'Rosja', 'Sheremetyevo International Airport'),
       ('Sao Paulo', 'GRU', 'Brazylia', 'São Paulo–Guarulhos International Airport'),
       ('Hongkong', 'HKG', 'Hongkong', 'Hong Kong International Airport'),
       ('Johannesburg', 'JNB', 'RPA', 'O.R. Tambo International Airport'),
       ('Istanbul', 'IST', 'Turcja', 'Istanbul Airport'),
       ('Meksyk', 'MEX', 'Meksyk', 'Mexico City International Airport'),
       ('Kair', 'CAI', 'Egipt', 'Cairo International Airport'),
       ('Bangkok', 'BKK', 'Tajlandia', 'Suvarnabhumi Airport');