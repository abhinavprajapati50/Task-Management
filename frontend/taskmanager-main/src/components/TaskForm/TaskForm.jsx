import React, { useEffect, useState } from "react";
import DatePicker from "@mui/lab/DatePicker";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import TextField from "@mui/material/TextField";
import { Stack } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import useHistory from "react-router";
import { useNavigate, useParams } from "react-router-dom";
import "./Task_Form.css";
import axios from "axios";
import { toast } from "react-toastify";
import { allTaskGet, taskActions } from "../../New_Redux/Actions/getAllTask";
import { useDispatch } from "react-redux";
import { getAllTeamAction } from "../../New_Redux/Actions/TeamActions";
import { allProjectGet } from "../../New_Redux/Actions/projectActions";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { styled, Box } from "@mui/system";
import ModalUnstyled from "@mui/base/ModalUnstyled";

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

function TaskForm({open, setopen}) {
  const [dead_line, setdead_line] = useState(new Date());
  const [Assign_to, setAssign_to] = useState(null);
  const [task, setTask] = useState("");
  const [Alltask, setAlltask] = useState([]);
  const [description, setDescription] = useState("");
  const [teamData, setteamData] = useState([]);
  const [error, seterror] = useState("");
  const [allProjects, setallprojects] = useState([]);
  const [projectName, setprojectName] = useState(null);
  // const [open, setOpen] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const paramasId = useParams()
console.log("---=-=-=",paramasId);
  // let history = useHistory();

  const handleChange = (event) => {
    setAssign_to(event.target.value);
  };

  const handleDate = (newValue) => {
    console.log("0-0-0-0-0", newValue.toDateString());
    setdead_line(newValue.toDateString());
  };
  const handleAllTeam = async () => {
    const teamData = await dispatch(getAllTeamAction());

    // const teamData = await axios.get("http://localhost:5000/team");
    setteamData(teamData.payload);
  };

  const handleAllTask = async () => {
    const taskData = await dispatch(allTaskGet());
    setAlltask(taskData.payload);
  };

  const handleAllProject = async () => {
    const projectData = await dispatch(allProjectGet());
    console.log("--------projectData", projectData);
    setallprojects(projectData.payload);
  };

  const hnadleSubmit = async (e) => {
    debugger;
    e.preventDefault();
    const taskData = {
      task,
      description,
      dueDate: dead_line,
      Assign_to,
    };
    console.log("-----------=-=-=taskData-", taskData);
    if (!task || !description || !dead_line) {
      return toast.error("All Fields required !!");
    }
    try {
      const resultTask = await dispatch(taskActions(taskData));
      // const resultTask = await axios.post(taskApi, {
      //   task,
      //   description,
      //   dueDate: dead_line,
      //   Assign_to,
      // });
      console.log(resultTask);

      seterror(resultTask.payload);
      // resultTask.payload
      //   ? toast.success(resultTask.data.message) &&
      navigate("/task") && clearData();
      // : toast.error(resultTask.data.message);
      console.log("-=-=-=-=-=-=resultTask", resultTask);
    } catch (error) {
      toast.error(error.message);
      console.log(error.message || error);
    }
  };
  const handleModalToggle = () => setopen(!open);
  // const handleClose = () => setOpen(false);

  const clearData = () => {
    setdead_line("");
    setAssign_to("");
    setTask("");
    setDescription("");
  };
  useEffect(() => {
    handleAllTeam();
    handleAllTask();
    handleAllProject();
    // allProjectGet
  }, [task]);

  // console.log(
  // dead_line,
  //   Assign_to,
  //   task,
  //   description
  //   );
  console.log("=------------------=----------=-=", allProjects);

  return (
    <div>
      <div className="card_Body">
        <div className="ArrowBackIcon">
          <ArrowBackIcon onClick={() => navigate(-1)} />
        </div>
        <div className="container col-sm-12">
          <div className="addtaskform">
            <h4 className="mb-4">Add Task</h4>
            <div className="error"></div>
            <div className="addmodal">
              <StyledModal
                aria-labelledby="unstyled-modal-title"
                aria-describedby="unstyled-modal-description"
                open={open}
                onClose={handleModalToggle}
                BackdropComponent={Backdrop}
              >
                <Box sx={style}>
                  <form
                    action="/"
                    // method="post"
                    onSubmit={hnadleSubmit}
                  >
                    <div className="form-group">
                      <label for="title">Task</label>
                      <input
                        type="text"
                        className="form-control"
                        id="task"
                        aria-describedby="emailHelp"
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label for="description">Description</label>
                      <textarea
                        rows="4"
                        type="text"
                        className="form-control"
                        id="description"
                        aria-describedby="emailHelp"
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                      />
                    </div>
                    <div className="form-group">
                      <label for="dueDate">Due Date</label>

                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Stack spacing={3}>
                          <DesktopDatePicker
                            label="Date"
                            inputFormat="MM/dd/yyyy"
                            minDate={dead_line}
                            value={dead_line}
                            onChange={handleDate}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </Stack>
                      </LocalizationProvider>
                    </div>
                    <div>
                      <FormControl sx={{ minWidth: 385 }}>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="Date"
                          value={Assign_to}
                          onChange={handleChange}
                          // displayEmpty
                          defaultValue={null}
                          // inputProps={{ "aria-label": "Without label" }}
                        >
                          <MenuItem value={null}>
                            <em>None</em>
                          </MenuItem>

                          {teamData.map((allTeam) => (
                            <MenuItem value={allTeam.id}>
                              {allTeam.name}
                            </MenuItem>
                          ))}
                        </Select>
                        <FormHelperText>Assign to</FormHelperText>
                      </FormControl>
                      <FormControl sx={{ minWidth: 385 }}>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="Date"
                          value={projectName}
                          onChange={(e) => setprojectName(e.target.value)}
                          // displayEmpty
                          defaultValue={null}
                          // inputProps={{ "aria-label": "Without label" }}
                        >
                          <MenuItem value={null}>
                            <em>None</em>
                          </MenuItem>

                          {allProjects.map((allTeam) => (
                            <MenuItem value={allTeam.id}>
                              {allTeam.project}
                            </MenuItem>
                          ))}
                        </Select>
                        <FormHelperText>Select Project</FormHelperText>
                      </FormControl>
                    </div>

                    <Button type="submit" variant="contained">
                      Submit
                    </Button>
                  </form>
                </Box>
              </StyledModal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskForm;
