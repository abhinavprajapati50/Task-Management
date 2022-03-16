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
import { taskUpdateSuccess } from "../../New_Redux/Actions/UpdateActions";
// import { TaskUpdateForm } from "../TaskForm/TaskUpdateForm";

function TaskItem({ setisLoggedIN, setloader }) {
  // debugger
  const [allTaskData, setallTaskData] = useState([]);
  const [completedTaskState, setcompletedTaskState] = useState(null);
  const [deletedTaskState, setDeletedTaskState] = useState(null);
  const [assignTaskName, setassignTaskName] = useState([]);
  // const [loader, setloader] = useState(false);
  let [nameId, setnameId] = useState();
  const [updateData, setupdateData] = useState("");
  const navgate = useNavigate();
  const paramas = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  setisLoggedIN(true);
  const allTaskFuncHandler = async () => {
    const allTask = await axios.get(taskApi);
    setloader(false);
    setallTaskData(allTask.data.data);
  };

  const handleDateDDMMYYFormat = (date) => {
    let theDate = new Date(Date.parse(date));
    return theDate.toLocaleDateString();
  };

  const handleCompletedTask = async (taskId) => {
    console.log(taskId);
    try {
      let completedTask = await axios.put(
        `http://localhost:5000/task/completed/${taskId}`
      );
      setloader(false);
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

  const editHandler = async (data) => {
    debugger
    console.log("dsffffadfs");
    // console.log("data", data);
    // if (data == undefined) {
    //   return navigate("/");
    // }

    // const datas = await dispatch(taskUpdateSuccess(data));
    // console.log(datas);
    return navgate(`/edit/${data.id}`, { state: data });
  };

  const getAllTasks = async () => {
    const allTask = await axios.get(taskApi);
    setallTaskData(allTask.data.data);
  };

  useEffect(async () => {
    allTaskFuncHandler();
    getAllTasks();
    // assignTaskNameFunc();
    setloader(false);
    // const allTask = await axios.get(taskApi);
    // setallTaskData(allTask.data.data);
  }, [completedTaskState]);
  return (
    <div className="cardStyle">
      {/* {Loader ? (
        <img src="./images/task.gif" alt="" width="100%" height="560vh" />
      ) : ( */}
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
                          color="error"
                          onClick={() => handleDeletedTask(taskInfo.id)}
                        >
                          Delete
                        </Button>
                        {/* <Link to={`/edit/${taskInfo.id}`}> */}
                          <Button variant="contained" onClick={ () =>  editHandler(taskInfo)}>
                            Edit
                            <EditIcon  />
                          </Button>
                        {/* </Link> */}
                      </CardActions>
                    </Card>
                  </div>
                )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskItem;
