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
VALUES ('Jan', 'Kowalski', '$2a$10$zSRRIc8KjNc74s4JhWbUS.Cj7/1HqaOIOQiz9G0PWGVcvYAKwiwI6', 'jkowalski', 'USER', '2020-10-02'),
       ('Anna', 'Nowak', '$2a$10$zSRRIc8KjNc74s4JhWbUS.Cj7/1HqaOIOQiz9G0PWGVcvYAKwiwI6', 'anowak', 'USER', '2020-10-02'),
       ('Piotr', 'Zalewski', '$2a$10$zSRRIc8KjNc74s4JhWbUS.Cj7/1HqaOIOQiz9G0PWGVcvYAKwiwI6', 'pzalewski', 'USER', '2020-10-02'),
       ('Katarzyna', 'Maj', '$2a$10$zSRRIc8KjNc74s4JhWbUS.Cj7/1HqaOIOQiz9G0PWGVcvYAKwiwI6', 'kmaj', 'USER', '2020-10-02'),
       ('Marcin', 'Borowski', '$2a$10$zSRRIc8KjNc74s4JhWbUS.Cj7/1HqaOIOQiz9G0PWGVcvYAKwiwI6', 'mborowski', 'USER', '2020-10-02'),
       ('Agnieszka', 'Kubiak', '$2a$10$zSRRIc8KjNc74s4JhWbUS.Cj7/1HqaOIOQiz9G0PWGVcvYAKwiwI6', 'akubiak', 'USER', '2020-10-02'),
       ('Tomasz', 'Jankowski', '$2a$10$zSRRIc8KjNc74s4JhWbUS.Cj7/1HqaOIOQiz9G0PWGVcvYAKwiwI6', 'tjankowski', 'USER', '2020-10-02'),
       ('Magdalena', 'Ostrowska', '$2a$10$zSRRIc8KjNc74s4JhWbUS.Cj7/1HqaOIOQiz9G0PWGVcvYAKwiwI6', 'mostrowska', 'USER', '2020-10-02'),
       ('Andrzej', 'Kowalczyk', '$2a$10$zSRRIc8KjNc74s4JhWbUS.Cj7/1HqaOIOQiz9G0PWGVcvYAKwiwI6', 'akowalczyk', 'USER', '2020-10-02'),
       ('Małgorzata', 'Lewandowska', '$2a$10$zSRRIc8KjNc74s4JhWbUS.Cj7/1HqaOIOQiz9G0PWGVcvYAKwiwI6', 'mlewandowska',
        'USER', '2020-10-02'),
       ('Michał', 'Wojciechowski', '$2a$10$zSRRIc8KjNc74s4JhWbUS.Cj7/1HqaOIOQiz9G0PWGVcvYAKwiwI6', 'mwojciechowski',
        'USER', '2020-10-02'),
       ('Joanna', 'Kamińska', '$2a$10$zSRRIc8KjNc74s4JhWbUS.Cj7/1HqaOIOQiz9G0PWGVcvYAKwiwI6', 'jkaminska', 'USER', '2020-10-02'),
       ('Krzysztof', 'Lewicki', '$2a$10$zSRRIc8KjNc74s4JhWbUS.Cj7/1HqaOIOQiz9G0PWGVcvYAKwiwI6', 'klewicki', 'USER', '2020-10-02'),
       ('Barbara', 'Dąbrowska', '$2a$10$zSRRIc8KjNc74s4JhWbUS.Cj7/1HqaOIOQiz9G0PWGVcvYAKwiwI6', 'bdabrowska', 'USER', '2020-10-02'),
       ('Robert', 'Mazur', '$2a$10$zSRRIc8KjNc74s4JhWbUS.Cj7/1HqaOIOQiz9G0PWGVcvYAKwiwI6', 'rmazur', 'USER', '2020-10-02'),
       ('Monika', 'Krzemińska', '$2a$10$zSRRIc8KjNc74s4JhWbUS.Cj7/1HqaOIOQiz9G0PWGVcvYAKwiwI6', 'mkrzeminska', 'USER', '2020-10-02'),
       ('Jakub', 'Szymański', '$2a$10$zSRRIc8KjNc74s4JhWbUS.Cj7/1HqaOIOQiz9G0PWGVcvYAKwiwI6', 'jszymanski', 'USER', '2020-10-02'),
       ('Ewa', 'Szewczyk', '$2a$10$zSRRIc8KjNc74s4JhWbUS.Cj7/1HqaOIOQiz9G0PWGVcvYAKwiwI6', 'eszewczyk', 'USER', '2020-10-02'),
       ('Mateusz', 'Czarnecki', '$2a$10$zSRRIc8KjNc74s4JhWbUS.Cj7/1HqaOIOQiz9G0PWGVcvYAKwiwI6', 'mczarnecki', 'USER', '2020-10-02'),
       ('Zofia', 'Nowicka', '$2a$10$zSRRIc8KjNc74s4JhWbUS.Cj7/1HqaOIOQiz9G0PWGVcvYAKwiwI6', 'znowicka', 'USER', '2020-10-02');
