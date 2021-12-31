const db =require("../models");
const Tutorial = db.tutorials;
const Comment = db.comments;
const Op = db.Sequelize.Op;

//create and save new tutorial
exports.createTutorial = (tutorial) => {
    return Tutorial.create({
        title:  tutorial.title,
        description:  tutorial.description,
    })
    .then((tutorial) => {
        console.log(">>Created tutorial: " + JSON.stringify(tutorial, null, 4));
        return tutorial;
    })
    .catch((err) => {
        console.log(">>Error while creating tutorial: ", err);
    });
};

//create and save new comments
exports.createComment = (tutorialId, comment) => {
    return Comment.create({
        name:  comment.name,
        text:  comment.text,
        tutorialId:  tutorialId,
    })
    .then((comment) => {
        console.log(">>Created comment: " + JSON.stringify(comment, null, 4));
        return comment;
    })
    .catch((err) => {
        console.log(">>Error while creating comment: ", err);
    });
};

//get the comments for a given tutorial
exports.findTutorialById = (tutorialId) => {
    return Tutorial.findByPk(tutorialId, { include: ["comments"] })
    .then((tutorial) => {
        return tutorial;
    })
    .catch((err) => {
        console.log(">>Error while finding tutorial: ", err);
    });
};

//get the comments for a given comment id
exports.findCommentById = (id) => {
    return Comment.findByPk(id, { include: ["tutorial"] })
    .then((comment) => {
        return comment;
    })
    .catch((err) => {
        console.log(">>Error while finding comment: ", err);
    });
};

//get all Tutorials include comments
exports.findAll = () => {
    return Tutorial.findAll({
        include:  ["comments"],
    }).then((tutorials) => {
        return tutorials;
    });
};

//find a single Tutorial with an id
exports.findOne = (req, res) => {

};

//update a tutorial by the id in the request
exports.update = (req, res) => {

};

//delete a tutorial with the specified id in the request
exports.delete = (req, res) => {

};

//delete all tutorials from the database
exports. deleteAll = (req, res) => {

};

//find all published tutorials
exports.findAllPublished = (req, res) => {

};




