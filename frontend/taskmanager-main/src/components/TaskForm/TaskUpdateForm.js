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
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { taskUpdateSuccess } from "../../New_Redux/Actions/getAllTask";
import { getAllTeamAction } from "../../New_Redux/Actions/TeamActions";

export const TaskUpdateForm = () => {
  const { state } = useLocation();
  const [dead_line, setdead_line] = useState(state.dueDate);
  const [Assign_to, setAssign_to] = useState(state.Assign_to);
  const [task, setTask] = useState(state.task);
  const [description, setDescription] = useState(state.description);
  const [teamData, setteamData] = useState([]);
  const [taskSingleData, settaskSingleData] = useState(null);
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();

 
  const handleChange = (event) => {
    setAssign_to(event.target.value);
  };

  const handleDate = (newValue) => {
    console.log("0-0-0-0-0", newValue.toDateString());
    setdead_line(newValue.toDateString());
  };
  const handleAllTeam = async () => {
    const allTask = await dispatch( getAllTeamAction() )
    setteamData(allTask.payload);
  };

  

  const updateHandler = async (e) => {
    e.preventDefault();
    console.log("-------------updateHandler ---------task", state);
    const user = {
      id:state.id,
      task,
      description,
      dueDate: dead_line,
      Assign_to,
    };
    console.log(user);
    const updateData = await dispatch(taskUpdateSuccess(user));
    console.log("=================<<<<>>>>>", updateData);
    updateData
      ? toast.success(updateData) && navigate("/task") && clearData()
      : toast.error(updateData);
    console.log("-=-=-=-=-=-=resultTask", updateData);
    // } catch (error) {
    //   console.log(error.message || error);
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
    handleAllTeam();
    settaskSingleData(state);
  }, [task, Assign_to]);

  // console.log(
  //   "-----------",
  //   taskSingleData.task,
  //   taskSingleData.description,
  //   taskSingleData.dueDate,
  //   taskSingleData.Assign_to,
  // );
  return (
    <div>
      <div className="card_Body">
        <div className="arrow_back">
          <ArrowBackIcon onClick={() => navigate(-1)} />
        </div>
        <div className="container col-sm-14">
          <div className="addtaskform">
            <h4 className="mb-4">Update Task</h4>
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
                      <MenuItem value={allTeam.id} key={allTeam.id}>
                        {allTeam.name}{" "}
                      </MenuItem>
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
};
