import React from "react";
import { Link,useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Login";

function MainMenu({ setisLoggedIN }) {
  const navigate = useNavigate();


  const logoutHandler = () => {
    localStorage.removeItem("user")
    setisLoggedIN(false)
    navigate("/", { return: true });

  }
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
          <Link className="nav-link" to="/dashboard">
            <li className="nav-item">Dashboard</li>
          </Link>
          <Link className="nav-link" to="/">
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
          <Link className="nav-link" to="/pendingtask">
            <li className="nav-item">PendingTask</li>
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
