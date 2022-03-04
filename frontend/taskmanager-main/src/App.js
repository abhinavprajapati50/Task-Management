import React, { useState } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Switch,
  Navigate,
} from "react-router-dom";

import MainMenu from "./components/MainMenu/MainMenu";
import TasksList from "./components/TasksList/TasksList";
import TaskForm from "./components/TaskForm/TaskForm";
import { Login } from "./components/Login/Login";
import { Team } from "./components/Team/Team";
import TaskItem from "./components/TasksList/TaskItem";
import moment from "moment";
import { TeamDetails } from "./components/Team/TeamDetails";
import { TaskDetails } from "./components/TasksList/TaskDetails";
import { CompletedTask } from "./components/TasksList/completedTask";
import { PendingTask } from "./components/TasksList/PendingTask";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { ForgotPassword } from "./components/Login/ForgotPassword";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";

function App() {
  const [tasks, setTasks] = useState([
    {
      id: "1",
      teamId: "1",
      title: "Add Cancle functionality ",
      description: "Add Cancle functionality  to craete the form data and more",
      createdDate: new Date(),
      dueDate: moment().add(3, "days").format("DD-MM-yyyy"),
      status: "completed",
      Assign: "abhinav",
      completed: true,
    },
    {
      id: "2",
      teamId: "2",
      title: "Add Button",
      description: "Add login button in navbar",
      createdDate: new Date(),
      dueDate: moment().add(3, "days").format("DD-MM-yyyy"),
      status: "New",
      Assign: "bhavesh",
      completed: true,
    },
    {
      id: "3",
      teamId: "9",
      title: "Fix the  Functionality",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam, in? ",
      createdDate: new Date(),
      dueDate: moment().add(3, "days").format("DD-MM-yyyy"),
      status: "New",
      Assign: "data",
      completed: true,
    },
    {
      id: "4",
      teamId: "3",
      title: "create single components and get the details",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla quas, nisi hic veniam harum culpa. ",
      createdDate: new Date(),
      dueDate: moment().add(3, "days").format("DD-MM-yyyy"),
      status: "New",
      Assign: "hinal",
      completed: false,
    },
    {
      id: "5",
      teamId: "4",
      title: "Designning the projects looks better",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel magnam nulla beatae adipisci maxime maiores. ",
      createdDate: new Date(),
      dueDate: moment().add(3, "days").format("DD-MM-yyyy"),
      status: "New",
      Assign: "abhay",
      completed: false,
    },
    {
      id: "6",
      teamId: "1",
      title: "create react app",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, tempore odio. Laborum tempore recusandae inventore similique quis, necessitatibus doloremque dolorem. ",
      createdDate: new Date(),
      dueDate: moment().add(3, "days").format("DD-MM-yyyy"),
      status: "New",
      Assign: "abhinav",
      completed: false,
    },
    {
      id: "6",
      teamId: "1",
      title: "create react app",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, tempore odio. Laborum tempore recusandae inventore similique quis, necessitatibus doloremque dolorem. ",
      createdDate: new Date(),
      dueDate: moment().add(3, "days").format("DD-MM-yyyy"),
      status: "New",
      Assign: "abhinav",
      completed: false,
    },
    {
      id: "6",
      teamId: "1",
      title: "create react app",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, tempore odio. Laborum tempore recusandae inventore similique quis, necessitatibus doloremque dolorem. ",
      createdDate: new Date(),
      dueDate: moment().add(3, "days").format("DD-MM-yyyy"),
      status: "New",
      Assign: "abhinav",
      completed: true,
    },
    {
      id: "6",
      teamId: "1",
      title: "create react app",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, tempore odio. Laborum tempore recusandae inventore similique quis, necessitatibus doloremque dolorem. ",
      createdDate: new Date(),
      dueDate: moment().add(3, "days").format("DD-MM-yyyy"),
      status: "New",
      Assign: "abhinav",
      completed: true,
    },
    {
      id: "6",
      teamId: "1",
      title: "create react app",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, tempore odio. Laborum tempore recusandae inventore similique quis, necessitatibus doloremque dolorem. ",
      createdDate: new Date(),
      dueDate: moment().add(3, "days").format("DD-MM-yyyy"),
      status: "New",
      Assign: "abhinav",
      completed: true,
    },
    {
      id: "6",
      teamId: "1",
      title: "create react app",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, tempore odio. Laborum tempore recusandae inventore similique quis, necessitatibus doloremque dolorem. ",
      createdDate: new Date(),
      dueDate: moment().add(3, "days").format("DD-MM-yyyy"),
      status: "New",
      Assign: "abhinav",
      completed: true,
    },
    {
      id: "6",
      teamId: "1",
      title: "create react app",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, tempore odio. Laborum tempore recusandae inventore similique quis, necessitatibus doloremque dolorem. ",
      createdDate: new Date(),
      dueDate: moment().add(3, "days").format("DD-MM-yyyy"),
      status: "New",
      Assign: "abhinav",
      completed: true,
    },
  ]);
  let [team, setteam] = useState([
    {
      id: "1",
      name: "abhianv",
      gender: "male",
      work: "Full stack developer",
    },
    {
      id: "2",
      name: "bhavesh",
      gender: "male",
      work: "Designer",
    },
    {
      id: "3",
      name: "hinal",
      gender: "female",
      work: "Full stack developer",
    },
    {
      id: "4",
      name: "abhay",
      gender: "male",
      work: "Full stack developer",
    },
    {
      id: "5",
      name: "sagar",
      gender: "male",
      work: "Full stack developer",
    },
    {
      id: "6",
      name: "utkarsh",
      gender: "male",
      work: "Full stack developer",
    },
  ]);

  // const user = useSelector(states => states);
  // console.log("-------------------------=-=", user);
  const [isLoggedIN, setisLoggedIN] = useState(
    localStorage.getItem("token") ? true : false
  );
  const authuser = useSelector((state) => state.user);
  console.log(authuser);

  // console.log("-------------=--=-isLoggedIN", authuser);
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        { !isLoggedIN && (
          <>
            <Routes>
              <>
                <Route
                  path="/login"
                  element={<Login setisLoggedIN={setisLoggedIN} />}
                />
                <Route path="/forgot-Password" element={<ForgotPassword />} />
                <Route path="*" element={<Navigate replace to="/login" />} />
              </>
            </Routes>
          </>
        )}
        { isLoggedIN && (
          <>
            <MainMenu setisLoggedIN={setisLoggedIN} />
            <Routes>
              <Route
                path="/"
                element={
                  <TaskItem setisLoggedIN={setisLoggedIN} tasks={tasks} />
                }
              />
              <Route path="/task/:id" element={<TaskDetails tasks={tasks} />} />
              <Route path="/newtask" element={<TaskForm />} />
              <Route
                path="/completedtask"
                element={<CompletedTask tasks={tasks} />}
              />
              <Route
                path="/pendingtask"
                element={<PendingTask tasks={tasks} />}
              />
              <Route path="/team" element={<Team team={team} />} />
              <Route path="/team/:id" element={<TeamDetails team={team} />} />
              <Route path="/dashboard" element={<Dashboard tasks={tasks} />} />
              <Route path="*" element={<Navigate replace to="/" />} />
            </Routes>
          </>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
