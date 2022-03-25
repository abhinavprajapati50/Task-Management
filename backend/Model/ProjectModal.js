const Sequelize = require("sequelize");
const sequelizeDb = require("../utils/database");

const projectModal = sequelizeDb.define("projects", {
  project: {
    type: Sequelize.STRING,
  },
 
  description: {
    type: Sequelize.STRING,
  },
  dueDate: {
    type: Sequelize.DATE,
  },
  userId: {
    type: Sequelize.INTEGER,
    defaultValue: null
  },
  status: {
    type: Sequelize.ENUM,
    values: ['pending', 'completed', 'rejected']
  },
  chr_delete: {
    type: Sequelize.TINYINT,
  },
}
);

module.exports = projectModal;
