import React from "react";
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

export const TaskDetails = ({ tasks }) => {
  const paramas = useParams();
  const navigate = useNavigate();

  return (
    <div className="card_body">
      <div className="arrow_back">
        <ArrowBackIcon onClick={() => navigate(-1)} />
      </div>
      <div className="flex_card">
        <div className="row col d-flex justify-content-center">
          {tasks.map(
            (currentTask) =>
              currentTask.teamId === paramas.id && (
                <div className="padding_card">
                  <Card
                    sx={{ width: 345, height: 300, padding: 1 }}
                    className="card"
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
                  </Card>
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
};
