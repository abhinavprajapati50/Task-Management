const Sequelize = require("sequelize/dist");

const sequelize = new Sequelize(
  "Task_Manager",
  "root",
  "admin@123",
  {
    dialect: "mysql",
    host: "localhost",
  },
  { logging: false }
);

module.exports = sequelize;

// const mysql = require('mysql2');

// const pool = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: "admin@123",
//     database: 'login'
// })

// module.exports = pool.promise();
