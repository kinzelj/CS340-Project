var express = require('express');
var mysql = require('./dbcon.js');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/client/build')));

const port = process.env.PORT || 5000;

const queryText = {
    selectAnimals: "SELECT animal_id AS 'ID', animal_type AS 'ANIMAL TYPE', cage_id AS 'CAGE NUMBER' FROM animal",
    selectWorkers: "SELECT worker_id AS 'ID', first_name AS 'FIRST NAME', last_name AS 'LAST NAME', position AS 'POSITION' FROM worker",
    selectCages: "SELECT cage_id AS 'ID', cage_name AS 'CAGE NAME', cage_size AS 'SQ FT' FROM cage",
    selectFood: "SELECT food_id AS 'ID', food_type AS 'FOOD TYPE' FROM food",
    selectApprovedFoods: 
        "SELECT animal.animal_id AS 'ANIMAL ID', animal.animal_type AS 'ANIMAL TYPE', food.food_type AS 'APPROVED FOOD' FROM animal " +
        "INNER JOIN food_animal ON animal.animal_id=food_animal.animal_id " +
        "INNER JOIN food ON food_animal.food_id=food.food_id " +
        "ORDER BY animal.animal_id",
    selectWorkerAnimals: 
        "SELECT animal.animal_id AS 'ANIMAL ID', animal.animal_type AS 'ANIMAL TYPE', worker.worker_ID AS 'ASSIGNED WORKER ID', " +
        "worker.first_name AS 'WORKER FIRST NAME', worker.last_name AS 'WORKER LAST NAME' FROM animal " +
        "INNER JOIN worker_animal ON animal.animal_id=worker_animal.animal_id " +
        "INNER JOIN worker ON worker_animal.worker_id=worker.worker_id " +
        "ORDER BY animal.animal_id",
    selectWorkerCages: 
        "SELECT cage.cage_id AS 'CAGE ID', cage.cage_name AS 'CAGE NAME', " +
        "worker.worker_ID AS 'ASSIGNED WORKER ID', worker.first_name AS 'WORKER FIRST NAME', worker.last_name AS 'WORKER LAST NAME' FROM cage " +
        "INNER JOIN worker ON cage.worker_id=worker.worker_id " +
        "ORDER BY cage.cage_id"
}

app.post('/view', function(req, res, next) {
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
                query = queryText.selectApprovedFoods;
                break;
            }
        case ('workerAnimal'):
            {
                query = queryText.selectWorkerAnimals;
                break;
            }
        case ('workerCage'):
            {
                query = queryText.selectWorkerCages;
                break;
            }
    }
    if (query) {
        var context = {};
        mysql.pool.query(query, function(err, rows, fields) {
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
