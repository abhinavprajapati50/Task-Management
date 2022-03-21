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
    type: Sequelize.INTEGER,
    defaultValue: null
  },
  project_name: {
    type: Sequelize.INTEGER,
    defaultValue: null
  },
  status: {
    type: Sequelize.ENUM,
    // type: Sequelize.ENUM('Pending', 'Completed', 'Rejected')
    values: ['pending', 'completed', 'rejected']
    // values: ['Pending', 'Completed', 'Rejected']
    // type: Sequelize.Sequelize.ENUM("Pending", "Completed", "Rejected"),
  },
  chr_delete: {
    type: Sequelize.TINYINT,
  },
}
);

module.exports = taskModal;
