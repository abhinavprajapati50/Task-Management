const Sequelize = require("sequelize");
const sequelizeDb = require("../utils/database");

const taskModal = sequelizeDb.define("task", {
  task: {
    type: Sequelize.STRING,
  },
 
  description: {
    type: Sequelize.STRING,
  },
  dueDate: {
    type: Sequelize.DATE,
  },
  Assign_to: {
    type: Sequelize.STRING,
  },
  status: {
    type: Sequelize.BOOLEAN,
  },
  chr_delete: {
    type: Sequelize.TINYINT,
  },
});

module.exports = taskModal;
