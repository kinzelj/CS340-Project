var express = require('express');
var mysql = require('./dbcon.js');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/client/build')));

const port = process.env.PORT || 5000;

const attributeTag = {
    "animal.animal_id": "ANIMAL ID",
    "animal.animal_type": "ANIMAL TYPE",

    "worker.worker_id": "WORKER ID",
    "worker.first_name": "FIRST NAME",
    "worker.last_name": "LAST NAME",
    "worker.position": "POSITION",

    "cage.cage_id": "CAGE NUMBER",
    "cage.cage_name": "CAGE NAME",
    "cage.cage_size": "SQ FT",

    "food.food_id": "FOOD ID",
    "food.food_type": "FOOD TYPE",

    "id": "ENTRY ID"
}

function getTagKey(value) {
    return Object.keys(attributeTag).find(key => attributeTag[key] === value);
}

const queryText = {
    selectAnimals: "SELECT animal.animal_id AS '" + attributeTag["animal.animal_id"] +
        "', animal.animal_type AS '" + attributeTag["animal.animal_type"] +
        "', animal.cage_id AS '" + attributeTag["cage.cage_id"] +
        "', cage.cage_name AS '" + attributeTag["cage.cage_name"] +
        "' FROM animal INNER JOIN cage ON animal.cage_id=cage.cage_id",

    selectWorkers: "SELECT worker_id AS '" + attributeTag["worker.worker_id"] +
        "', first_name AS '" + attributeTag["worker.first_name"] +
        "', last_name AS '" + attributeTag["worker.last_name"] +
        "', position AS '" + attributeTag["worker.position"] + "' FROM worker",

    selectCages: "SELECT cage_id AS '" + attributeTag["cage.cage_id"] +
        "', cage_name AS '" + attributeTag["cage.cage_name"] +
        "', cage_size AS '" + attributeTag["cage.cage_size"] + "' FROM cage",

    selectFood: "SELECT food_id AS '" + attributeTag["food.food_id"] +
        "', food_type AS '" + attributeTag["food.food_type"] + "' FROM food",

    selectApprovedFoods:
        "SELECT food_animal.id AS '" + attributeTag["id"] +
        "', animal.animal_id AS '" + attributeTag["animal.animal_id"] +
        "', animal.animal_type AS '" + attributeTag["animal.animal_type"] +
        "', food.food_type AS '" + attributeTag["food.food_type"] + "' FROM animal " +
        "INNER JOIN food_animal ON animal.animal_id=food_animal.animal_id " +
        "INNER JOIN food ON food_animal.food_id=food.food_id",

    selectWorkerAnimals:
        "SELECT worker_animal.id AS '" + attributeTag["id"] +
        "', animal.animal_id AS '" + attributeTag["animal.animal_id"] +
        "', animal.animal_type AS '" + attributeTag["animal.animal_type"] +
        "', worker.worker_ID AS 'ASSIGNED WORKER ID', " +
        "worker.first_name AS 'WORKER FIRST NAME', worker.last_name AS 'WORKER LAST NAME' FROM animal " +
        "INNER JOIN worker_animal ON animal.animal_id=worker_animal.animal_id " +
        "INNER JOIN worker ON worker_animal.worker_id=worker.worker_id",

    selectWorkerCages:
        "SELECT cage.cage_id AS '" + attributeTag["cage.cage_id"] +
        "', cage.cage_name AS '" + attributeTag["cage.cage_name"] +
        "', worker.worker_ID AS 'ASSIGNED WORKER ID', worker.first_name AS 'WORKER FIRST NAME'" +
        ", worker.last_name AS 'WORKER LAST NAME' FROM cage " +
        "INNER JOIN worker ON cage.worker_id=worker.worker_id",
}


function getSelectQuery(queryType) {
    switch (queryType) {
        case ('animal'):
            {
                return (queryText.selectAnimals + " ORDER BY animal.animal_id");
            }
        case ('worker'):
            {
                return (queryText.selectWorkers);
            }
        case ('cage'):
            {
                return (queryText.selectCages);
            }
        case ('food'):
            {
                return (queryText.selectFood);
            }
        case ('approvedFoods'):
            {
                return (queryText.selectApprovedFoods + " ORDER BY food_animal.id");
            }
        case ('workerAnimal'):
            {
                return (queryText.selectWorkerAnimals + " ORDER BY worker_animal.id");
            }
        case ('workerCage'):
            {
                return (queryText.selectWorkerCages + " ORDER BY cage.cage_id");
            }
    }
}

