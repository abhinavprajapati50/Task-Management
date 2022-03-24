import React, { useState } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Switch,
  Navigate,
  useLocation
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
import { Dashboard } from "./components/Dashboard/Dashboard";
import { ForgotPassword } from "./components/Login/ForgotPassword";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { Loader } from "./components/Loader";
import { TaskUpdateForm } from "./components/TaskForm/TaskUpdateForm";
import { Project_Form } from "./components/ProjectForm/Project-Form";
import { Project_List } from "./components/ProjectForm/Project_List";
import { ProjectTasks } from "./components/ProjectForm/ProjectTasks";

function App() {
  // const location = useLocation()
  const [isLoggedIN, setisLoggedIN] = useState(
    localStorage.getItem("token") ? true : false
  );
  const [loader, setloader] = useState(false);
  console.log(loader);

  // console.log("-------------=--=-location", location);
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        {!isLoggedIN && (
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
        {loader ? (
          <Loader />
        ) : (
          isLoggedIN && (
            <>
              <MainMenu setisLoggedIN={setisLoggedIN} />
              <Routes>
                <Route
                  path="/"
                    element={<Dashboard />}
                  
                />
                {/* <Route
                  path="/"
                  element={
                    <TaskItem
                      setisLoggedIN={setisLoggedIN}
                      setloader={setloader}
                    />
                  }
                /> */}
                <Route path="/task/:id" element={<TaskDetails />} />            
                <Route path="/newtask" element={<TaskForm />} />
                <Route path="/newproject" element={<Project_Form />} />
                <Route path="/edit/:id" element={<TaskUpdateForm />} />
                <Route path="/project/edit/:id" element={<Project_Form />} />
                <Route path="/project/add-task/:id" element={<ProjectTasks />} />
                <Route path="/completedtask" element={<CompletedTask />} />
                <Route path="/team" element={<Team />} />
                <Route path="/team/:id" element={<TeamDetails />} />
                {/* <Route path="/task" element={
                    <TaskItem
                      setisLoggedIN={setisLoggedIN}
                      setloader={setloader}
                    />
                  }   /> */}
                <Route path="/project_list" element={
                    <Project_List
                      setisLoggedIN={setisLoggedIN}
                      setloader={setloader}
                    />
                  }   />
                {/* <Route path="/dashboard" element={<Dashboard />} /> */}
                <Route path="*" element={<Navigate replace to="/" />} />
              </Routes>
            </>
          )
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
