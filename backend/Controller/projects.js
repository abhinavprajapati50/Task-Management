const  jwt_decode  = require("jwt-decode");
const { Op } = require("sequelize/dist");
const projectModal = require("../Model/ProjectModal");
const taskModal = require("../Model/taskModal");
const User = require("../Model/User");

exports.projects = async (req, res, next) => {
  const { project, description, dueDate, status, chr_delete } = req.body;
  let data = req.headers.authorization ;
      const tokens = jwt_decode(data);
  
  if (!project || !description || !dueDate) {
    return res
      .status(200)
      .json({ status: false, message: "All field required" });
  }
  try {
    const result_Task = await projectModal.create({
      project,
      description,
      dueDate,
      status,
      chr_delete,
      userId:tokens.id,
    });
    // --
    let resMessage = "Project Created Successfully.";

    res.status(200).json({
      status: true,
      message: resMessage,
      data: result_Task,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Project is not Created !!",
      data: error.message,
    });
  }
};

exports.AllProjects = async (req, res, next) => {
  const {userId} = req.body;
  try {
    // let token = req.headers["x-access-token"];
    // let token = req.body.token || req.query.token || req.headers["x-access-token"];
    // let data = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTA1LCJlbWFpbCI6Im5pcmFqQGdtYWlsLmNvbSIsInJvbGUiOjEsImlhdCI6MTY0ODQ0NTEzMiwiZXhwIjoxNjQ4NDQ1MTM1fQ.H6XUjl_TZRErmSQXkt6X71uKnEBPUGIxMSclgpWZI8c";
    let data = req.headers.authorization;
    console.log("--------------------------=", data);
    
// res.header(data)
    const tokens = jwt_decode(data);
    const tokenId = tokens.id
    const all_Projects = await projectModal.findAll({
      order: [["id", "DESC"]],
      include: taskModal,
      include: User,
      // //   attributes:['id' ]
      where: {
        status: 0, chr_delete:0  ,userId: tokenId 
          // [Op.not]: null
        
       },
    });
    // --
    let resMessage = "All Projects rendered successfully.";

    res.status(200).json({
      status: true,
      message: resMessage,
      data: all_Projects,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Project is not redered!!!",
      data: error || error.message,
    });
  }
};

exports.updateProject = async (req, res) => {
  const { project, description, dueDate, status } = req.body;
  try {
    const updatedTask = await projectModal.update(
      { project, description, dueDate, status },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    if (updatedTask == true);
    {
      res.status(200).json({
        status: true,
        message: " task successfully updated",
        data: { updatedTask },
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      message: " Error in delete api",
      data: error.message || error,
    });
  }
};
