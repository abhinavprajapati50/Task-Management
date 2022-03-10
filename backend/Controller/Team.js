const teamModal = require("../Model/TeamModal");

exports.team = async (req, res, next) => {
  //   const { title, slug, description, chr_delete } = req.body;
  const { name, gender, work } = req.body;
  if (!name || !gender || !work) {
    return res
      .status(200)
      .json({ status: false, message: "All field required" });
  }
  try {
    const result_Team = await teamModal.create({
      name,
      gender,
      work,
    });
    // --
    let resMessage = "Team Created Successfully.";

    res.status(200).json({
      status: true,
      message: resMessage,
      data: result_Team,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Team is not Created",
      data: error || error.message,
    });
  }
};
exports.Allteam = async (req, res, next) => {
  //   const { title, slug, description, chr_delete } = req.body;
  try {
    const result_Team = await teamModal.findAll({
      order: [
        ['createdAt', 'DESC'],
    ],
    });
    // --
    let resMessage = "All Teams are redered  Successfully .";

    res.status(200).json({
      status: true,
      message: resMessage,
      data: result_Team,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Team is not redered!!!!!",
      data: error || error.message,
    });
  }
};

// singleTeamUser


exports.singleTeamUser = async (req, res) => {
  const { name, gender, work } = req.body;

  let id = req.params.id;

  try {
    const product = await teamModal.findOne(
      
        {where: {
          id: id,
        }}
    );
    console.log(product);
    res
      .status(200)
      .json({
        status: true,
        message: " successfully get team member ",
        data: product
      });
  } catch (error) {
    res
      .status(500)
      .json({ status: false, message: error || error.message, data: error });
      // .json({ status: false, message: " Error in delete api", data: error });
  }
};

// // completedTask

// exports.completedTask = async (req, res, next) => {
//   try {
//     let id = req.params.id;
//     const comhpletedTask = await teamModal.update(
//       { status: "1" },
//       { where: { id: id } }
//     );

//     res.status(200).json({
//       status: true,
//       message: "Task Completed successfully",
//       data: comhpletedTask,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       status: false,
//       message: "Somethings wents wrong",
//       data: error || error.message,
//     });
//   }
// };

// exports.RejectedTask = async (req, res) => {
//   try {
//     let id = req.params.id;

//     const rejectedTask = await teamModal.update(
//       {
//         status: "2",
//       },
//       { where: { id: id } }
//     );
//     let resMessage = "Task Successfully Rejected.";

//     res.status(200).json({
//       status: true,
//       message: resMessage,
//       data: rejectedTask,
//     });
//   } catch (error) {
//     console.log("error", error);
//     res.status(500).json({
//       status: false,
//       message: " Somethings wents wrong",
//       data: error || error.message,
//     });
//   }
// };
