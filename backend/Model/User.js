const Sequelize = require("sequelize");
const sequelizeDB = require("../utils/database");

const User = sequelizeDB.define("signUpUser", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: true,
    validate: {
      isEmail: {
        msg: "Email address must be valid",
      },
      isLowercase: true,
    },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: true,
  },

  role: {
    type: Sequelize.INTEGER,
  },
});

module.exports = User;
