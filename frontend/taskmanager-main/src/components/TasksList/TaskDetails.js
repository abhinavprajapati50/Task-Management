import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./Taskcss/Task_Details.css";
import axios from "axios";
import { joinTeamTaSk, taskApi, teamApi } from "../Api/api";

export const TaskDetails = () => {
  const [allTasks, setallTasks] = useState([]);
  const [allTeamsMembers, setallTeamsMembers] = useState([]);
  const [allT, setallT] = useState([]);
  const [assignTaskName, setassignTaskName] = useState("");
  const [subTasks, setsubTasks] = useState([]);
  const [teamName, setteamName] = useState("");
  const paramas = useParams();
  const navigate = useNavigate();
  // console.log("--------",allTasks);

  const getAllUser = async () => {
    const allTask = await axios.get(taskApi);
    setallTasks(allTask.data.data);
  };
  // console.log(allTasks, allTeamsMembers);

  const getAllTeamMembers = async () => {
    const allTeams = await axios.get(
      `http://localhost:5000/joinTeamTaSk/${paramas.id}`
    );
    // const allTeams = await axios.get(joinTeamTaSk);
    const itemSubData = allTeams.data.data.map((data) => data.tasks);
    console.log(itemSubData[0].map((cur) => cur));
    setsubTasks(itemSubData[0]);
    setallT(allTeams.data.data);

    setallTeamsMembers(allTeams.data.data);
  };

  const assignTaskNameFunc = async () => {
    const assignedName = await axios.get(
      `http://localhost:5000/team/${paramas.id}`
    );
    setassignTaskName(assignedName.data.data.name);
    setteamName();

    console.log("<<<<------------", assignedName.data.data.name);
  };

  const handleDateDDMMYYFormat = (date) => {
    let theDate = new Date(Date.parse(date));
    return theDate.toLocaleDateString();
  };

  useEffect(() => {
    getAllUser();
    getAllTeamMembers();
    assignTaskNameFunc();
  }, [assignTaskName]);
  console.log(assignTaskName);
  return (
    <>
      {console.log("Hello From My side")}
      <div className="card_body">
        <div className="arrow_back">
          <ArrowBackIcon onClick={() => navigate(-1)} />
        </div>
        <div className="row col d-flex justify-content-center">
          {subTasks.length > 0 ? (
            subTasks.map((currentTask) => (
              <>
                <div className="padding_card">
                  <Card
                    sx={{ width: 345, height: 200, padding: 1 }}
                    className="card"
                  >
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {currentTask.task}
                      </Typography>
                      <Typography gutterBottom variant="h5" component="div">
                        {handleDateDDMMYYFormat(currentTask.dueDate)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {currentTask.description}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        assign to - <strong>{assignTaskName} </strong>
                      </Typography>
                    </CardContent>
                    {/* <CardActions>
                  <Button variant="contained" color="success">
                    Complete
                    </Button>
                    <Button variant="contained" color="warning">
                    Delete
                    </Button>
                  </CardActions> */}
                  </Card>
                </div>
              </>
            ))
          ) : (
            <h1>No Task Found !!...</h1>
          )}
        </div>
        {/* </div> */}
      </div>
    </>
  );
};
