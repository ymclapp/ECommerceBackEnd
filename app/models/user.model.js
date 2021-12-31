module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        username:  {
            type:  Sequelize.STRING
        },
        email:  {
            type:  Sequelize.STRING
        },
        password:  {
            type:  Sequelize.STRING
        },
        first_name:  {
            type:  Sequelize.STRING
        },
        last_name:  {
            type:  Sequelize.STRING
        }
    });

    return User;
};