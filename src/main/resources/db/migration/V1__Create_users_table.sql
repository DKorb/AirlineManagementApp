CREATE TABLE IF NOT EXISTS `users`
(
    `id`         INT          NOT NULL AUTO_INCREMENT,
    `username`   VARCHAR(255) NOT NULL,
    `password`   VARCHAR(255) NOT NULL,
    `email`      VARCHAR(255)           DEFAULT NULL,
    `role`       ENUM ('USER', 'ADMIN') DEFAULT NULL,
    `created_at` DATETIME(6)            DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `UK_username` (`username`),
    UNIQUE KEY `UK_email` (`email`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;
