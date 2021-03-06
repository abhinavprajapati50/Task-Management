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
import   jwt_decode  from  "jwt-decode";

import FormLabel from "@mui/material/FormLabel";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  deleteTeamMemberAction,
  getAllTeamAction,
  getJoinTeamTaskAction,
  getSingleTeamMemberAction,
  teamActions,
} from "../../New_Redux/Actions/TeamActions";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { projectRealatedTaskAction } from "../../New_Redux/Actions/projectActions";
import { useParams } from "react-router-dom";

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
  // const [singleTeam, setSingleTeam] = useState(false);
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("");
  const [role, setRole] = useState("");
  const [roleData, setRoleData] = useState(null);
  const [team, setteam] = useState([]);
  const [deleteTeam, setDeleteTeam] = useState(null);
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const { id } = useParams();
  const [singleTeamMemberModal, setsingleTeamMemberModal] = useState(false);
  const [singleTeamMemberData, setsingleTeamMemberData] = useState([]);

  const paramsId = id;

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    clearState();
  };
  const showTaskHandler = async (id) => {
    console.log("taskHadnler", id);
    const Tasks = await getJoinTeamTaskAction(id);
    console.log("==============Tasks", Tasks);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ fullName, gender, projectId: paramsId });
    const teamDatas = {
      name: fullName,
      gender,
      work: role,
      projectId: paramsId,
    };
    if (!fullName || !gender || !role) {
      return toast.error("All Field required !!");
    }

    const result = await dispatch(teamActions(teamDatas));
    console.log("-------------result", result);

    clearState();
    console.log(result);
    handleClose();
  };
  const toggleSingleTeamMember = () => {
    setsingleTeamMemberModal(!singleTeamMemberModal);
  };

  const singleUserHandler = async (teamId) => {
    // toggleSingleTeamMember()
    const singleUser = await dispatch(getSingleTeamMemberAction(teamId));
    setsingleTeamMemberModal(true);
    console.log(singleUser.payload);
    setsingleTeamMemberData(singleUser.payload);

    // navigate(`/team/${singleUser.payload.id}`);
  };
  // console.log("-------------=-=-=singleUser", singleTeamMemberData);

  const handleDeleteTeam = async (team) => {
    console.log(team);
    try {
      const deletedTeam = await dispatch(deleteTeamMemberAction(team));
      // let deletedTask = await axios.put(
      //   `http://localhost:5000/task/deletedtask/${task.id}`
      // );
      console.log(deletedTeam);
      setDeleteTeam(deletedTeam);
      if (deletedTeam) {
        return toast.dismiss("task is deletedTeam successfully");
      }
      // navgate("/task");
      return deletedTeam;
    } catch (error) {
      console.log(error || error.message);
    }
  };
  

  const clearState = (e) => {
    setFullName("");
    setGender("");
    setRole("");
  };

  const AllTeamUser = async (e) => {
    const allTeams = await dispatch(getAllTeamAction());
    const allTask = await dispatch(projectRealatedTaskAction({ id: paramsId }));
    console.log("------------->>>-", roleData);
    const localStorageData = localStorage.getItem("token")
    const jwtDecodeData = jwt_decode(localStorageData)
    setRoleData(jwtDecodeData.role);
    setteam(allTask.payload.teams);
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
    // singleUserHandler();
  }, [fullName, deleteTeam]);

  return (
    <div className="card_Styles">
      {roleData == 1 && (
        <Fab aria-label="Add" color="primary">
          {/* {fab.icon} */}
          <AddIcon onClick={handleOpen} />
        </Fab>
      )}
      <div>
        <StyledModal
          aria-labelledby="unstyled-modal-titles"
          aria-describedby="unstyled-modal-description"
          open={singleTeamMemberModal}
          onClose={toggleSingleTeamMember}
          BackdropComponent={Backdrop}
        >
          <Box sx={style}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                <h1>{singleTeamMemberData.name}</h1>
              </Typography>
              <Typography gutterBottom variant="h5" component="div">
                <h2>{singleTeamMemberData.gender}</h2>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <h1> {singleTeamMemberData.work}</h1>
              </Typography>
            </CardContent>
            <Button onClick={toggleSingleTeamMember}>Cancel</Button>
            {/* {singleTeamMemberData} */}
          </Box>
        </StyledModal>
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
                      variant="contained"
                    >
                      View
                    </Button>
                    {/* </Link> */}

                    <Link to={`/task/${team.id}`}>
                      <Button variant="contained" color="secondary" onClick={() => showTaskHandler(team.id)}>
                        Task Details
                      </Button>
                    </Link>
                      {roleData == 1 &&  <Button variant="contained" color="error" onClick={() => handleDeleteTeam(team)}>
                        Delete
                      </Button>}
                  </CardContent>
                </Card>
              </div>
            ))}
            {team <= 0 && (
              <>
                {" "}
                <h2 style={{ color: "red" }}>No Team Member Found !!</h2>
                <h3 style={{ color: "gray" }}> Please add the Team Member</h3>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
