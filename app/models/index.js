const config = require("../config/db.config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host:  config.HOST,
        dialect:  config.dialect,
        operatorsAliases:  false,

        pool:  {
            max:  config.pool.max,
            min:  config.pool.min,
            acquire:  config.pool.acquire,
            idle:  config.pool.idle
        }
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model")(sequelize, Sequelize);
db.role = require("../models/role.model")(sequelize, Sequelize);
db.tutorials = require("../models/tutorial.model")(sequelize, Sequelize);
db.comments = require("../models/comment.model")(sequelize, Sequelize);

db.role.belongsToMany(db.user, { //many-to-many relationship with user:  one user can have several roles/one role can be used by many users
    through:  "user_roles",//new table user_roles as the connection between users and roles tables via their primary keys as foreign keys
    foreignKey:  "roleId",
    otherKey:   "userId"
});

db.user.belongsToMany(db.role, {
    through:  "user_roles",
    foreignKey:  "userId",
    otherKey:  "roleId"
});

db.tutorials.hasMany(db.comments, { as:  "comments" });
db.comments.belongsTo(db.tutorials, {
    foreignKey:  "tutorialId",
    as:  "tutorial"
});

db.ROLES = ["user", "moderator", "admin"];

module.exports = db;


