import React from "react";
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export const TaskDetails = ({ tasks }) => {
  const paramas = useParams();
  //   console.log(paramas.id);
  //   console.log(
  //     tasks.map(
  //       (currentTask) => currentTask.id === paramas.id && console.log(currentTask)
  //     )
  //   );
  const style = {
    // backgroundColor: "#ececff",
    display: "block",
    justifyContent: "center",
    alignItems: "center",
  };

  const cardcolor = {
    display: "flex",
    backgroundColor: "#ccd7b7",
    width: "100%",
    height: "100%",
    // height: "100vh",
  };

  const styleFlex = {
    display: "flex",
  };

  return (
    <div style={cardcolor}>
      <div style={styleFlex}>
        <div className="row col d-flex justify-content-center">
          {tasks.map(
            (currentTask) =>
              currentTask.teamId === paramas.id && (
                <div style={{ padding: "1rem" }}>
                  <Card
                    sx={{ width: 345, height: 300, padding: 1 }}
                    style={style}
                  >
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {currentTask.title}
                      </Typography>
                      <Typography gutterBottom variant="h5" component="div">
                        {currentTask.dueDate}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {currentTask.description}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        assignned to - {currentTask.Assign}
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
                  </Card>{" "}
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
};
