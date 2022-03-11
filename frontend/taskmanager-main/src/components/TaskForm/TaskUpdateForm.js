import React, { useEffect, useState } from "react";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import TextField from "@mui/material/TextField";
import { Stack } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import useHistory from "react-router";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import "./Task_Form.css";
import axios from "axios";
import { taskApi } from "../Api/api";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

export const TaskUpdateForm = () => {
  const { pathname } = useLocation();
  const singleTask = useSelector((state) => state.user.currentUser);

  console.log("singleTask", singleTask);

  const [dead_line, setdead_line] = useState(singleTask.dueDate);
  const [Assign_to, setAssign_to] = useState(singleTask.Assign_to);
  const [task, setTask] = useState(singleTask.task);
  const [description, setDescription] = useState(singleTask.description);
  const [teamData, setteamData] = useState([]);
  const [taskData, setTaskData] = useState([]);
  const [updatedData, setupdatedData] = useState(false);
  const [taskSingleData, settaskSingleData] = useState(null);
  const navigate = useNavigate();
  const params = useParams();

  const userId = pathname.replace("/edit-user/", "");

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
    setTaskData(taskData.data.data);
  };
  const updateHandler = async (e) => {
    e.preventDefault();
    try {
      const updateTask = await axios.put(
        `http://localhost:5000/task/edit/${taskSingleData.id}`,
        {
          task,
          description,
          dueDate: dead_line,
          Assign_to,
        }
      );

      if (updateTask) {
        toast.success("Updatede successfully");
      }
      setupdatedData(updateTask);
      navigate("/");
      console.log(updateTask);
      // seterror(resultTask.data.message);
      // resultTask.data.data
      //   ? toast.success(resultTask.data.message) && navigate("/") && clearData()
      //   : toast.error(resultTask.data.message);
      // console.log("-=-=-=-=-=-=resultTask", resultTask);
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

  // const selectorNullHandler = () => {
  //   console.log(params.id);
  //   console.log(
  //     "--------------=-=-=-=-=-=--",
  //     taskData.map((curData) => curData.id)
  //   );
  //   if (singleTask == null) {
  //   }
  // };
  // console.log(taskData.map(curData => curData))

  // console.log(taskSingleData);

  useEffect(() => {
    // const nullData = singleTask==null
    // nullData &&
    console.log(singleTask === null);
    if (!singleTask === null) {
      return navigate("/");
    } else {
      handleAllTask();
      settaskSingleData(singleTask);
      handleAllTeam();
    }
  }, [task, updatedData]);
  return (
    <div>
      <div className="card_Body">
        <div className="container col-sm-8 " className="addtaskform">
          <h4 className="mb-4">Add Task</h4>
          <div className="error"></div>
          <form
            action="/"
            // method="post"
            onSubmit={updateHandler}
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
                    minDate={new Date()}
                    value={dead_line}
                    onChange={handleDate}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Stack>
              </LocalizationProvider>
            </div>
            <div>
              <FormControl sx={{ m: 1, minWidth: 410 }}>
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
  );
};
