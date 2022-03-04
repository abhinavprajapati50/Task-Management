const Sequelize = require("sequelize");
const sequelizeDb = require("../utils/database");

const taskModal = sequelizeDb.define("task", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  task: {
    type: Sequelize.STRING,
  },
  teamId: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  description: {
    type: Sequelize.STRING,
  },
  dueDate: {
    type: Sequelize.DATE,
  },
  status: {
    type: Sequelize.STRING,
  },
  Assign_to: {
    type: Sequelize.STRING,
  },
  completed: {
    type: Sequelize.BOOLEAN,
  },
  chr_delete: {
    type: Sequelize.TINYINT,
  },
});

module.exports = taskModal;
