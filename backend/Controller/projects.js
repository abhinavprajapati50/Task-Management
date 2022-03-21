const projectModal = require("../Model/ProjectModal");

exports.projects = async (req, res, next) => {
  const { project, description, dueDate, status, chr_delete} = req.body;
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
  try {
    const all_Projects = await projectModal.findAll({
      order: [["id", "DESC"]],
      // include: teamModal,
      // //   attributes:['id' ]
      where: { status: 0, chr_delete: 0 },
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
      message: "Tasks is not redered!!!",
      data: error || error.message,
    });
  }
};

exports.updateProject = async (req, res) => {
  const { project, description, dueDate, status } = req.body;
  console.log("-------------=-=-=>>>>>>>>>>", req.body);
  console.log("page LENGTH++++++", req.body);
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
