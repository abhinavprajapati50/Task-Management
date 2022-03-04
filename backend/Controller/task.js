const taskModal = require("../Model/TaskModal");

exports.task = async (req, res, next) => {
  //   const { title, slug, description, chr_delete } = req.body;
  const {
    task,
    teamId,
    description,
    dueDate,
    status,
    Assign_to,
    completed,
    chr_delete,
  } = req.body;
  if (
    !task ||
    !teamId ||
    !description ||
    !dueDate ||
    !status ||
    !Assign_to ||
    !completed
  ) {
    return res
      .status(400)
      .json({ status: false, message: "All field required" });
  }
  try {
    const result_Task = await taskModal.create({
      task,
      teamId,
      description,
      dueDate,
      status,
      Assign_to,
      completed,
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
