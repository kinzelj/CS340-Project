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
    "animal.animal_id": "'ANIMAL ID'", 
    "animal.animal_type": "'ANIMAL TYPE'", 

    "worker.worker_id": "'WORKER ID'",
    "worker.first_name": "'FIRST NAME'",
    "worker.last_name": "'LAST NAME'",
    "worker.position": "'POSITION'",

    "cage.cage_id": "'CAGE NUMBER'",
    "cage.cage_name": "'CAGE NAME'",
    "cage.cage_size": "'SQ FT'",

    "food.food_id": "'FOOD ID'",
    "food.food_type": "'FOOD TYPE'",

    "id": "'ENTRY ID'"
}

function getTagKey(value) {
    return Object.keys(attributeTag).find(key => attributeTag[key] === value);
}

const queryText = {
    selectAnimals: "SELECT animal.animal_id AS "+attributeTag["animal.animal_id"] +
        ", animal.animal_type AS "+ attributeTag["animal.animal_type"] +
        ", animal.cage_id AS " + attributeTag["cage.cage_id"] +
        ", cage.cage_name AS " + attributeTag["cage.cage_name"] + 
        " FROM animal INNER JOIN cage ON animal.cage_id=cage.cage_id",

    selectWorkers: "SELECT worker_id AS " + attributeTag["worker.worker_id"] + 
        ", first_name AS " + attributeTag["worker.first_name"] + 
        ", last_name AS " + attributeTag["worker.last_name"] + 
        ", position AS " + attributeTag["worker.position"] + " FROM worker",

    selectCages: "SELECT cage_id AS " + attributeTag["cage.cage_id"] + 
        ", cage_name AS " + attributeTag["cage.cage_name"] + 
        ", cage_size AS " + attributeTag["cage.cage_size"] + " FROM cage",

    selectFood: "SELECT food_id AS " + attributeTag["food.food_id"] + 
        ", food_type AS " + attributeTag["food.food_type"] + " FROM food",

    selectApprovedFoods:
        "SELECT food_animal.id AS " + attributeTag["id"] + 
        ", animal.animal_id AS " + attributeTag["animal.animal_id"] + 
        ", animal.animal_type AS " + attributeTag["animal.animal_type"] + 
        ", food.food_type AS " + attributeTag["food.food_type"] + " FROM animal " +
        "INNER JOIN food_animal ON animal.animal_id=food_animal.animal_id " +
        "INNER JOIN food ON food_animal.food_id=food.food_id",

    selectWorkerAnimals:
        "SELECT worker_animal.id AS " + attributeTag["id"] + 
        ", animal.animal_id AS " + attributeTag["animal.animal_id"] + 
        ", animal.animal_type AS " + attributeTag["animal.animal_type"] + 
        ", worker.worker_ID AS 'ASSIGNED WORKER ID', " +
        "worker.first_name AS 'WORKER FIRST NAME', worker.last_name AS 'WORKER LAST NAME' FROM animal " +
        "INNER JOIN worker_animal ON animal.animal_id=worker_animal.animal_id " +
        "INNER JOIN worker ON worker_animal.worker_id=worker.worker_id",

    selectWorkerCages:
        "SELECT cage.cage_id AS " + attributeTag["cage.cage_id"] + 
        ", cage.cage_name AS " + attributeTag["cage.cage_name"]+ 
        ", worker.worker_ID AS 'ASSIGNED WORKER ID', worker.first_name AS 'WORKER FIRST NAME'" + 
        ", worker.last_name AS 'WORKER LAST NAME' FROM cage " +
        "INNER JOIN worker ON cage.worker_id=worker.worker_id",
}



app.post('/view', function (req, res, next) {
    var query = null;
    switch (req.body.query) {
        case ('animal'):
            {
                query = queryText.selectAnimals;
                break;
            }
        case ('worker'):
            {
                query = queryText.selectWorkers;
                break;
            }
        case ('cage'):
            {
                query = queryText.selectCages;
                break;
            }
        case ('food'):
            {
                query = queryText.selectFood;
                break;
            }
        case ('approvedFoods'):
            {
                query = queryText.selectApprovedFoods + " ORDER BY food_animal.id";
                break;
            }
        case ('workerAnimal'):
            {
                query = queryText.selectWorkerAnimals + " ORDER BY worker_animal.id";
                break;
            }
        case ('workerCage'):
            {
                query = queryText.selectWorkerCages + " ORDER BY cage.cage_id";
                break;
            }
    }
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
    const searchValue = "'" + req.body.searchValue + "'";
    switch(searchCriteria) {
        case("ASSIGNED WORKER ID"): {
            searchCriteria = "workder_id";
            break;
        }
        case("WORKER FIRST NAME"): {
            searchCriteria = "first_name";
            break;
        }
        case("ASSIGNED LAST NAME"): {
            searchCriteria = "last_name";
            break;
        }
        default: {
            searchCriteria = getTagKey("'" + searchCriteria + "'");
        }
    }

    var query = null;
    switch (searchTable) {
        case ('animal'):
            {
                query = queryText.selectAnimals + " WHERE " + searchCriteria + "=" + searchValue;
                break;
            }
        case ('worker'):
            {
                query = queryText.selectWorkers + " WHERE " + searchCriteria + "=" + searchValue;
                break;
            }
        case ('cage'):
            {
                query = queryText.selectCages + " WHERE " + searchCriteria + "=" + searchValue;
                break;
            }
        case ('food'):
            {
                query = queryText.selectFood + " WHERE " + searchCriteria + "=" + searchValue;
                break;
            }
        case ('approvedFoods'):
            {
                query = queryText.selectApprovedFoods + " WHERE " + 
                searchCriteria + "=" + searchValue + " ORDER BY food_animal.id";
                break;
            }
        case ('workerAnimal'):
            {
                query = queryText.selectWorkerAnimals + " WHERE " + 
                searchCriteria + "=" + searchValue + " ORDER BY worker_animal.id";
                break;
            }
        case ('workerCage'):
            {
                query = queryText.selectWorkerCages + " WHERE " + 
                searchCriteria + "=" + searchValue + " ORDER BY cage.cage_id";
                break;
            }
    }
    if (query) {
        var context = {};
        mysql.pool.query(query, function (err, rows, fields) {
            context.results = JSON.stringify(rows);
            res.send(context.results);
        })
    };
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

var server = app.listen(port, () => console.log(`Server started on port ${port}`));
server.timeout = 10000;
