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
    const result_Team = await teamModal.findAll();
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
