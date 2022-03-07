const taskModal = require("../Model/taskModal");

exports.task = async (req, res, next) => {
  const { task, description, dueDate, Assign_to, status, chr_delete } =
    req.body;
  if (
    !task ||
    !description ||
    !dueDate ||
    !Assign_to
  ) {
    return res
      .status(200)
      .json({ status: false, message: "All field required" });
  }
  try {
    const result_Task = await taskModal.create({
      task,
      description,
      dueDate,
      Assign_to,
      status,
      chr_delete,
    });
    // --
    let resMessage = "Task Created Successfully.";
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
      data: error || error.message,
    });
  }
};
exports.AllTask = async (req, res, next) => {
  try {
    const result_Task = await taskModal.findAll();
    // --
    console.log(result_Task);
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
