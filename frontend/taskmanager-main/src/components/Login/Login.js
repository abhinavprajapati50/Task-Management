import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import { useNavigate } from "react-router-dom";

export const Login = ({ setisLoggedIN }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passError, setPassError] = useState(false);

  const [username, setusername] = useState("");
  const [registerEmail, setregisterEmail] = useState("");
  const [registerPassword, setregisterPassword] = useState("");
  const [registerConfirmPassword, setregisterConfirmPassword] = useState("");
  const [usernameError, setusernameError] = useState(false);
  const [registerEmailError, setregisterEmailError] = useState(false);
  const [registerPassError, setregisterPassError] = useState(false);
  const [registerConfirmPassError, setregisterConfirmPassError] =
    useState(false);

  const [error, seterror] = useState("");

  const navigate = useNavigate();

  const toggleForm = () => {
    const container = document.querySelector(".container");
    container.classList.toggle("active");
  };

  const signUpHandler = async (event) => {
    event.preventDefault();
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
        registerConfirmPassword: registerConfirmPassword,
      });
      console.log(result.data.message);

      localStorage.setItem("user", 1);
      // if (result) {
      //   console.log("finish");
      //   // return true;
      // }
      // toast.success(result.data.message);
      setisLoggedIN(true);

      navigate("admin", { return: true });
    } catch (error) {
      // setEmailError(true);
      return error.message;
      // return toast.error("Invalid Credentials");

      // console.log(error);
    }
  };
  const loggedInHandler = async (event) => {
    event.preventDefault();
    setEmailError(true);
    setPassError(true);
    // validation();
    try {
      const result = await axios.post("http://localhost:5000/signin", {
        email: email,
        password: password,
      });
      console.log("result", result);
      if (result.data.status == false) {
        seterror(result.data.message);
        toast(result.data.message);
      } else {
        localStorage.setItem("token", result.data.token);
        setisLoggedIN(true);
        claearData();
        navigate("/dashboard", { return: true });
      }
    } catch (error) {
      // setEmailError(true);
      return error.message || error;
      // return toast.error("Invalid Credentials");

      // console.log(error);
    }
  };

  const claearData = () => {
    setEmail("");
    setPassword("");
  };

  return (
    <div>
      {/* Login */}
      <div>
        {/* <body> */}
        <section>
          <div className="container">
            <ToastContainer />

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
                  {error}
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
                    type="password"
                    value={password}
                    name="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
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
                    <p style={{ color: "red", marginTop: "-0.2rem" }}>
                      Plz enter your Username.
                    </p>
                  )}

                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {registerEmailError && !email && (
                    <p style={{ color: "red", marginTop: "-0.2rem" }}>
                      Plz enter your email.
                    </p>
                  )}
                  <input
                    type="password"
                    name="password"
                    placeholder="Create Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {registerPassError && !password && (
                    <p style={{ color: "red", marginTop: "-0.2rem" }}>
                      Plz enter your Password.
                    </p>
                  )}
                  <input
                    type="password"
                    name=""
                    placeholder="Confirm Password"
                    value={registerConfirmPassword}
                    onChange={(e) => setregisterConfirmPassword(e.target.value)}
                  />
                  {registerConfirmPassError && !registerConfirmPassword && (
                    <p style={{ color: "red", marginTop: "-0.2rem" }}>
                      Plz enter your Confirm Password.
                    </p>
                  )}
                  <input type="submit" name="" value="Sign Up" />
                  <p className="signup">
                    Already have an account ?
                    <a href="#" onClick={toggleForm}>
                      Sign in.
                    </a>
                  </p>
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
