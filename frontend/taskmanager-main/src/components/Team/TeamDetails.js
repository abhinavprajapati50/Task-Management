import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./Team_Details.css";
import axios from "axios";
import { teamApi } from "../Api/api";

export const TeamDetails = () => {
  const paramas = useParams();
  const navigate = useNavigate();
  const [allUser, setallUser] = useState([]);

  const getAllUser = async () => {
    const allTeams = await axios.get(teamApi);
    setallUser(allTeams.data.data);
  };
  useEffect(async () => {
    getAllUser();
  }, []);

  // console.log(paramas.id);

  return (
    <div className="card_color">
      <div className="arrow_back">
        <ArrowBackIcon onClick={() => navigate(-1)} />
      </div>
      <div className="row col d-flex justify-content-center">
        {allUser.map((team) =>
          team.id == paramas.id ? (
            <Card
              sx={{ width: 445, height: 345 }}
              style={{ paddingTop: "2rem", marginTop: "10%" }}
              key={team.id}
            >
              {/* {console.log("--------=-=",team)} */}
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
