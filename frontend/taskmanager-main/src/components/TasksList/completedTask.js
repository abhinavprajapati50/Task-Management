import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./Taskcss/Completed_Task.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getCompletedTaskAction } from "../../New_Redux/Actions/TeamActions";
import { getDeletedTask } from "../../New_Redux/Actions/getAllTask";

export const CompletedTask = () => {
  const [taskData, settaskData] = useState([]);
  const [deletedTaskState, setDeletedTaskState] = useState([]);
  const{pathname} = useLocation();

  const dispatch = useDispatch();

  const taskDataFunc = async () => {
    const allCompletedTask = await dispatch(getCompletedTaskAction());
    // const task = await axios.get(completedTaskLink);
    console.log(allCompletedTask);
    settaskData(allCompletedTask.payload);
  };
  const handleDateDDMMYYFormat = (date) => {
    let theDate = new Date(Date.parse(date));
    return theDate.toLocaleDateString();
  };

  const handleDeletedTask = async (task) => {
    try {
      // let deletedTask = await axios.put(
      //   `http://localhost:5000/task/deletedtask/${taskId}`
      // );
      const deletedTask = await dispatch(getDeletedTask(task));
      setDeletedTaskState(deletedTask);
      if (deletedTaskState) {
        toast.success("task is deletedTask successfully");
      }
      // navgate("/deletedTask")
      return deletedTask;
    } catch (error) {
      console.log(error);
      return error.message || error;
    }
  };

  useEffect(() => {
    taskDataFunc();
  }, [deletedTaskState, taskData.length, pathname]);

  return (
    <div>
      <div className="card_Style">
        <div>
          <div className="flex_card">
            <div className="row col d-flex justify-content-center">
              {taskData.map((taskInfo) => (
                <div className="padding_card" key={taskInfo.id}>
                  <Card sx={{ width: 345, height: 300, padding: "1rem" }}>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {taskInfo.task}
                      </Typography>
                      <Typography gutterBottom variant="h5" component="div">
                        {handleDateDDMMYYFormat(taskInfo.dueDate)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {taskInfo.description}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Completed By -{" "}
                        {taskInfo.team == null ? "" : taskInfo.team.name}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        variant="contained"
                        color="warning"
                        onClick={() => handleDeletedTask(taskInfo)}
                      >
                        Delete
                      </Button>
                    </CardActions>
                  </Card>
                </div>
              ))}
              {taskData <= 0 && <h1> No Task is completed</h1>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
