
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
    `position` VARCHAR(255),
    PRIMARY KEY (`worker_id`)
);

INSERT INTO `worker`(`first_name`, `last_name`, `position`) VALUES
('JOSH', 'KINZEL', 'OWNER'),
('GRANIT', 'ARIFI', 'OWNER'),
('STEVE', 'IRWIN', 'TRAINER'),
('MIKE', 'DUNDEE', 'TRAINER'),
('CESAR', 'MILLAN', 'TRAINER'),
('JOE', 'SCHMO', 'MAINTENANCE'),
('STEVE', 'JOBS', 'TICKET SALES');

CREATE TABLE `cage` (
    `cage_id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
    `cage_name` VARCHAR(255),
    `cage_size` int(11),
    `worker_id` smallint(5) unsigned NOT NULL,
    PRIMARY KEY (`cage_id`),
    CONSTRAINT `fk_cage_worker` FOREIGN KEY (`worker_id`) REFERENCES `worker`(`worker_id`) ON UPDATE CASCADE 
);

INSERT INTO `cage`(`cage_name`, `cage_size`, `worker_id`) VALUES
('MASSIVE1',1500,3),
('AQUA1',600,3),
('MONKEY CAGE',800,4),
('SAVANNA',1000,3),
('AQUA2',800,4),
('MASSIVE2',2000,6),
('LION\'S DEN', 700, 4);

INSERT INTO `cage`(`cage_name`, `worker_id`) VALUES
('FUTURE EXPANSION', 4);

CREATE TABLE `animal` (
    `animal_id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
    `animal_type` VARCHAR(255) NOT NULL,
    `cage_id` smallint(5) unsigned NOT NULL,
    PRIMARY KEY (`animal_id`),
    CONSTRAINT `fk_animal_cage` FOREIGN KEY (`cage_id`) REFERENCES `cage`(`cage_id`) ON UPDATE CASCADE 
);

INSERT INTO `animal`(`animal_type`, `cage_id`) VALUES
('LION', 7),
('PENGUIN', 2),
('PENGUIN', 2),
('HIPPOPOTAMUS', 1),
('ZEBRA', 4),
('MONKEY', 3),
('MONKEY', 3),
('MONKEY', 3),
('DOLPHIN', 5),
('DOLPHIN', 5),
('ELEPHANT', 6);

CREATE TABLE `food` (
    `food_id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
    `food_type` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`food_id`)
);

INSERT INTO `food`(`food_type`) VALUES
('MEAT'),
('GRASS'),
('FISH'),
('FRUIT'),
('SEEDS/NUTS');

CREATE TABLE `food_animal` (
    `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
    `food_id` smallint(5) unsigned NOT NULL,
    `animal_id` smallint(5) unsigned NOT NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT `fk_food_animal_food` FOREIGN KEY (`food_id`) REFERENCES `food`(`food_id`) ON UPDATE CASCADE,
    CONSTRAINT `fk_food_animal_animal` FOREIGN KEY (`animal_id`) REFERENCES `animal`(`animal_id`) ON UPDATE CASCADE 
);

INSERT INTO `food_animal`(`food_id`, `animal_id`) VALUES
(1,1),
(3,2),
(3,3),
(2,4),
(2,5),
(5,6),
(5,7),
(4,8),
(5,8),
(3,9),
(3,10),
(2,11),
(4,11);

CREATE TABLE `worker_animal` (
    `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
    `worker_id` smallint(5) unsigned NOT NULL,
    `animal_id` smallint(5) unsigned NOT NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT `fk_worker_animal_worker` FOREIGN KEY (`worker_id`) REFERENCES `worker`(`worker_id`) ON UPDATE CASCADE, 
    CONSTRAINT `fk_worker_animal_animal` FOREIGN KEY (`animal_id`) REFERENCES `animal`(`animal_id`) ON UPDATE CASCADE 
);

INSERT INTO `worker_animal`(`worker_id`, `animal_id`) VALUES
(3,1),
(4,2),
(3,3),
(4,4),
(5,5),
(4,5),
(5,6),
(5,7),
(5,8),
(3,8),
(4,9),
(3,10),
(3,11);