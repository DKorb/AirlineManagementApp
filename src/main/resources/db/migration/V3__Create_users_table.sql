CREATE TABLE `users`
(
    `id`         int          NOT NULL AUTO_INCREMENT,
    `username`   varchar(255) NOT NULL,
    `first_name` varchar(255) NOT NULL,
    `last_name`  varchar(255) NOT NULL,
    `password`   varchar(255) NOT NULL,
    `role`       enum ('USER','ADMIN') DEFAULT NULL,
    `created_at` date                  DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `UK_r43af9ap4edm43mmtq01oddj6` (`username`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 1
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;

INSERT INTO `users` (`first_name`, `last_name`, `password`, `username`, `role`, `created_at`)
VALUES ('Jan', 'Kowalski', '$2a$10$zSRRIc8KjNc74s4JhWbUS.Cj7/1HqaOIOQiz9G0PWGVcvYAKwiwI6', 'jkowalski@mail.com', 'USER', '2020-10-02'),
       ('Anna', 'Nowak', '$2a$10$zSRRIc8KjNc74s4JhWbUS.Cj7/1HqaOIOQiz9G0PWGVcvYAKwiwI6', 'anowak@mail.com', 'USER', '2020-10-02'),
       ('Piotr', 'Zalewski', '$2a$10$zSRRIc8KjNc74s4JhWbUS.Cj7/1HqaOIOQiz9G0PWGVcvYAKwiwI6', 'pzalewski@mail.com', 'USER', '2020-10-02'),
       ('Katarzyna', 'Maj', '$2a$10$zSRRIc8KjNc74s4JhWbUS.Cj7/1HqaOIOQiz9G0PWGVcvYAKwiwI6', 'kmaj@mail.com', 'USER', '2020-10-02'),
       ('Marcin', 'Borowski', '$2a$10$zSRRIc8KjNc74s4JhWbUS.Cj7/1HqaOIOQiz9G0PWGVcvYAKwiwI6', 'mborowski@mail.com', 'USER', '2020-10-02'),
       ('Agnieszka', 'Kubiak', '$2a$10$zSRRIc8KjNc74s4JhWbUS.Cj7/1HqaOIOQiz9G0PWGVcvYAKwiwI6', 'akubiak@mail.com', 'USER', '2020-10-02'),
       ('Tomasz', 'Jankowski', '$2a$10$zSRRIc8KjNc74s4JhWbUS.Cj7/1HqaOIOQiz9G0PWGVcvYAKwiwI6', 'tjankowski@mail.com', 'USER', '2020-10-02'),
       ('Magdalena', 'Ostrowska', '$2a$10$zSRRIc8KjNc74s4JhWbUS.Cj7/1HqaOIOQiz9G0PWGVcvYAKwiwI6', 'mostrowska@mail.com', 'USER', '2020-10-02'),
       ('Andrzej', 'Kowalczyk', '$2a$10$zSRRIc8KjNc74s4JhWbUS.Cj7/1HqaOIOQiz9G0PWGVcvYAKwiwI6', 'akowalczyk@mail.com', 'USER', '2020-10-02'),
       ('Małgorzata', 'Lewandowska', '$2a$10$zSRRIc8KjNc74s4JhWbUS.Cj7/1HqaOIOQiz9G0PWGVcvYAKwiwI6', 'mlewandowska@mail.com',
        'USER', '2020-10-02'),
       ('Michał', 'Wojciechowski', '$2a$10$zSRRIc8KjNc74s4JhWbUS.Cj7/1HqaOIOQiz9G0PWGVcvYAKwiwI6', 'mwojciechowski@mail.com',
        'USER', '2020-10-02'),
       ('Joanna', 'Kamińska', '$2a$10$zSRRIc8KjNc74s4JhWbUS.Cj7/1HqaOIOQiz9G0PWGVcvYAKwiwI6', 'jkaminska@mail.com', 'USER', '2020-10-02'),
       ('Krzysztof', 'Lewicki', '$2a$10$zSRRIc8KjNc74s4JhWbUS.Cj7/1HqaOIOQiz9G0PWGVcvYAKwiwI6', 'klewicki@mail.com', 'USER', '2020-10-02'),
       ('Barbara', 'Dąbrowska', '$2a$10$zSRRIc8KjNc74s4JhWbUS.Cj7/1HqaOIOQiz9G0PWGVcvYAKwiwI6', 'bdabrowska@mail.com', 'USER', '2020-10-02'),
       ('Robert', 'Mazur', '$2a$10$zSRRIc8KjNc74s4JhWbUS.Cj7/1HqaOIOQiz9G0PWGVcvYAKwiwI6', 'rmazur@mail.com', 'USER', '2020-10-02'),
       ('Monika', 'Krzemińska', '$2a$10$zSRRIc8KjNc74s4JhWbUS.Cj7/1HqaOIOQiz9G0PWGVcvYAKwiwI6', 'mkrzeminska@mail.com', 'USER', '2020-10-02'),
       ('Jakub', 'Szymański', '$2a$10$zSRRIc8KjNc74s4JhWbUS.Cj7/1HqaOIOQiz9G0PWGVcvYAKwiwI6', 'jszymanski@mail.com', 'USER', '2020-10-02'),
       ('Ewa', 'Szewczyk', '$2a$10$zSRRIc8KjNc74s4JhWbUS.Cj7/1HqaOIOQiz9G0PWGVcvYAKwiwI6', 'eszewczyk@mail.com', 'USER', '2020-10-02'),
       ('Mateusz', 'Czarnecki', '$2a$10$zSRRIc8KjNc74s4JhWbUS.Cj7/1HqaOIOQiz9G0PWGVcvYAKwiwI6', 'mczarnecki@mail.com', 'USER', '2020-10-02'),
       ('Zofia', 'Nowicka', '$2a$10$zSRRIc8KjNc74s4JhWbUS.Cj7/1HqaOIOQiz9G0PWGVcvYAKwiwI6', 'znowicka@mail.com', 'USER', '2020-10-02'),
       ('Admin', 'Adminvosky', '$2a$10$zSRRIc8KjNc74s4JhWbUS.Cj7/1HqaOIOQiz9G0PWGVcvYAKwiwI6', 'aadminovksy@mail.com', 'ADMIN', '2020-10-02');
