const mysql = require('mysql');
var connection = mysql.createConnection({
  connectionLimit : 10,
  host            : 'remotemysql.com',
  user            : 'C9sXoUQYK8',
  password        : 'lGcQaUzIa4',
  database        : 'C9sXoUQYK8'
});

connection.connect(function(err) {
  if (err) {
    return console.error('error: ' + err.message);
  }
 
  console.log('Connected to the MySQL server.');
});