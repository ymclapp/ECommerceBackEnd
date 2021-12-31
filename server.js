'use strict';

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin:  "http://localhost:8081"
};

app.use(cors(corsOptions));

const db = require("./app/models");
const Role = db.role;

//db.sequelize.sync({force:  true}).then(() => {//in production create three rows manually and use sync() without parameters to avoid dropping data
//    console.log('Drop and Resync Db');
//    initial();
//});

db.sequelize.sync();

//parse requests of content-type - application/json
app.use(bodyParser.json());

//parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended:  true }));


//ROUTES
//simple route
app.get("/", (req, res) => {
    res.json({ message:  "Welcome to the ecommerce application.  Shall we play a game?"});
});

require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

//set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}.`);
})

function initial() {  //do not do this in production.  Just manually add the three rows
    Role.create({
        id:  1,
        name:  "user"
    });

    Role.create({
        id:  2,
        name:  "moderator"
    });

    Role.create({
        id:  3,
        name:  "admin"
    });
}



