-----------------------------------------------------------------------------------------
-- INSERT Queries
-----------------------------------------------------------------------------------------
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

-----------------------------------------------------------------------------------------
-- SELECT Queries
-----------------------------------------------------------------------------------------
-- Select animal info and assigned cage for all animals in the zoo 
SELECT animal.animal_id, animal.animal_type, animal.cage_id, cage.cage_name FROM animal
INNER JOIN cage ON animal.cage_id=cage.cage_id;

-- Select info of all workers in the zoo 
SELECT worker_id, first_name, last_name, position FROM worker;

-- Select info of all cages in the zoo 
SELECT cage_id, cage_name, cage_size FROM cage;

-- Select info of all food in the zoo 
SELECT food_id, food_type FROM food;

-- Query to select all approved foods for each animal in the zoo
SELECT food_animal.id, animal.animal_id, animal.animal_type, food.food_type FROM animal 
INNER JOIN food_animal ON animal.animal_id=food_animal.animal_id 
INNER JOIN food ON food_animal.food_id=food.food_id 
ORDER BY food_animal.id;

-- Query to select all worker assignemnts for each animal in the zoo
SELECT worker_animal.id, animal.animal_id, animal.animal_type, worker.worker_ID,
worker.first_name, worker.last_name FROM animal
INNER JOIN worker_animal ON animal.animal_id=worker_animal.animal_id
INNER JOIN worker ON worker_animal.worker_id=worker.worker_id
ORDER BY worker_animal.id;

-- Query to select the cage assignments for each worker in the zoo
SELECT cage.cage_id, cage.cage_name, worker.worker_ID, worker.first_name, 
worker.last_name FROM cage
INNER JOIN worker ON cage.worker_id=worker.worker_id
ORDER BY cage.cage_id;

-- Query to select zoo data based on search value specified by user with colon : character
-- being used to denote the variables that will have data from the backend programming language
SELECT :searchTable WHERE :searchCriteria = :searchValue

-----------------------------------------------------------------------------------------
-- UPDATE Queries
-----------------------------------------------------------------------------------------
-- Query to update an animal specified by the animal_id
UPDATE animal 
SET animal_type = :animal_typeInput, cage_id = :cage_idInput, cage_name = :cage_nameInput
WHERE animal_id = :animal_idInput

-- Query to update a worker specified by the worker_id
UPDATE worker 
SET first_name = :first_nameInput, last_name = :last_nameInput, position = :positionInput
WHERE worker_id = :worker_idInput

-- Query to update a food specified by the food_id
UPDATE food
SET food_type = :food_typeInput
WHERE food_id = :food_idInput

-- Query to update the food_animal table specified by the id
UPDATE food_animal
SET food_id = :food_idInput, animal_id = :animal_idInput
WHERE id = :idInput

-- Query to update the worker_animal table specified by the id
UPDATE worker_animal
SET worker_id = :worker_idInput, animal_id = :animal_idInput
WHERE id = :idInput
-----------------------------------------------------------------------------------------
-- DELETE Queries
-----------------------------------------------------------------------------------------
-- Query to delete an animal specified by the animal_id
DELETE FROM animal
WHERE animal_id = :animal_idInput

-- Query to delete a worker specified by the worker_id
DELETE FROM worker
WHERE worker_id = :worker_idInput

-- Query to delete a food specified by the food_id
DELETE FROM food
WHERE food_id = :food_idInput

-- Query to delete from the food_animal table specified by the id
DELETE FROM food_animal
WHERE id = :idInput

-- Query to delete from the worker_animal table specified by the id 
DELETE FROM worker_animal
WHERE id = :idInput