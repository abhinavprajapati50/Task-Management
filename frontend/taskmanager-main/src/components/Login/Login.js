import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
// import { useNavigate } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import { useSelector, useDispatch } from "react-redux";
import {
  loginFail,
  loginStart,
  loginSuccess,
  registerFail,
  registerStart,
  registerSuccess,
} from "../../New_Redux/Actions";

export const Login = ({ setisLoggedIN }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passError, setPassError] = useState(false);

  const [visibility, setVisibility] = useState(false);

  const [username, setusername] = useState("");
  const [registerEmail, setregisterEmail] = useState("");
  const [registerPassword, setregisterPassword] = useState("");
  const [registerConfirmPassword, setregisterConfirmPassword] = useState("");
  const [usernameError, setusernameError] = useState(false);
  const [registerEmailError, setregisterEmailError] = useState(false);
  const [registerPassError, setregisterPassError] = useState(false);
  const [registerConfirmPassError, setregisterConfirmPassError] =
    useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const Loading = useSelector((state) => state.userloading);
  // const user = useSelector((state) => state.user);
  // const authuser = useSelector((state) => state.authUser);

  const label = visibility ? "aria-label" : "Checkbox demo";

  const toggleForm = () => {
    const container = document.querySelector(".container");
    container.classList.toggle("active");
    clearData();
  };

  useEffect(() => {
    console.log(user);
  },[]);

  const signUpHandler = async (event) => {
    event.preventDefault();
    dispatch(registerStart());
    setusernameError(true);
    setregisterEmailError(true);
    setregisterPassError(true);
    setregisterConfirmPassError(true);
    // validation();
    try {
      const result = await axios.post("http://localhost:5000/signup", {
        username: username,
        email: email,
        password: password,
        confirmpassword: registerConfirmPassword,
      });
      console.log(result);
      dispatch(registerSuccess(result.data));

      if (result.data.status == false) {
        // setRegerror(result.data.message);
        toast.error(result.data.message);
        console.log(result);
      } else {
        localStorage.setItem("token", result.data.token, {
          username: result.data.username,
        });
        // dispatch(authsUserAction.loggedInUser());
        setisLoggedIN(true);
        clearData();
        navigate("/dashboard", { return: true });
      }

      console.log(result.data.message);

      // navigate("admin", { return: true });
    } catch (error) {
      // setEmailError(true);
      dispatch(registerFail(error));
      console.log(error.message);
      toast.error(error.message);
      // return toast.error("Invalid Credentials");

      // console.log(error);
    }
  };
  const loggedInHandler = async (event) => {
    event.preventDefault();

    setEmailError(true);
    setPassError(true);
    dispatch(loginStart());

    // validation();
    try {
      const result = await axios.post("http://localhost:5000/signin", {
        email: email,
        password: password,
      });
      // dispatch(login({result: result.data, loggedIn: true}) )
      // dispatch(userActions.login());
      // console.log("result", result);
      if (result.data.status == false) {
        toast.error(result.data.message);
      } else {
        localStorage.setItem("token", result.data.token);
        dispatch(loginSuccess(result.data));
        // dispatch(authsUserAction.loggedInUser());
        setisLoggedIN(true);
        console.log(result.data.message);
        clearData();
        toast.success(`Welcome ${result.data.data} `);
        // toast.success(result.data.message);
        navigate("/dashboard", { return: true });
      }
    } catch (error) {
      dispatch(loginFail());

      // setEmailError(true);
      return error.message || error;
      // return toast.error("Invalid Credentials");

      // console.log(error);
    }
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
