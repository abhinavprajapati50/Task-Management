import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./Taskcss/Completed_Task.css";
import { completedTaskLink, taskApi } from "../Api/api";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const CompletedTask = () => {
  const [taskData, settaskData] = useState([]);
  const [deletedTaskState, setDeletedTaskState] = useState([]);
  const navgate = useNavigate();

  const taskDataFunc = async () => {
    const task = await axios.get(completedTaskLink);
    settaskData(task.data.data);
  };
  const handleDateDDMMYYFormat = (date) => {
    let theDate = new Date(Date.parse(date));
    return theDate.toLocaleDateString();
  };

  const handleDeletedTask = async (taskId) => {
    console.log(taskId);
    try {
      let deletedTask = await axios.put(
        `http://localhost:5000/task/deletedtask/${taskId}`
      );
      setDeletedTaskState(deletedTask);
      if (deletedTaskState) {
        toast.success("task is deletedTask successfully");
      }
      console.log(deletedTask.data.data);
      // navgate("/deletedTask")
      return deletedTask;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    taskDataFunc();
  }, [deletedTaskState]);

  console.log(taskData);

  return (
    <div>
      <div className="card_Style">
        <div>
          <div className="flex_card">
            <div className="row col d-flex justify-content-center">
              {taskData.map((taskInfo) => (
                <div className="padding_card" key={taskInfo.id}>
                  {console.log(taskInfo)}
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
                        Completed By
                        {/* - {taskInfo.team.name} */}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        variant="contained"
                        color="warning"
                        onClick={() => handleDeletedTask(taskInfo.id)}
                      >
                        Delete
                      </Button>
                    </CardActions>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
