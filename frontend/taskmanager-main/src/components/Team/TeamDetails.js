import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";

export const TeamDetails = ({ team }) => {
  const paramas = useParams();
  console.log(paramas.id);
  console.log(team);

  const cardcolor = {
    backgroundColor: "#ccd7b7",
    width: "100%",
    height: "100%",
    height: "100vh",
    
  };
  return (
    // <div>
    //   {team.map(
    //     (team) => team.id === paramas.id && <div><h1>{team.name}</h1></div>
    //   )}
    // </div>
    <div style={cardcolor}>
      <div className="row col d-flex justify-content-center">
        {team.map((team) =>
          team.id === paramas.id ? (
            <Card
              sx={{ width: 445, height: 345 }}
              style={{ paddingTop: "2rem", marginTop:'10%' }}
              key={team.id}
            >
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  <h1>{team.name}</h1>
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                  <h2>{team.gender}</h2>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <h1> {team.work}</h1>
                </Typography>
              </CardContent>
            </Card>
          ) : (
            ""
          )
        )}
      </div>
    </div>
  );
};
