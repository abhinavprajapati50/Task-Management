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
import { useNavigate, useLocation, useParams} from "react-router-dom";
import "../TaskForm/Task_Form.css";
// import "./Task_Form.css";
import axios from "axios";
import { toast } from "react-toastify";
import { allTaskGet, taskActions } from "../../New_Redux/Actions/getAllTask";
import { useDispatch } from "react-redux";
import { getAllTeamAction } from "../../New_Redux/Actions/TeamActions";
import { projectActions, projectUpdateSuccess } from "../../New_Redux/Actions/projectActions";

export const Project_Form = () => {
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();
  let locatioState = location.state == null;
  // if (locatioState) {
  //   navigate("/newproject")
  // }
  // console.log(locatioState);
  // let locatiopathname = location.pathname;
  // console.log(locatiopathname.includes("project/edit") );
  const [dead_line, setdead_line] = useState(
    locatioState 
    ? new Date() 
      :  location.state.update && location.state.data.dueDate
  );
  const [project, setProject] = useState(
    locatioState 
    ? "" 
      : location.state.update && location.state.data.project
  );
  const [description, setDescription] = useState(
    locatioState 
    ? ""
      : location.state.update && location.state.data.description
  );
  const [Alltask, setAlltask] = useState([]);
  const [teamData, setteamData] = useState([]);
  const [error, seterror] = useState("");
  
  const dispatch = useDispatch();
  const handleDate = (newValue) => {
    console.log("0-0-0-0-0", newValue.toDateString());
    setdead_line(newValue.toDateString());
  };
  const handleAllTeam = async () => {
    const teamData = await dispatch(getAllTeamAction());
    setteamData(teamData.payload);
  };

  const handleAllTask = async () => {
    const taskData = await dispatch(allTaskGet());
    setAlltask(taskData.payload);
  };

  const hnadleSubmit = async (e) => {
    e.preventDefault();
    const projectData = {
      id:params.id,
      project,
      description,
      dueDate: dead_line,
    };
    if (!project || !description || !dead_line) {
      return toast.error("All Fields required !!");
    }
    try {
      const resultTask =  locatioState ?  await dispatch(projectActions(projectData)) : await dispatch(projectUpdateSuccess(projectData))
      seterror(resultTask.payload);
      // resultTask.payload
      //   ? toast.success(resultTask.data.message) &&
      navigate("/project_list") && clearData();
      // : toast.error(resultTask.data.message);
      console.log("-=-=-=-=-=-=resultTask", resultTask);
    } catch (error) {
      toast.error(error.message);
      console.log(error.message || error);
    }
  };

  const clearData = () => {
    setdead_line(new Date());
    setProject("");
    setDescription("");
  };

  const handleEmptyState = () => {
      if (locatioState) {
       return clearData();
      }
  }
  useEffect(() => {
    handleAllTeam();
    handleAllTask();
    handleEmptyState()
  }, [location]);

  return (
    <div>
      <div className="card_Body">
        <div className="container col-sm-12">
          <div className="addtaskform">
            <h4 className="mb-4"> {locatioState ? "Add Project" : "Update Project"}</h4>
            <div className="error"></div>
            <form
              action="/"
              // method="post"
              onSubmit={hnadleSubmit}
            >
              <div className="form-group">
                <label for="title">Project Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="project"
                  name="project"
                  aria-describedby="emailHelp"
                  onChange={(e) => setProject(e.target.value)}
                  value={project}
                />
              </div>
              <div className="form-group">
                <label for="description">Project-Description</label>
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
