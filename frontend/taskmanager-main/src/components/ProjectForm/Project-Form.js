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
import { useNavigate, useLocation, useParams } from "react-router-dom";
import "../TaskForm/Task_Form.css";
// import "./Task_Form.css";
import axios from "axios";
import { toast } from "react-toastify";
import { allTaskGet, taskActions } from "../../New_Redux/Actions/getAllTask";
import { useDispatch } from "react-redux";
import { getAllTeamAction } from "../../New_Redux/Actions/TeamActions";
import { styled, Box } from "@mui/system";
import ModalUnstyled from "@mui/base/ModalUnstyled";

import {
  allProjectGet,
  projectActions,
  projectUpdateSuccess,
} from "../../New_Redux/Actions/projectActions";

export const Project_Form = ({ open, setopen, isediting, editData }) => {
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();
  let locatioState = location.state == null;
  const [dead_line, setdead_line] = useState(
    editData ? editData.dueDate : new Date()
  );
  const [project, setProject] = useState(editData ? editData.project : "");
  const [description, setDescription] = useState(
    editData ? editData.description : ""
  );
  const [Alltask, setAlltask] = useState([]);
  const [teamData, setteamData] = useState([]);
  const [error, seterror] = useState("");
  const [projectData, setprojectData] = useState([]);
  const [projectRole, setprojectRole] = useState(null)
  
  const dispatch = useDispatch();
  const handleDate = (newValue) => {
    console.log("0-0-0-0-0", newValue.toDateString());
    setdead_line(newValue.toDateString());
  };
  const handleAllTeam = async () => {
    const teamData = await dispatch(getAllTeamAction());
    setteamData(teamData.payload);
    const projects = await dispatch(allProjectGet());
    console.log("--------projectData", projects.payload);
    
    setprojectData(projects.payload);
  };
  
  const handleAllProject = async () => {
    // setprojectRole
    // console.log("(((((((((((((((((((((((", projectData[0].signUpUser.role);

  
  };


  const handleAllTask = async () => {
    const taskData = await dispatch(allTaskGet());
    setAlltask(taskData.payload);
  };

  const hnadleSubmit = async (e) => {
    e.preventDefault();
    debugger;
    const projectData = {
      project,
      description,
      dueDate: dead_line,
    };
    console.log(projectData);
    if (!project || !description || !dead_line) {
      return toast.error("All Fields required !!");
    }
    try {
      // console.log({ projectData, id: editData.id });
      const resultTask = editData
      ? await dispatch(
        projectUpdateSuccess({
              project,
              description,
              dueDate: dead_line,
              id: editData.id,
            })
          )
        : await dispatch(projectActions(projectData));
      seterror(resultTask.payload);
      // resultTask.payload
      //   ? toast.success(resultTask.data.message) &&
      setopen(false);
      navigate("/project_list") && clearData();
      // : toast.error(resultTask.data.message);
      console.log("-=-=-=-=-=-=resultTask", resultTask);
    } catch (error) {
      toast.error(error.message);
      console.log(error.message || error);
    }
  };
  
  const clearData = () => {
    // console.log("*********************",  projectData);
    setdead_line(new Date());
    setProject("");
    setDescription("");
  };

  const handleEmptyState = () => {
    if (locatioState) {
      return clearData();
    }
  };

  console.log(projectData);
  useEffect(() => {
    handleAllTeam();
    handleAllProject()
    // handleAllTask();
    // handleEmptyState();
  }, [open, projectData.length]);
  // }, [location, editData, open]);

  return (
    <div>
      <div className="card_Body">
        <div className="container">
          <div className="addtaskform">
            <h4 className="mb-4">
              {" "}
              {editData ? "Update Project" : "Add Project"}
            </h4>
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
              <Button
                variant="contained"
                // onClick={ setopen(!open) }
                onClick={locatioState ? () => setopen(!open) : navigate(-1)}
              >
                Cancel
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
