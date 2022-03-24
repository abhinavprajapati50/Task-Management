import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import "../Team/Team.css";
import { makeStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { styled, Box } from "@mui/system";
import ModalUnstyled from "@mui/base/ModalUnstyled";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";
import { useTheme } from "@mui/material/styles";

import FormLabel from "@mui/material/FormLabel";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  getAllTeamAction,
  getSingleTeamMemberAction,
  teamActions,
} from "../../New_Redux/Actions/TeamActions";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(2),

    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "300px",
    },
    "& .MuiButtonBase-root": {
      margin: theme.spacing(2),
    },
  },
}));

const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled("div")`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
  width: 500,
  height: 400,
  // bgcolor: "background.paper",
  bgcolor: "white",
  border: "2px solid #000",
  p: 3,
  px: 4,
  pb: 3,
};
const fabStyle = {
  position: "absolute",
  bottom: 206,
  right: 16,
};

export const Team = () => {
  const theme = useTheme();

  const [open, setOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("");
  const [role, setRole] = useState("");
  const [team, setteam] = useState([]);
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(0);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    clearState();
  };
  const showTaskHandler = async (id) => {
    console.log("taskHadnler", id);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    debugger;
    console.log(fullName, gender);
    const teamDatas = {
      name: fullName,
      gender,
      work: role,
    };
    if (!fullName || !gender) {
      return toast.error("All Field required !!");
    }

    const result = await dispatch(teamActions(teamDatas));
    console.log("-------------result", result);

    clearState();
    console.log(result);
    handleClose();
  };

  const singleUserHandler = async (teamId) => {
    const singleUser = await dispatch(getSingleTeamMemberAction(teamId));
    navigate(`/team/${singleUser.payload.id}`);
  };

  const clearState = (e) => {
    setFullName("");
    setGender("");
    setRole("");
  };

  const AllTeamUser = async (e) => {
    const allTask = await dispatch(getAllTeamAction());
    setteam(allTask.payload);
  };
  const fabs = [
    {
      color: "primary",
      sx: fabStyle,
      icon: <AddIcon />,
      label: "Add",
    },
    {
      color: "secondary",
      sx: fabStyle,
      icon: <AddIcon />,
      // icon: <EditIcon />,
      //   icon: <UpIcon />,
      label: "Add",
    },
    
  ];

  useEffect(async () => {
    AllTeamUser();
  }, [fullName]);

  return (
    <div className="card_Styles">
      <div>
        <div className="add_button">
          {/* <Button onClick={handleOpen} variant="contained" color="primary">
            {" "}
            Add Team-Member
          </Button> */}
        </div>
        <div className="addmodal">
          <StyledModal
            aria-labelledby="unstyled-modal-title"
            aria-describedby="unstyled-modal-description"
            open={open}
            // onClose={handleClose}
            BackdropComponent={Backdrop}
          >
            <Box sx={style}>
              <h4 id="unstyled-modl-title" className="unstyled_Add_team_text">
                Add Team-Member
              </h4>
              <form className={classes.root} onSubmit={handleSubmit}>
                <FormControl component="fieldset">
                  <TextField
                    label="Full Name"
                    variant="filled"
                    // required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                  {/* <FormControl component="fieldset"> */}
                  {/* <FormLabel component="legend">Gender</FormLabel> */}
                  <RadioGroup
                    row
                    aria-label="gender"
                    name="row-radio-buttons-group"
                    onChange={(e) => setGender(e.target.value)}
                    value={gender}
                  >
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
                  </RadioGroup>
                  {/* </FormControl> */}
                  <TextField
                    label="Role"
                    variant="filled"
                    // required
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  />

                  <div>
                    <Button variant="contained" onClick={handleClose}>
                      Cancel
                    </Button>
                    <Button type="submit" variant="contained" color="primary">
                      Add Team-Member
                    </Button>
                  </div>
                </FormControl>
              </form>
            </Box>
          </StyledModal>
        </div>
        <div>
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
                    {/* <Link to={`/team/${team.id}`}> */}
                    <Button
                      onClick={() => {
                        singleUserHandler(team.id);
                      }}
                    >
                      View
                    </Button>
                    {/* </Link> */}

                    <Link to={`/task/${team.id}`}>
                      <Button onClick={() => showTaskHandler(team.id)}>
                        Task Details
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            ))}
           
          <Fab sx={fabStyle} aria-label="Add" color="primary">
                  {/* {fab.icon} */}
                  <AddIcon onClick={handleOpen} />
          </Fab>
        
          </div>
        </div>
      </div>
    </div>
  );
};
