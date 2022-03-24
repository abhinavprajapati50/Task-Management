import React from "react";
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
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { allTaskGet, taskActions } from "../../New_Redux/Actions/getAllTask";
import { useEffect } from "react";
import { getAllTeamAction } from "../../New_Redux/Actions/TeamActions";
import { allProjectGet } from "../../New_Redux/Actions/projectActions";
import Button from "@mui/material/Button";

export const TaskModal = ({ open, setopen }) => {
  const navigate = useNavigate();
  const [dead_line, setdead_line] = useState(new Date());
  const [Assign_to, setAssign_to] = useState(null);
  const [task, setTask] = useState("");
  const [Alltask, setAlltask] = useState([]);
  const [description, setDescription] = useState("");
  const [teamData, setteamData] = useState([]);
  const [error, seterror] = useState("");
  const [allProjects, setallprojects] = useState([]);
  const [projectName, setprojectName] = useState(null);
    const dispatch = useDispatch();
    const {id} = useParams()
    console.log("---=-=-=",id);

  const hnadleSubmit = async (e) => {
    debugger;
    e.preventDefault();
    const taskData = {
      task,
      description,
      dueDate: dead_line,
      Assign_to,
      project_name: projectName,
    };
    console.log("-----------=-=-=taskData-", taskData);
    if (!task || !description || !dead_line) {
      return toast.error("All Fields required !!");
    }
    try {
      const resultTask = await dispatch(taskActions(taskData));
      console.log(resultTask);

      seterror(resultTask.payload);
      // resultTask.payload
      //   ? toast.success(resultTask.data.message) &&
        navigate(`/project/add-task/${id}`) && clearData();
        setopen(false)
      // : toast.error(resultTask.data.message);
      console.log("-=-=-=-=-=-=resultTask", resultTask);
    } catch (error) {
      toast.error(error.message);
      console.log(error.message || error);
    }
  };

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
    setallprojects(projectData.payload);
  };

  const clearData = () => {
    setdead_line("");
    setAssign_to("");
    setTask("");
    setDescription("");
  };
  console.log("________",Alltask.length);
  useEffect(() => {
    handleAllTeam();
    handleAllTask();
    handleAllProject();
    // allProjectGet
  }, [task, description]);

  return (
    <div>
      {" "}
      <h1> Add Task</h1>
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
          <FormControl sx={{ minWidth: 515 }}>
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
                <MenuItem value={allTeam.id}>{allTeam.name}</MenuItem>
              ))}
            </Select>
            <FormHelperText>Assign to</FormHelperText>
          </FormControl>
          <FormControl sx={{ minWidth: 515 }}>
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
                <MenuItem value={allTeam.id}>{allTeam.project}</MenuItem>
              ))}
            </Select>
            <FormHelperText>Select Project</FormHelperText>
          </FormControl>
        </div>

        <Button type="submit" variant="contained">
          Submit
        </Button>
        <Button type="button" style={{marginLeft: "1rem"}}  variant="contained" onClick={() => setopen(false)}>
          Cancel
        </Button>
      </form>
    </div>
  );
};
