import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
// import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { useSelector, useDispatch } from "react-redux";

import { LoginAction } from "../../New_Redux/Actions/LoginAction";
import { RegisterActions } from "../../New_Redux/Actions/RegisterActions";

export const Login = ({ setisLoggedIN }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passError, setPassError] = useState(false);

  const [visibility, setVisibility] = useState(false);

  const [username, setusername] = useState("");
  const [role, setRole] = useState(2);
  const [registerPassword, setregisterPassword] = useState("");
  const [registerConfirmPassword, setregisterConfirmPassword] = useState("");
  const [usernameError, setusernameError] = useState(false);
  const [registerEmailError, setregisterEmailError] = useState(false);
  const [registerPassError, setregisterPassError] = useState(false);
  const [registerConfirmPassError, setregisterConfirmPassError] =
    useState(false);
  const [loginData, setloginData] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const Loading = useSelector((state) => state.userloading);
  // const user = useSelector((state) => state.user);
  // const authuser = useSelector((state) => state.authUser);
console.log("----------loggedUser", loginData);
  const label = visibility ? "aria-label" : "Checkbox demo";

  const handleChange = (event) => {
    setRole(event.target.value);
  };

  const toggleForm = () => {
    const container = document.querySelector(".container");
    container.classList.toggle("active");
    clearData();
  };

  useEffect(() => {
    console.log(user);
  }, []);

  const signUpHandler = async (event) => {
    // debugger
    event.preventDefault();
    setusernameError(true);
    setregisterEmailError(true);
    setregisterPassError(true);
    setregisterConfirmPassError(true);
    // debugger
    // validation();
    const signUpUser = {
      username: username,
      email: email,
      password: password,
      role: role,
      confirmpassword: registerConfirmPassword,
    };
    if (!username) {
      return toast.error("Please enter a username !!");
    }
    if (!email) {
      return toast.error("Please enter a email !!");
    }
    if (!password) {
      return toast.error("Please enter a password !!");
    }
    if (!registerConfirmPassword) {
      return toast.error("Please enter a confirm-password !!");
    }

    if (password !== registerConfirmPassword) {
      toast.error("Password Could Not Be Match");
      return;
    }
    console.log("---------------->", signUpUser);
    setloginData(signUpUser)
    const registeredUser = await dispatch(RegisterActions(signUpUser));
    
    console.log(registeredUser);
    // isRegistered
    if (registeredUser.isRegistered == false) {
      toast.error(registeredUser.payload);
      return;
    }

    // if (registeredUser.isRegistered == false) {
    //   return toast.error(registeredUser.payload);
    // }
    setisLoggedIN(true);
    clearData();
    console.log("--------------loggedInData.payload", registeredUser.payload);
    toast.success(`Welcome to ${registeredUser.payload.username} `);
    navigate("/", { return: true });

    // navigate("admin", { return: true });
  };
  const loggedInHandler = async (event) => {
    event.preventDefault();
    setEmailError(true);
    setPassError(true);

    // validation();
    const loginCredentials = {
      email,
      password,
      role
    };
    const loggedInData = await dispatch(LoginAction(loginCredentials));

    console.log(loggedInData);
    setloginData(loggedInData)

    if (loggedInData.isLoggedIn == false) {
      toast.error(loggedInData.payload);
      return;
    }
    setisLoggedIN(true);

    console.log("--------------loggedInData.payload", loggedInData.payload);
    clearData();
    toast.success(`Welcome ${loggedInData.payload.username} `);
    // toast.success(result.data.message);
    navigate("/", { return: true });
  };

  const clearData = () => {
    setEmail("");
    setPassword("");
    setregisterConfirmPassword("");
    setusernameError(false);
    setregisterEmailError(false);
    setregisterPassError(false);
    setregisterConfirmPassError(false);
    setEmailError(false);
    setPassError(false);
  };
  return (
    <div>
      {/* Login */}
      <div>
        {/* <body> */}
        <section>
          <div className="container">
            <ToastContainer />
            <Checkbox {...label} defaultChecked />

            <div className="user signinBx">
              <div className="imgBx">
                <img
                  src="https://raw.githubusercontent.com/WoojinFive/CSS_Playground/master/Responsive%20Login%20and%20Registration%20Form/img1.jpg"
                  alt=""
                />
              </div>
              <div className="formBx">
                <form action="" onSubmit={loggedInHandler}>
                  <h2>Sign In</h2>
                  {/* <div className="errorMessage">{<p> {error} </p>}</div> */}
                  <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {emailError && !email && (
                    <p style={{ color: "red", marginTop: "-0.2rem" }}>
                      Plz enter your email.{" "}
                    </p>
                  )}
                  <input
                    type={visibility ? "text" : "password"}
                    value={password}
                    name="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {/* <VisibilityIcon onClick={() =>  setVisibility(!visibility) } className="visibleEye"/> */}
                  {/* <Checkbox {...label}  /> */}
                  <div className="visibleEye">
                    <input
                      type="checkbox"
                      onClick={() => setVisibility(!visibility)}
                      className="check_showpassword"
                    />
                    {password && visibility
                      ? " Hide Password"
                      : " Show Password"}
                  </div>
                  {passError && !password && (
                    <p style={{ color: "red", marginTop: "-0.2rem" }}>
                      Plz Enter your password.
                    </p>
                  )}
                  <input type="submit" name="" value="Login" />
                  <div className="forgot-Password">
                    <Link to="/forgot-Password">forgot password</Link>
                  </div>
                  <p className="signup">
                    Don't have an account ?
                    <a href="#" onClick={toggleForm}>
                      Sign Up.
                    </a>
                  </p>
                </form>
              </div>
            </div>
            <div className="user signupBx">
              <div className="formBx">
                <form action="" onSubmit={signUpHandler}>
                  <h2>Create an account</h2>

                  <input
                    type="text"
                    name="Username"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setusername(e.target.value)}
                  />
                  {usernameError && !username && (
                    <small style={{ color: "red", marginTop: "-0.2rem" }}>
                      Plz enter your Username.
                    </small>
                  )}

                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {registerEmailError && !email && (
                    <small style={{ color: "red", marginTop: "-0.2rem" }}>
                      Plz enter your email.
                    </small>
                  )}
                  <input
                    type="password"
                    name="password"
                    placeholder="Create Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {registerPassError && !password && (
                    <small style={{ color: "red", marginTop: "-0.2rem" }}>
                      Plz enter your Password.
                    </small>
                  )}
                  <input
                    type="password"
                    name=""
                    placeholder="Confirm Password"
                    value={registerConfirmPassword}
                    onChange={(e) => setregisterConfirmPassword(e.target.value)}
                  />
                  {registerConfirmPassError && !registerConfirmPassword && (
                    <small style={{ color: "red", marginTop: "-0.2rem" }}>
                      Plz enter your Confirm Password.
                    </small>
                  )}
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Select Role
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={role}
                        label="Role"
                        onChange={handleChange}
                      >
                        <MenuItem value={1}>Project Manager</MenuItem>
                        <MenuItem value={2}>Employee</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  <div>
                    <input type="submit" name="" value="Sign Up" />
                    <p className="signup">
                      Already have an account ?
                      <a href="#" onClick={toggleForm}>
                        Sign in.
                      </a>
                    </p>
                  </div>
                </form>
              </div>
              <div className="imgBx">
                <img
                  src="https://raw.githubusercontent.com/WoojinFive/CSS_Playground/master/Responsive%20Login%20and%20Registration%20Form/img2.jpg"
                  alt=""
                />
              </div>
            </div>
          </div>
        </section>
        {/* </body> */}
      </div>
    </div>
  );
};
