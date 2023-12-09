CREATE TABLE IF NOT EXISTS `token`
(
    `id`         int    NOT NULL AUTO_INCREMENT,
    `user_id`    int             DEFAULT NULL,
    `expired`    bit(1) NOT NULL,
    `revoked`    bit(1) NOT NULL,
    `token`      varchar(255)    DEFAULT NULL,
    `token_type` enum ('BEARER') DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `UK_pddrhgwxnms2aceeku9s2ewy5` (`token`),
    KEY `FKj8rfw4x0wjjyibfqq566j4qng` (`user_id`),
    CONSTRAINT `FKj8rfw4x0wjjyibfqq566j4qng` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci