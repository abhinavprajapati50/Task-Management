const User = require("../Model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const jwtTokenHandler = (result) => {

  return jwt.sign({ id:result.id, email:result.email,role:result.role }, process.env.JWT_TOKEN, {
    expiresIn: process.env.EXPIRE_IN,
  });
};

exports.signUpRoute = async (req, res, next) => {
  const { email, password, username, role } = req.body;
  const emailRegexp =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const regularExpression =
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  try {
    if (!username) {
      return res
        .status(200)
        .json({ status: false, message: "Plz fill the Username" });
    }

    if (!email) {
      return res
        .status(200)
        .json({ status: false, message: "Plz fill the email" });
    }
    if (!password) {
      return res
        .status(200)
        .json({ status: false, message: "Plz fill the password" });
    }

    if (!emailRegexp.test(email)) {
      res.status(200).json({ status: false, message: "Email is not valid" });
      return false;
    }
    if (!regularExpression.test(password)) {
      res.status(200).json({
        status: false,
        message:
          "plz fill valid password  */ fill one lowercase,one uppercase, one digit,valid 6 to 16",
      });
      return false;
    }

    const data = await User.findOne({ where: { email: email } });

    if (data) {
      return res.status(200).json({
        status: false,
        message:
          "This email is already is exist !!! Please use different email!!",
      });
    }

    const bcryptPass = await bcrypt.hash(password, 12);
    const result = await User.create({
      email: email,
      password: bcryptPass,
      username: username,
      role: role,
    });
    // const reusltData = {id:result.id, email:result.email,role:result.role }
    const token = jwtTokenHandler(result);

    if (result) {
      return res.status(200).json({
        status: true,
        message: "user is successfull register",
        data: { username: result.username, email: result.email, role: role },
        token,
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Somethings wants wrong!!",
      data: error.message || error,
    });
  }
};

exports.signin = async (req, res) => {
  const { email, password, role } = req.body;
  console.log("------------------------0-0-0-0-0-", role);
  if (!email || !password) {
    return res
      .status(500)
      .json({ status: false, message: "All Field required" });
  }

  if (!email) {
    return res
      .status(200)
      .json({ status: false, message: "Plz fill the email" });
  }
  if (!password) {
    return res
      .status(200)
      .json({ status: false, message: "Plz fill the password" });
  }
  const alreadyExists = await User.findOne({ where: { email } });

  if (!alreadyExists) {
    return res.status(200).json({
      status: false,
      message: "Could not found your Account!!!",
    });
  }
  try {
    if (alreadyExists) {
      await bcrypt.compare(
        password,
        alreadyExists.password,
        (err, descPass) => {
          if (err) {
            return res.status(200).json({
              status: false,
              message: "Somethings wants wrong to brypted password!!! ",
              error: err,
            });
          }
          if (descPass) {
            jwt.sign(
              { id: alreadyExists.id },
              "theimaginarydragontheabhinavprajapati",
              { expiresIn: "10s" }
            );
            // req.headers["x-access-token"];
          }
        }
      );
      let comparePass = await bcrypt.compare(password, alreadyExists.password);
      console.log(
        "------------------comparePass",
        alreadyExists &&
          (await bcrypt.compare(password, alreadyExists.password))
      );

      if (alreadyExists && comparePass) {
        const token = jwtTokenHandler(alreadyExists);

        return res.status(200).json({
          status: true,
          message: "Login successfully",
          data: {
            username: alreadyExists.username,
            email: alreadyExists.email,
            role: alreadyExists.role,
          },
          // data: alreadyExists.username,
          token,
        });
      } else {
        return res.status(200).json({
          status: false,
          message: "Invalid Credentials",
        });
      }
    } else {
      return res.status(500).json({
        status: false,
        message: "Somethings wants wrong !!! ",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Error occurs, Please try another email address",
      data: error.message || error,
    });
  }
};
