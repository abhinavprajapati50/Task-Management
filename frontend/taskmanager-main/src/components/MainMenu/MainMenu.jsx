import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Login";
import { useDispatch, useSelector } from "react-redux";

function MainMenu({ setisLoggedIN }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const userExist = useSelector((state) => state.user);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    setisLoggedIN(false);
    // if (userExist) {
    //   dispatch(logout());
    // }
    // dispatch(authsUserAction.logggedOutUser())
    navigate("/login", { return: true });
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link to="/">
        <span className="navbar-brand">Task Management APP</span>
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <Link className="nav-link" to="/">
            <li className="nav-item">Dashboard</li>
          </Link>
          <Link className="nav-link" to="/project_list">
            <li className="nav-item">Projects</li>
          </Link>
          <Link className="nav-link" to="/newproject">
            <li className="nav-item">Add Project</li>
          </Link>
          <Link className="nav-link" to="/task">
            <li className="nav-item">Tasks</li>
          </Link>
          <Link className="nav-link" to="/newtask">
            <li className="nav-item">Add Task</li>
          </Link>
          <Link className="nav-link" to="/team">
            <li className="nav-item">Team-members</li>
          </Link>
          <Link className="nav-link" to="/completedtask">
            <li className="nav-item">CompletedTask</li>
          </Link>
          
        </ul>
      </div>
      <Link className="nav-link" to="/login">
        <Button
          className="nav-item"
          style={{ float: "right", backgroundColor: "#912f2f", color: "white" }}
          onClick={logoutHandler}
        >
          Logout
          <LoginIcon />
        </Button>
      </Link>
      {/* <Link className="nav-link" to="/login">
          <Button className="nav-item" style={{ float: "right" }}>
            logout
          </Button>
        </Link> */}
    </nav>
  );
}

export default MainMenu;
