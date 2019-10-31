var express = require('express');
var mysql = require('./dbcon.js');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/client/build')));

const port = process.env.PORT || 5000;

app.post('/view', function (req, res, next) {
    var query = null;
    switch (req.body.viewSelect) {
        case ('approvedFoods'):
            {
                break;
            }
        case ('workerAnimal'):
            {
                break;
            }
        case ('workerCage'):
            {
                break;
            }
        default:
            {
                query = "SELECT * FROM " + req.body.viewSelect;
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