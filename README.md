# NodeAssignament
clone the Repository
Open in visual studio code
open integrated terminal 
Run npm install command
change the mysql username and password in config/default.json 
{
    "port": 3001,
    "database": {
      "mysql": {
        "host": "localhost",
        "username": "user", /* change to your username */
        "password": "123", /* change to your password */
        "dbName": "ShoppingCart" /* database name */
      }
    }
}
Import the database, use the sql file in DB folder
type npm run serve to start the server 

use postman for testing the api find the collection from the folder postmanCollection
Then other process can execute.