app.post('/view', function (req, res, next) {
    var query = getSelectQuery(req.body.query);
    if (query) {
        var context = {};
        mysql.pool.query(query, function (err, rows, fields) {
            context.results = JSON.stringify(rows);
            res.send(context.results);
        })
    };
});

app.post('/search', function (req, res, next) {
    const searchTable = req.body.searchSelect;
    var searchCriteria = req.body.searchAttributeSelect;
    switch (searchCriteria) {
        case ("ASSIGNED WORKER ID"): {
            searchCriteria = "workder_id";
            break;
        }
        case ("WORKER FIRST NAME"): {
            searchCriteria = "first_name";
            break;
        }
        case ("ASSIGNED LAST NAME"): {
            searchCriteria = "last_name";
            break;
        }
        default: {
            searchCriteria = getTagKey(searchCriteria);
        }
    }

    var query = null;
    const values = [req.body.searchValue];
    switch (searchTable) {
        case ('animal'):
            {
                query = queryText.selectAnimals + " WHERE " + searchCriteria + "= ?";
                break;
            }
        case ('worker'):
            {
                query = queryText.selectWorkers + " WHERE " + searchCriteria + "= ?";
                break;
            }
        case ('cage'):
            {
                query = queryText.selectCages + " WHERE " + searchCriteria + "= ?";
                break;
            }
        case ('food'):
            {
                query = queryText.selectFood + " WHERE " + searchCriteria + "= ?";
                break;
            }
        case ('approvedFoods'):
            {
                query = queryText.selectApprovedFoods + " WHERE " + searchCriteria + "= ? ORDER BY food_animal.id";
                break;
            }
        case ('workerAnimal'):
            {
                query = queryText.selectWorkerAnimals + " WHERE " + searchCriteria + "= ? ORDER BY worker_animal.id";
                break;
            }
        case ('workerCage'):
            {
                query = queryText.selectWorkerCages + " WHERE " + searchCriteria + " = ? ORDER BY cage.cage_id";
                break;
            }
    }

    if (query) {
        var context = {};
        mysql.pool.query(query, values, function (err, rows, fields) {
            context.results = JSON.stringify(rows);
            res.send(context.results);
        })
    };
});

