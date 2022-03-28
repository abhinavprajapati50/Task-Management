const express = require("express");
const router = require("./Router/router");
const app = express();
const cors = require("cors");
const sequelize = require("./utils/database");
const bodyParser = require("body-parser");
const upload = require("./imageuploader");
const path = require("path");
const { default: helmet } = require("helmet");
const compression = require("compression");
const teamModal = require("./Model/TeamModal");
const taskModal = require("./Model/taskModal");
const projectModal = require("./Model/ProjectModal");
const User = require("./Model/User");

require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "upload/images")));
// app.use('/upload/images', express.static('images'))

router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, Content-Type, Accept",
    "Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE",
    "Access-Control-Allow-Origin",
    "*"
  );

  // console.log("---------------------req.headers", data);
  // console.log("---------------------req.headers", daata);

  next();
});

app.use(router);
app.use(helmet());
app.use(compression());

const PORT = 5000;

sequelize
  .sync()
  .then((result) => {
    app.listen(process.env.PORT || PORT, () => {
      console.log(`the post is listning on ${PORT}`);
    });
    teamModal.hasMany(taskModal, { foreignKey: "Assign_to" }); //team arry have task  related foreign key
    taskModal.belongsTo(teamModal, { foreignKey: "Assign_to" }); //task arry have team related foreign key

    projectModal.hasMany(taskModal, { foreignKey: "project_name" });
    projectModal.hasMany(teamModal, { foreignKey: "ProjectId" });

    // User.hasMany(projectModal, { foreignKey: "userId"})
    projectModal.belongsTo(User, { foreignKey: "userId" });
    teamModal.belongsTo(User, { foreignKey: "userId" });
    taskModal.belongsTo(User, { foreignKey: "userId" });

    // teamModal.hasMany(taskModal , { foreignKey: "Assign_to" });
    // taskModal.belongsToMany(teamModal , { foreignKey: "Assign_to" });

    taskModal.addScope("checkStatus", {
      where: {
        status: 1,
        chr_delete: 0,
      },
    });
    // taskModal.addScope("projectTaskCompleted", {
    //   where: {
    //     status: 0,
    //     chr_delete:0
    //   }
    // });
  })
  .catch((err) => {
    console.log("-----err appjs sequlize", err);
  });
