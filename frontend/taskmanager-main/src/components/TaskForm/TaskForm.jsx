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
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import useHistory from "react-router";
import { useNavigate } from "react-router-dom";
import "./Task_Form.css";
import axios from "axios";
import { taskApi } from "../Api/api";
import { toast } from "react-toastify";

function TaskForm() {
  const [dead_line, setdead_line] = useState(new Date());
  const [Assign_to, setAssign_to] = useState(null);
  const [task, setTask] = useState("");
  const [Alltask, setAlltask] = useState([]);
  const [description, setDescription] = useState("");
  const [teamData, setteamData] = useState([]);
  const [error, seterror] = useState("");
  const navigate = useNavigate();

  // let history = useHistory();

  const handleChange = (event) => {
    setAssign_to(event.target.value);
  };

  const handleDate = (newValue) => {
    console.log("0-0-0-0-0", newValue.toDateString());
    setdead_line(newValue.toDateString());
  };
  const handleAllTeam = async () => {
    const teamData = await axios.get("http://localhost:5000/team");
    setteamData(teamData.data.data);
  };

  const handleAllTask = async () => {
    const taskData = await axios.get("http://localhost:5000/task");
    // console.log(taskData.data.data);
    setAlltask(taskData.data.data);
  };

  const hnadleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resultTask = await axios.post(taskApi, {
        task,
        description,
        dueDate: dead_line,
        Assign_to,
      });
      seterror(resultTask.data.message);
      resultTask.data.data
        ? toast.success(resultTask.data.message) && navigate("/") && clearData()
        : toast.error(resultTask.data.message);
      console.log("-=-=-=-=-=-=resultTask", resultTask);
    } catch (error) {
      console.log(error.message || error);
    }
  };

  const clearData = () => {
    setdead_line("");
    setAssign_to("");
    setTask("");
    setDescription("");
  };
  useEffect(() => {
    handleAllTeam();
    handleAllTask();
  }, [task]);

  // console.log(
  // dead_line,
  //   Assign_to,
  //   task,
  //   description
  //   );

  return (
    <div>
      <div className="card_Body">
        <div className="container col-sm-12">
          <div className="addtaskform">
            <h4 className="mb-4">Add Task</h4>
            <div className="error"></div>
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
                <FormControl sx={{ minWidth: 270 }}>
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
              </div>

              <Button type="submit" variant="contained">
                Submit
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskForm;