app.post('/add', function (req, res, next) {
    var query = null;
    var values = [];
    switch (req.body.calltype) {
        case ('addAnimal'): {
            var context = {};
            var foodID = req.body.addAnimalFood;
            query = "INSERT INTO `animal`(`animal_type`,`cage_id`) VALUES (?, ?)";
            values = [req.body.addAnimalType, req.body.addAnimalCage];
            mysql.pool.query(query, values, function (err, rows, fields) {
                if (err) {
                    next(err);
                    return;
                }
                var newAnimalId = rows.insertId;
                query = "INSERT INTO `food_animal`(`animal_id`, `food_id`) VALUES (?, ?)"
                values = [newAnimalId, foodID]
                mysql.pool.query(query, values, function (err, rows, fields) {
                    if (err) {
                        next(err);
                        return;
                    }
                    query = "INSERT INTO `worker_animal`(`animal_id`, `worker_id`) VALUES (?, ?)";
                    values = [newAnimalId, req.body.addAnimalWorker];
                    mysql.pool.query(query, values, function (err, rows, fields) {
                        if (err) {
                            next(err);
                            return;
                        }
                        context.results = JSON.stringify(rows);
                        res.send(context.results);
                    })
                })
            })
            break;
        }
        case ('addWorker'): {
            var context = {};
            query = "INSERT INTO `worker` (`first_name`, `last_name`, `position`) VALUES (?, ?, ?)";
            values = [req.body.addWorkerFirst, req.body.addWorkerLast, req.body.addWorkerPosition];
            mysql.pool.query(query, values, function (err, rows, fields) {
                if (err) {
                    console.log('err');
                    next(err);
                    return;
                }
                context.results = JSON.stringify(rows);
                res.send(context.results);
            })
            break;
        }
        case ('addFood'): {
            var context = {};
            query = "INSERT INTO `food` (`food_type`) VALUES (?)";
            values = [req.body.addFoodType];
            mysql.pool.query(query, values, function (err, rows, fields) {
                if (err) {
                    console.log('err');
                    next(err);
                    return;
                }
                context.results = JSON.stringify(rows);
                res.send(context.results);
            })
            break;
        }
        case ('addCage'): {
            var context = {};
            query = "INSERT INTO `cage` (`cage_name`, `cage_size`, `worker_id`) VALUES (?, ?, ?)";
            if (req.body.addCageSize === '') {
                req.body.addCageSize = null;
            }
            values = [req.body.addCageName, req.body.addCageSize, req.body.addCageWorker];
            // console.log(values);
            mysql.pool.query(query, values, function (err, rows, fields) {
                if (err) {
                    next(err);
                    return;
                }
                context.results = JSON.stringify(rows);
                res.send(context.results);
            })
            break;
        }
        case ('addAnimalWorker'): {
            var context = {};
            query = "INSERT INTO `worker_animal` (`animal_id`, `worker_id`) VALUES (?, ?)";
            values = [req.body.assignAnimal, req.body.assignAnimalWorker];
            // console.log(values);
            mysql.pool.query(query, values, function (err, rows, fields) {
                if (err) {
                    next(err);
                    return;
                }
                context.results = JSON.stringify(rows);
                res.send(context.results);
            })
            break;
        }
        case ('addAnimalFood'): {
            var context = {};
            query = "INSERT INTO `food_animal` (`animal_id`, `food_id`) VALUES (?, ?)";
            values = [req.body.assignAnimalFood, req.body.assignFood];
            // console.log(values);
            mysql.pool.query(query, values, function (err, rows, fields) {
                if (err) {
                    next(err);
                    return;
                }
                context.results = JSON.stringify(rows);
                res.send(context.results);
            })
            break;
        }
    }
});

app.post('/update', function (req, res, next) {
    var query = null;
    var values = [];
    var context = {};
    const updateTable = req.body.searchSelect;
    switch (updateTable) {
        case ('animal'): {
            query = "UPDATE animal SET animal_type = ?, cage_id = ? WHERE animal_id = ?";
            values = [req.body.animalType, req.body.animalCage, req.body.animalId];
            break;
        }
        case ('worker'): {
            query = "UPDATE worker SET first_name = ?, last_name = ?, position = ? WHERE worker_id = ?";
            values = [req.body.workerFirst, req.body.workerLast, req.body.workerPosition, req.body.workerId];
            break;
        }
        case ('food'): {
            query = "UPDATE food SET food_type = ? WHERE food_id = ?";
            values = [req.body.foodType, req.body.foodId];
            break;
        }
        case ('cage'): {
            query = "UPDATE cage SET cage_name = ?, cage_size = ? WHERE cage_id = ?";
            values = [req.body.cageName, req.body.cageSize, req.body.cageId];
            break;
        }
        case ('approvedFoods'): {
            query = "UPDATE food_animal SET food_id = ? WHERE animal_id = ?";
            values = [req.body.foodId, req.body.animalId];
            break;
        }
        case ('workerAnimal'): {
            query = "UPDATE worker_animal SET worker_id = ? WHERE animal_id = ?";
            values = [req.body.workerId, req.body.animalId];
            break;
        }
        case ('workerCage'): {
            query = "UPDATE cage SET worker_id = ? WHERE cage_id = ?";
            values = [req.body.workerId, req.body.cageId];
            break;
        }
    }
    mysql.pool.query(query, values, function (err, rows, fields) {
        if (err) {
            next(err);
            return;
        }
        context.results = JSON.stringify(rows);
        res.send(context.results);
    })
});

app.post('/remove', function (req, res, next) {
  console.log(req.body);
  res.send("/remove called");
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

var server = app.listen(port, () => console.log(`Server started on port ${port}`));
server.timeout = 10000;


