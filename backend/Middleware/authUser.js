const User = require("../Model/User");

const checkEmail = async (req, res, next) => {
  const data = await User.findOne({ where: { email: req.body.email} });
        console.log("--------=-=existing email", data);
  if (data) {
    return res.status(200).json({
      status: false,
      message:
        "This email is already is exist !!",
    });
  }

  next();
};

const authExisting = {
  checkEmail,
};

module.exports = authExisting;
