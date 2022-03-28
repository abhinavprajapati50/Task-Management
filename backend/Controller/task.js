const  jwt_decode  = require("jwt-decode");
const taskModal = require("../Model/taskModal");
const teamModal = require("../Model/TeamModal");
const User = require("../Model/User");

exports.task = async (req, res, next) => {
  const { task, description, dueDate, Assign_to, status, chr_delete, project_name } =
    req.body;
  if (!task || !description || !dueDate) {
    return res
      .status(200)
      .json({ status: false, message: "All field required" });
  }
  let data = req.headers.authorization;
  // let data = req.headers.authorization;
  console.log("--------------*************", data);
  let tokens = jwt_decode(data);
  // const tokens = jwt_decode(data);

  // console.log(tokens);
  let tokenId = tokens.id;
  try {

    const result_Task = await taskModal.create({
      task,
      description,
      dueDate,
      Assign_to,
      // status,
      chr_delete,
      project_name,
      userId:tokenId
    });
    let resMessage = "Task Created Successfully.";
    console.log("============",result_Task);
    // if (result_menu) {
    //   try {
    //     const slugUpdateStatus = await navbarMenu.update(
    //       { page_slug: req.body.slug },
    //       { where: { id: req.body.parentMenu } }
    //     );

    //     console.log(req.body.slug);
    //     console.log(req.body.parentMenu);
    //     if (!slugUpdateStatus) {
    //       resMessage = "There is some technical issue while updating page.";
    //     }
    //   } catch (err) {
    //     resMessage = "Menu not updated.";
    //   }
    // }

    //for select parent service
    // if (result_menu) {
    //   try {
    //     const slugUpdateStatus = await Manage_Service.update(
    //       { page_slug: req.body.slug },
    //       { where: { id: req.body.parentService } }
    //     );

    //     console.log("req.body.slug ---->>>", req.body.slug);
    //     if (!slugUpdateStatus) {
    //       resMessage = "There is some technical issue while updating page.";
    //     }
    //   } catch (err) {
    //     resMessage = "Menu not updated.";
    //   }
    // }

    // --
    res.status(200).json({
      status: true,
      message: resMessage,
      data: result_Task,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Task is not Created",
      data: error.message,
    });
  }
};
exports.AllTask = async (req, res, next) => {
  try {
    let data = req.headers.authorization;

    // console.log("---------------------req.headers", data);
    const tokens = jwt_decode(data);
    const tokenId = tokens.id;
    // console.log("))))))))))))))))))localhost00", tokens);
    
    const result_Task = await taskModal.findAll({
      order: [["id", "DESC"]],
      include: teamModal,
      include:User,
      // //   attributes:['id' ]
      where: { userId: tokenId },
    });
    // --
    let resMessage = "All Task rendered successfully.";

    res.status(200).json({
      status: true,
      message: resMessage,
      data: result_Task,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Tasks is not redered!!!",
      data: error || error.message,
    });
  }
};

// updateTask

exports.updateTask = async (req, res) => {
  // console.log("-------------=-=-=>>>>>>>>>>", req.body);
  const { task, description, dueDate, Assign_to, status } = req.body;

  // let id = req.params.id;
  // console.log("page LENGTH++++++", req.body);

  try {
    const updatedTask = await taskModal.update(
      { task, description, dueDate, Assign_to, status },
      {
        where: {
          id: req.params.id,
        },

      }
    );
    // console.log(updatedTask);
    res.status(200).json({
      status: true,
      message: " task successfully updated",
      data: {updatedTask,task},
    });
  } catch (error) {
    res
      .status(500)
      .json({
        status: false,
        message: " Error in delete api",
        data: error.message || error,
      });
  }
};
exports.getUpdatedTask = async (req, res) => {
  // let id = req.params.id;

  try {
    const updatedTask = await taskModal.findOne({
      where: {
        id: req.params.id,
      },
    });
    // console.log(updatedTask);
    res.status(200).json({
      status: true,
      message: "Get task successfully updated",
      data: updatedTask,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        status: false,
        message: " Error in update api",
        data: error.message || error,
      });
  }
};

// completedTask

exports.completedTask = async (req, res, next) => {
  // const { status } = req.body;

  try {
    let id = req.params.id;
    const comhpletedTask = await taskModal.update(
      { status: 1 },
      // { status: "1" },
      { where: { id: id } }
    );
    res.status(200).json({
      status: true,
      message: "Task Completed successfully",
      data: comhpletedTask,
    });
  } catch (error) {
    console.log(error.message || error);
    res.status(500).json({
      status: false,
      message: "Somethings wents wrong",
      data: error || error.message,
    });
  }
};

exports.deletedTask = async (req, res) => {
  try {
    let id = req.params.id;

    const deletedTask = await taskModal.update(
      {
        chr_delete: "1",
      },
      { where: { id: id } }
    );
    let resMessage = "Task Successfully Deleted.";

    res.status(200).json({
      status: true,
      message: resMessage,
      data: deletedTask,
    });
  } catch (error) {
    console.log("error", error.message || error);
    res.status(500).json({
      status: false,
      message: " Somethings wents wrong",
      data: error || error.message,
    });
  }
};
