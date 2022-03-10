const taskModal = require("../Model/taskModal");
const teamModal = require("../Model/TeamModal");

exports.joinTeamTask = async (req, res, next) => {
  //   const { title, slug, description, chr_delete } = req.body;
  try {
    const result_Team = await teamModal.findAll({
      include: taskModal,
      //   attributes:['id' ]
      where: { id: req.params.id },
    });
    // --
    let resMessage = "All Teams are redered  Successfully join .";

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

// ------------------------------        SCOPES            -----------------------------

exports.completedTaskApi = async (req, res, next) => {
  const data = await taskModal.scope('checkStatus').findAll({
    // order: [
    //   ['createdAt','DESC']
    // ],
    include: teamModal
  });

  res.status(200).json({ data });
};
