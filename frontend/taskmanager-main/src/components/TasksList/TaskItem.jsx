import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { ToastContainer, toast } from "react-toastify";

import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
// import "./Taskcss/Task_Item.css";
import "./Taskcss/Task_Item.css";
import { useDispatch, useSelector } from "react-redux";
import { joinTeamTaSk, taskApi } from "../Api/api";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
// import { TaskUpdateForm } from "../TaskForm/TaskUpdateForm";
import { taskUpdateSuccess } from "../../New_Redux/Actions";

function TaskItem({ setisLoggedIN, setloader }) {
  const Loader = useSelector((state) => state.user.loading);
  const [allTaskData, setallTaskData] = useState([]);
  const [completedTaskState, setcompletedTaskState] = useState(null);
  const [deletedTaskState, setDeletedTaskState] = useState(null);
  const [assignTaskName, setassignTaskName] = useState([]);
  let [nameId, setnameId] = useState();
  const [updateData, setupdateData] = useState("");
  const navgate = useNavigate();
  const paramas = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  setisLoggedIN(true);
  const allTaskFuncHandler = async () => {
    const allTask = await axios.get(taskApi);
    setallTaskData(allTask.data.data);
  };

  const handleDateDDMMYYFormat = (date) => {
    let theDate = new Date(Date.parse(date));
    return theDate.toLocaleDateString();
  };

  const assignTaskNameFunc = async (id) => {
    try {
      console.log(id);
      let assignedName = await axios.get(`http://localhost:5000/team/${id}`);
      // let taskName = assignedName.data.data.name;
      setassignTaskName(assignedName.data.data.name);
      // return taskName
    } catch (error) {
      console.log("ERROR: " + error.message || error);
    }
  };

  const handleCompletedTask = async (taskId) => {
    console.log(taskId);
    try {
      let completedTask = await axios.put(
        `http://localhost:5000/task/completed/${taskId}`
      );
      setcompletedTaskState(completedTask);
      if (completedTask) {
        toast.success("task is completed successfully");
      }
      navgate("/completedtask");
      return completedTask;
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeletedTask = async (taskId) => {
    console.log(taskId);
    try {
      let deletedTask = await axios.put(
        `http://localhost:5000/task/deletedtask/${taskId}`
      );
      setDeletedTaskState(deletedTask);
      if (deletedTask) {
        toast.dismiss("task is deletedTask successfully");
      }
      navgate("/deletedTask");
      return deletedTask;
    } catch (error) {
      console.log(error || error.message);
    }
  };

  const editHandler = (data) => {
    console.log("data", data);
    if (data ==   undefined) {
      return navigate("/");
    }
    console.log(dispatch(taskUpdateSuccess(data)));
    dispatch(taskUpdateSuccess(data));
    // return <TaskUpdateForm data={data} />

    // settask()
    // setdescription()
    //  setdueDate()
    //   setAssign_to()
    //    setstatus()
  };

  //   try {
  //     let result = await axios.put(
  //   `http://localhost:5000/admin/appontment/aprooved/${data.id}`
  // );
  // setstatus("1");
  // // handleApproved()
  // return result;
  // } catch (error) {
  // console.log(error);
  // }

  useEffect(async () => {
    setloader(false);
    allTaskFuncHandler();
    assignTaskNameFunc();
    const allTask = await axios.get(taskApi);
    setallTaskData(allTask.data.data);
    editHandler();
  }, [completedTaskState]);
  return (
    <div className="cardStyle">
      {Loader ? (
        <img src="./images/task.gif" alt="" width="100%" height="560vh" />
      ) : (
        <div>
          <div className="style">
            <div className="row col d-flex justify-content-center">
              {allTaskData.map(
                (taskInfo) =>
                  taskInfo.status == 0 &&
                  taskInfo.chr_delete == 0 && (
                    <div className="card_padding" key={taskInfo.id}>
                      <Card
                        className="card"
                        sx={{ width: 345, height: 300, padding: "1rem" }}
                      >
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            {taskInfo.task}
                          </Typography>
                          <Typography gutterBottom variant="h5" component="div">
                            {handleDateDDMMYYFormat(taskInfo.dueDate)}
                          </Typography>
                          {/* { console.log(taskInfo.team.id) } */}
                          <Typography variant="body2" color="text.secondary">
                            {taskInfo.description}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {/* { setnameId(taskInfo.Assign_to ) } */}
                            {/* assignned to - {assignTaskNameFunc( taskInfo.Assign_to)} */}
                            {/* assignned to - {  assignTaskNameFunc(taskInfo.Assign_to) } */}
                            {/* assignned to - {taskInfo.team.name} */}
                          </Typography>
                        </CardContent>
                        <CardActions>
                          {/* {taskInfo.completed == true && ( */}
                          <Button
                            variant="contained"
                            color="success"
                            onClick={() => handleCompletedTask(taskInfo.id)}
                          >
                            Complete
                          </Button>
                          {/* )} */}
                          <Button
                            className="mr-2"
                            variant="contained"
                            color="warning"
                            onClick={() => handleDeletedTask(taskInfo.id)}
                          >
                            Delete
                          </Button>
                          <Link to={`/edit/${taskInfo.id}`}>
                            <Button variant="contained" >
                              Edit
                              <EditIcon
                                style={{
                                  color: "blue",
                                  marginRight: "20px",
                                  cursor: "pointer",
                                }}
                                onClick={() => editHandler(taskInfo)}
                              />
                            </Button>
                          </Link>
                        </CardActions>
                      </Card>
                    </div>
                  )
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskItem;
