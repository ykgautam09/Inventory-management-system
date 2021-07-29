-- table structure
CREATE TABLE `book`(
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `description` TEXT NULL DEFAULT NULL,
    `author` VARCHAR(100) DEFAULT NULL,
    `category` VARCHAR(50) DEFAULT NULL,
    `price` INT DEFAULT 0,
    `quantity` INT DEFAULT 0
);