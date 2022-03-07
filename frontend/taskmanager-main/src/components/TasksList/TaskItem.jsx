import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
// import "./Taskcss/Task_Item.css";
import "./Taskcss/Task_Item.css"
import { useSelector } from "react-redux";

function TaskItem({ tasks, setisLoggedIN }) {
  const Loader = useSelector((state) => state.user.loading);

  console.log("-------------=-=-=-=Loader",Loader);
  setisLoggedIN(true)
  // console.log(borderColor);
  return (
    <div className="cardStyle">
      {Loader ? (
        <img src="./images/task.gif" alt="" width="100%" height="560vh" />
      ) : (
        <div>
          <div className="style">
            <div className="row col d-flex justify-content-center">
              {tasks.map((taskInfo) => (
                <div className="card_padding" key={taskInfo.id}>
                  <Card
                    className="card"
                    sx={{ width: 345, height: 300, padding: "1rem" }}
                  >
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {taskInfo.title}
                      </Typography>
                      <Typography gutterBottom variant="h5" component="div">
                        {taskInfo.dueDate}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {taskInfo.description}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        assignned to - {taskInfo.Assign}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      {taskInfo.completed == true && (
                        <Button variant="contained" color="success">
                          Complete
                        </Button>
                      )}
                      <Button variant="contained" color="warning">
                        Delete
                      </Button>
                    </CardActions>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskItem;
