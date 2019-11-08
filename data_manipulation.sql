-- Query for adding a new worker with colon : character being used to
-- denote the variables that will have data from the backend programming language
INSERT INTO `worker`(`first_name`, `last_name`, `position`) 
VALUES (:first_nameInput, :last_nameInput, :positionInput);

-- Query for adding a new cage with colon : character being used to
-- denote the variables that will have data from the backend programming language
INSERT INTO `cage`(`cage_name`, `cage_size`, `worker_id`) 
VALUES (:cage_nameInput, :cage_sizeInput, :worker_idInput);

-- Query for adding a new animal with colon : character being used to
-- denote the variables that will have data from the backend programming language
INSERT INTO `animal`(`animal_type`, `cage_id`) 
VALUES (:animal_typeInput, :cage_idInput);

-- Query for adding a new food with colon : character being used to
-- denote the variables that will have data from the backend programming language
INSERT INTO `food`(`food_type`) 
VALUES (:food_typeInput)

-- Query for adding a new food_animal relationship with colon : character being used to
-- denote the variables that will have data from the backend programming language
INSERT INTO `food_animal`(`food_id`, `animal_id`) 
VALUES (:food_idInput, :animal_idInput);


-- Query for adding a new worker_animal relationship with colon : character being used to
-- denote the variables that will have data from the backend programming language
INSERT INTO `worker_animal`(`worker_id`, `animal_id`) 
VALUES (:worker_idInput, :animal_idInput);