'use strict';

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

const db = require("./app/models");
const Role = db.role;
const controller = require("./app/controllers/tutorial.controller");

const run = async () => {
    //For testing
    //create tutorials
    const tut1 = await controller.createTutorial({
        title: "Tut#1",
        description: "Tut#1 Description",
    });
    /*
    >> Created tutorial: {
        "id": 1,
        "title": "Tut#1",
        "description": "Tut#1 Description",     
        "updatedAt": "2020-04-14T09:49:14.021Z",
        "createdAt": "2020-04-14T09:49:14.021Z" 
    }
    */

    const tut2 = await controller.createTutorial({
        title: "Tut#2",
        description: "Tut#2 Description",
    });
    /*
    >> Created tutorial: {
        "id": 2,
        "title": "Tut#2",
        "description": "Tut#2 Description",
        "updatedAt": "2020-04-14T09:49:14.052Z",
        "createdAt": "2020-04-14T09:49:14.052Z"
    }
    */

    //create comments
    const comment1 = await controller.createComment(tut1.id, {
        name: "bezkoder",
        text: "Good job!",
    });
    /*
    >> Created comment: {
        "id": 1,
        "name": "bezkoder",
        "text": "Good job!",
        "tutorialId": 1,
        "updatedAt": "2020-04-14T09:49:14.071Z",
        "createdAt": "2020-04-14T09:49:14.071Z"
    }
    */

    await controller.createComment(tut1.id, {
        name: "zkoder",
        text: "One of the best tuts!",
    });
    /*
    >> Created comment: {
        "id": 2,
        "name": "zkoder",
        "text": "One of the best tuts!",
        "tutorialId": 1,
        "updatedAt": "2020-04-14T09:49:14.081Z",
        "createdAt": "2020-04-14T09:49:14.081Z"
    }
    */

    const comment2 = await controller.createComment(tut2.id, {
        name: "aKoder",
        text: "Hi, thank you!",
    });
    /*
    >> Created comment: {
        "id": 3,
        "name": "aKoder",
        "text": "Hi, thank you!",
        "tutorialId": 2,
        "updatedAt": "2020-04-14T09:49:14.855Z",
        "createdAt": "2020-04-14T09:49:14.855Z"
    }
    */

    await controller.createComment(tut2.id, {
        name: "anotherKoder",
        text: "Awesome tut!",
    });
    /*
    >> Created comment: {
        "id": 4,
        "name": "anotherKoder",
        "text": "Awesome tut!",
        "tutorialId": 2,
        "updatedAt": "2020-04-14T09:49:15.478Z",
        "createdAt": "2020-04-14T09:49:15.478Z"
    }
    */

    //get tutorial by given id
    const tut1Data = await controller.findTutorialById(tut1.id);
    console.log(
        ">> Tutorial id=" + tut1Data.id,
        JSON.stringify(tut1Data, null, 2)
    );
    /*
    >> Tutorial id=1 {
      "id": 1,
      "title": "Tut#1",
      "description": "Tut#1 Description",
      "createdAt": "2020-04-14T09:49:14.000Z",
      "updatedAt": "2020-04-14T09:49:14.000Z",
      "comments": [
        {
          "id": 1,
          "name": "bezkoder",
          "text": "Good job!",
          "createdAt": "2020-04-14T09:49:14.000Z",
          "updatedAt": "2020-04-14T09:49:14.000Z",
          "tutorialId": 1
        },
        {
          "id": 2,
          "name": "zkoder",
          "text": "One of the best tuts!",
          "createdAt": "2020-04-14T09:49:14.000Z",
          "updatedAt": "2020-04-14T09:49:14.000Z",
          "tutorialId": 1
        }
      ]
    }
    */

    const tut2Data = await controller.findTutorialById(tut2.id);
    console.log(
        ">> Tutorial id=" + tut2Data.id,
        JSON.stringify(tut2Data, null, 2)
    );
    /*
    >> Tutorial id=2 {
      "id": 2,
      "title": "Tut#2",
      "description": "Tut#2 Description",
      "createdAt": "2020-04-14T09:49:14.000Z",
      "updatedAt": "2020-04-14T09:49:14.000Z",
      "comments": [
        {
          "id": 3,
          "name": "aKoder",
          "text": "Hi, thank you!",
          "createdAt": "2020-04-14T09:49:14.000Z",
          "updatedAt": "2020-04-14T09:49:14.000Z",
          "tutorialId": 2
        },
        {
          "id": 4,
          "name": "anotherKoder",
          "text": "Awesome tut!",
          "createdAt": "2020-04-14T09:49:15.000Z",
          "updatedAt": "2020-04-14T09:49:15.000Z",
          "tutorialId": 2
        }
      ]
    }
    */

    //get comment by given id
    const comment1Data = await controller.findCommentById(comment1.id);
    console.log(
        ">> Comment id=" + comment1.id,
        JSON.stringify(comment1Data, null, 2)
    );
    /*
    >> Comment id=1 {
      "id": 1,
      "name": "bezkoder",
      "text": "Good job!",
      "createdAt": "2020-04-14T09:49:14.000Z",
      "updatedAt": "2020-04-14T09:49:14.000Z",
      "tutorialId": 1,
      "tutorial": {
        "id": 1,
        "title": "Tut#1",
        "description": "Tut#1 Description",
        "createdAt": "2020-04-14T09:49:14.000Z",
        "updatedAt": "2020-04-14T09:49:14.000Z"
      }
    }
    */

    const comment2Data = await controller.findCommentById(comment2.id);
    console.log(
        ">> Comment id=" + comment2.id,
        JSON.stringify(comment2Data, null, 2)
    );
    /*
    >> Comment id=3 {
      "id": 3,
      "name": "aKoder",
      "text": "Hi, thank you!",
      "createdAt": "2020-04-14T09:49:14.000Z",
      "updatedAt": "2020-04-14T09:49:14.000Z",
      "tutorialId": 2,
      "tutorial": {
        "id": 2,
        "title": "Tut#2",
        "description": "Tut#2 Description",
        "createdAt": "2020-04-14T09:49:14.000Z",
        "updatedAt": "2020-04-14T09:49:14.000Z"
      }
    }
    */

    //get all tutorials
    const tutorials = await controller.findAll();
    console.log(">> All tutorials", JSON.stringify(tutorials, null, 2));
    /*
    >> All tutorials [
      {
        "id": 1,
        "title": "Tut#1",
        "description": "Tut#1 Description",
        "createdAt": "2020-04-14T09:49:14.000Z",
        "updatedAt": "2020-04-14T09:49:14.000Z",
        "comments": [
          {
            "id": 1,
            "name": "bezkoder",
            "text": "Good job!",
            "createdAt": "2020-04-14T09:49:14.000Z",
            "updatedAt": "2020-04-14T09:49:14.000Z",
            "tutorialId": 1
          },
          {
            "id": 2,
            "name": "zkoder",
            "text": "One of the best tuts!",
            "createdAt": "2020-04-14T09:49:14.000Z",
            "updatedAt": "2020-04-14T09:49:14.000Z",
            "tutorialId": 1
          }
        ]
      },
      {
        "id": 2,
        "title": "Tut#2",
        "description": "Tut#2 Description",
        "createdAt": "2020-04-14T09:49:14.000Z",
        "updatedAt": "2020-04-14T09:49:14.000Z",
        "comments": [
          {
            "id": 3,
            "name": "aKoder",
            "text": "Hi, thank you!",
            "createdAt": "2020-04-14T09:49:14.000Z",
            "updatedAt": "2020-04-14T09:49:14.000Z",
            "tutorialId": 2
          },
          {
            "id": 4,
            "name": "anotherKoder",
            "text": "Awesome tut!",
            "createdAt": "2020-04-14T09:49:15.000Z",
            "updatedAt": "2020-04-14T09:49:15.000Z",
            "tutorialId": 2
          }
        ]
      }
    ]
    */


};

//db.sequelize.sync({force:  true}).then(() => {//in production create three rows manually and use sync() without parameters to avoid dropping data
//    console.log('Drop and Resync Db');
//    initial();
//    run();
//});

db.sequelize.sync();

//parse requests of content-type - application/json
app.use(bodyParser.json());

//parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


//ROUTES
//simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to the ecommerce application.  Shall we play a game?" });
});

require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/tutorial.routes")(app);

//set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}.`);
})

function initial() {  //do not do this in production.  Just manually add the three rows
    Role.create({
        id: 1,
        name: "user"
    });

    Role.create({
        id: 2,
        name: "moderator"
    });

    Role.create({
        id: 3,
        name: "admin"
    });
}



