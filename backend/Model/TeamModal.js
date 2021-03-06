const Sequelize = require("sequelize");
const sequelizeDb = require("../utils/database");



const teamModal = sequelizeDb.define("team", {
  name: {
    type: Sequelize.STRING,
  },

  gender: {
    type: Sequelize.STRING,
  },
  work: {
    type: Sequelize.STRING,
  },
  userId: {
    type: Sequelize.INTEGER,
  },
  projectId: {
    type: Sequelize.INTEGER,
  },
});

module.exports = teamModal;
