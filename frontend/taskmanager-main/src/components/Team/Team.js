import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import "../Team/Team.css"

export const Team = ({ team }) => {
  const style = {
    display: "flex",
  };
  const cardStyle = {
    backgroundColor: "red",
    // backgroundColor: "#ccd7b7",
    width: "100%",
    height: "100vh",
  };

  const showTaskHandler = (id) => {
    console.log("taskHadnler", id);
  };

  return (
    <div  className="card_Styles">
      <div >
        <div >
          <div className="row col d-flex justify-content-center">
            {team.map((team) => (
              <div className="card_padding">
                <Card
                  sx={{ width: 345 }}
                  // style={{ padding: "1rem" }}
                  className="card_padding"
                  key={team.id}
                >
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {team.name}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                      {team.gender}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {team.work}
                    </Typography>
                    <Link to={`/team/${team.id}`}>
                      <Button>View</Button>
                    </Link>

                    <Link to={`/task/${team.id}`}>
                      <Button onClick={() => showTaskHandler(team.id)}>
                        Task Details
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
