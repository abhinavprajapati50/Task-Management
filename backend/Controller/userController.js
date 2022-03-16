const User = require("../Model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const jwtTokenHandler = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_TOKEN, {
    expiresIn: process.env.EXPIRE_IN,
  });
};

exports.signUpRoute = async (req, res, next) => {
  const { email, password, username, role } = req.body;
  const emailRegexp =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const regularExpression =
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  console.log("------------------------0-0-0-0-0-", role);
  console.log(
    "------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>",
    req.body
  );
  try {
    // if (!username || !password || !email || !confirmpassword) {
    //   return res
    //     .status(200)
    //     .json({ status: false, message: "All Field required!!" });
    // }
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
    // if (!confirmpassword) {
    //   return res.status(200).json({
    //     status: false,
    //     message: "Plz fill the confirmpassword",
    //   });
    // }

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

    // console.log("---------=-=", req.body);
    const data = await User.findOne({ where: { email: email } });

    if (data) {
      return res.status(200).json({
        status: false,
        message:
          "This email is already is exist !!! Please use different email!!",
      });
    }

    // console.log("---------------=-the data", data);

    const bcryptPass = await bcrypt.hash(password, 12);
    const result = await User.create({
      email: email,
      password: bcryptPass,
      username: username,
      role: role,
    });
    const token = jwtTokenHandler(result.id);

    console.log("--------------=->>>>>>>>>>>>>>>>>>token", result);
    // console.log("--------------=-req.headers", req.headers);

    if (result) {
      return res.status(200).json({
        status: true,
        message: "user is successfull register",
        data: { username: result.username, email: result.email },
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
  console.log("--------------------");
  console.log("--------------------", req.body);
  const alreadyExists = await User.findOne({ where: { email } });

  if (!alreadyExists) {
    return res.status(200).json({
      status: false,
      message: "Could not found your Account!!!",
    });
  }
  try {
    console.log(
      "------------=-alreadyExists",
      password,
      alreadyExists.password
    );

    // console.log("---------the sigin data", alreadyExists);
    if (alreadyExists) {
      await bcrypt.compare(
        password,
        alreadyExists.password,
        (err, descPass) => {
          console.log("--------------------=-=-=", err);
          if (err) {
            return res.status(200).json({
              status: false,
              message: "Somethings wants wrong to brypted password!!! ",
              error: err,
            });
          }
          if (descPass) {
            console.log("--------------descPass", descPass);
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
        const token = jwtTokenHandler(alreadyExists.id);

        return res.status(200).json({
          status: true,
          message: "Login successfully",
          data: {
            username: alreadyExists.username,
            email: alreadyExists.email,
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
