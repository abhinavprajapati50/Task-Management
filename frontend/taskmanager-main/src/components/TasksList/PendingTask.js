import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
export const PendingTask = ({ tasks }) => {
    const cardStyle = {
        backgroundColor: "#ccd7b7",
        width: "100%",
        height: "100%",
      };
      const style = {
        display: "flex",
      };
    
  return (
    <div style={cardStyle}>
      <div >
        <div style={style}>
          <div className="row col d-flex justify-content-center">
            {tasks.map((taskInfo) => (
              
              taskInfo.completed==false && <div style={{padding:"1rem"}} key={taskInfo.id}>
                <Card sx={{ width: 345, height:300, padding: "1rem" }}  >
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
                    <Button variant="contained" color="success">
                      Complete
                    </Button>
                    <Button variant="contained" color="warning">
                      Delete
                    </Button>
                  </CardActions>
                </Card>
              </div>
            ))
            }
          </div>
        </div>
      </div>
    </div>
  );
};
