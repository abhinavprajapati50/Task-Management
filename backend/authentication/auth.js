const jwt = require("jsonwebtoken");
let token;

exports.jwtAuth = async (req, res, next) => {
  let token = req.headers["x-access-token"];
  console.log("--------------------token", token);
//   jwt.verify(token, process.JWT_TOKEN, (err, decoded) => {
//     if (err)
//       return res
//         .status(500)
//         .json({
//           auth: false,
//           status: false,
//           message: "Failed to authenticate token.",
//         });

//     res.status(200).json({ message: "decoded" });
//   });
  next();
};

