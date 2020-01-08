To deploy development environment:

In project directory create dbcon.js file with the following code and update with users MYSQL database info:
```
var mysql = require('mysql');                         
var pool = mysql.createPool({                         
  connectionLimit : 10,                               
  host            : 'host url',
  user            : 'mysql user name',                  
  password        : 'mysql password',                           
  database        : 'mysql database name'                   
});                                                   
                                                      
module.exports.pool = pool;  
```

In command terminal:
1. `git clone https://github.com/kinzelj/CS340-Project.git`
2. `cd CS340-Project/`
3. `npm install`
4. `cd client/`
5. `npm install`
6. `cd ..`
7. `npm run dev`