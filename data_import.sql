
DROP TABLE IF EXISTS `food_animal`;
DROP TABLE IF EXISTS `worker_animal`;
DROP TABLE IF EXISTS `food`;
DROP TABLE IF EXISTS `animal`;
DROP TABLE IF EXISTS `cage`;
DROP TABLE IF EXISTS `worker`;

CREATE TABLE `worker` (
    `worker_id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,
    `position` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`worker_id`)
);

INSERT INTO `worker`(`first_name`, `last_name`, `position`) VALUES
('JOSH', 'KINZEL', 'OWNER'),
('GRANIT', 'ARIFI', 'OWNER'),
('BABE', 'RUTH', 'TRAINER'),
('JIMI', 'HENDRIX', 'TRAINER'),
('TOM', 'CRUISE', 'TRAINER'),
('GEORGE', 'WASHINGTON', 'TICKET SALES');

CREATE TABLE `cage` (
    `cage_id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
    `worker_id` smallint(5) unsigned NOT NULL,
    PRIMARY KEY (`cage_id`),
    CONSTRAINT `fk_cage_worker` FOREIGN KEY (`worker_id`) REFERENCES `worker`(`worker_id`) ON UPDATE CASCADE 
);

INSERT INTO `cage`(`worker_id`) VALUES
(3),
(3),
(4),
(3),
(5),
(4);

CREATE TABLE `animal` (
    `animal_id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
    `animal_type` VARCHAR(255) NOT NULL,
    `cage_id` smallint(5) unsigned NOT NULL,
    PRIMARY KEY (`animal_id`),
    CONSTRAINT `fk_animal_cage` FOREIGN KEY (`cage_id`) REFERENCES `cage`(`cage_id`) ON UPDATE CASCADE 
);

CREATE TABLE `food` (
    `food_id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
    `food_type` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`food_id`)
);

CREATE TABLE `food_animal` (
    `food_id` smallint(5) unsigned NOT NULL,
    `animal_id` smallint(5) unsigned NOT NULL,
    PRIMARY KEY (`food_id`, `animal_id`),
    CONSTRAINT `fk_food_animal_food` FOREIGN KEY (`food_id`) REFERENCES `food`(`food_id`) ON UPDATE CASCADE,
    CONSTRAINT `fk_food_animal_animal` FOREIGN KEY (`animal_id`) REFERENCES `animal`(`animal_id`) ON UPDATE CASCADE 
);

CREATE TABLE `worker_animal` (
    `worker_id` smallint(5) unsigned NOT NULL,
    `animal_id` smallint(5) unsigned NOT NULL,
    PRIMARY KEY (`worker_id`, `animal_id`),
    CONSTRAINT `fk_worker_animal_worker` FOREIGN KEY (`worker_id`) REFERENCES `worker`(`worker_id`) ON UPDATE CASCADE, 
    CONSTRAINT `fk_worker_animal_animal` FOREIGN KEY (`animal_id`) REFERENCES `animal`(`animal_id`) ON UPDATE CASCADE 
);