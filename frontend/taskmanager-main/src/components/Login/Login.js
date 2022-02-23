import React, { useState } from "react";
import "./Login.css";
// import { useNavigate } from "react-router-dom";

export const Login = () => {
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

  const toggleForm = () => {
    console.log("------------sdf");
    const container = document.querySelector(".container");
    container.classList.toggle("active");
  };
  //     const toggleFor = () => {
  //       console.log("------------sdf");
  //     const container = document.querySelector(".container");
  //     container.classNameList.toggle("active");
  //   };

  const signUpHandler = (event) => {
    event.preventDefault();
    alert("signUpHandler");
  };

  const loggedInHandler = async (event) => {
    event.preventDefault();
    setEmailError(true);
    setPassError(true);
    console.log("login handler", email, password);
    try {
      // validation();
      //   const result = await axios.post("http://localhost:5000/signin", {
      //     email: email,
      //     password: password,
      //   });
      //   toast.success(result.data.message);
      //   localStorage.setItem("user", 1);
      //   setIsLoggedIn(true);
      //   navigate("admin", { return: true });
    } catch (error) {
      // setEmailError(true);
      console.log(error || error.message);
      return error;

      // console.log(error);
    }
  };

  return (
    <div>
      {/* Login */}
      <div>
        {/* <body> */}
        <section>
          <div className="container">
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

                  <input
                    type="email"
                    name=""
                    placeholder="Email Address"
                    value={registerEmail}
                    onChange={(e) => setregisterEmail(e.target.value)}
                  />
                  <input
                    type="password"
                    name=""
                    placeholder="Create Password"
                    value={registerPassword}
                    onChange={(e) => setregisterPassword(e.target.value)}
                  />
                  <input
                    type="password"
                    name=""
                    placeholder="Confirm Password"
                    value={registerConfirmPassword}
                    onChange={(e) => setregisterConfirmPassword(e.target.value)}
                  />
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
