import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { ToastContainer, toast } from "react-toastify";

import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
// import "./Taskcss/Task_Item.css";
import "../TasksList/Taskcss/Task_Item.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import { useLocation } from "react-router-dom";

import { allProjectGet } from "../../New_Redux/Actions/projectActions";
// import { TaskUpdateForm } from "../TaskForm/TaskUpdateForm";

export const Project_List = ({ setisLoggedIN, setloader }) => {
  // debugger
  const [allTaskData, setallTaskData] = useState([]);
  const [completedTaskState, setcompletedTaskState] = useState(null);
  const [deletedTaskState, setDeletedTaskState] = useState(null);
  const navgate = useNavigate();
    const dispatch = useDispatch();

  setisLoggedIN(true);
  const allTaskFuncHandler = async () => {
    const allTask = await dispatch(allProjectGet());
    console.log(allTask);
    setloader(false);
    setallTaskData(allTask.payload);
  };

  const handleDateDDMMYYFormat = (date) => {
    let theDate = new Date(Date.parse(date));
    return theDate.toLocaleDateString();
  };

  const editHandler = async (data) => {
    console.log("dsffffadfs");
    return navgate(`/project/edit/${data.id}`, { state: {data, update: true}});
  };
    
    const viewHandler = async (data) => {
      console.log(data);
      return navgate(`/project/add-task/${data.id}`, { state: data });

        // const viewTaskRelatedProject = await dispatch()
  };

  useEffect(async () => {
    allTaskFuncHandler();
    setloader(false);
  }, [completedTaskState]);
  return (
    <div className="cardStyle">
      {/* {Loader ? (
        <img src="./images/task.gif" alt="" width="100%" height="560vh" />
      ) : ( */}
      <div>
        <div className="style">
          <div className="row col d-flex justify-content-center">
            {allTaskData.map((taskInfo) => (
              <div className="card_padding" key={taskInfo.id}>
                <Card
                  className="card"
                  sx={{ width: 345, height: 300, padding: "1rem" }}
                >
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {taskInfo.project}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                      {handleDateDDMMYYFormat(taskInfo.dueDate)}
                    </Typography>
                    {/* { console.log(taskInfo.team.id) } */}
                    <Typography variant="body2" color="text.secondary">
                      {taskInfo.description}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                    ></Typography>
                  </CardContent>
                  <CardActions>
                    {/* {taskInfo.completed == true && ( */}

                    <Button
                      variant="contained"
                      onClick={() => editHandler(taskInfo)}
                    >
                      Edit
                      <EditIcon />
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => viewHandler(taskInfo)}
                    >
                      Task
                    </Button>
                    {/* </Link> */}
                  </CardActions>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
