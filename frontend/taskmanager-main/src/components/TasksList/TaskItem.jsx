import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { ToastContainer, toast } from "react-toastify";

import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "../TasksList/Taskcss/Task_Item.css";
// import "./Taskcss/Task_Item.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { styled, Box } from "@mui/system";
import ModalUnstyled from "@mui/base/ModalUnstyled";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import MenuItem from "@mui/material/MenuItem";
// import { loginReducer } from "./Reducers/LoginReducers";
import jwt_decode from "jwt-decode";

// ---------
import { allTaskGet, taskActions } from "../../New_Redux/Actions/getAllTask";

import {
  getDeletedTask,
  completedTaskAction,
} from "../../New_Redux/Actions/getAllTask";
import TaskForm from "../TaskForm/TaskForm";
import { NavLink } from "react-router-dom";
import { TaskModal } from "./TaskModal";
import {
  projectRealatedTaskAction,
  projectUpdateSuccess,
} from "../../New_Redux/Actions/projectActions";
// import { TaskUpdateForm } from "../TaskForm/TaskUpdateForm";

const fabStyle = {
  position: "fixed",
  top: 120,
  // bottom: 400,
  // right:500
  // left: 50
};

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
  width: 600,
  height: 500,
  // bgcolor: "background.paper",
  bgcolor: "white",
  border: "2px solid #000",
  overflow: "scroll",
  p: 5,
  px: 4,
  pb: 3,
};

function TaskItem({ setisLoggedIN, setloader }) {
  // debugger
  const { formState } = useForm();
  const { errors } = formState;
  const [allTaskData, setallTaskData] = useState([]);
  const [completedTaskState, setcompletedTaskState] = useState(null);
  const [deletedTaskState, setDeletedTaskState] = useState(null);
  const [Alltask, setAlltask] = useState([]);
  const [selected, setSelected] = useState(5);
  const [roleData, setroleData] = useState(null);
  const [selectedData, setSelectedData] = useState([]);
  let [status, setstatus] = useState(0);

  // const [loader, setloader] = useState(false);
  let [editTask, seteditTask] = useState(false);
  const [editTaskData, seteditTaskData] = useState(null);
  const navgate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const paramsId = id;
  // console.log("=============selected", selected);
  console.log("=============roleData", roleData);

  const [open, setopen] = useState(false);

  const allTaskFuncHandler = async () => {
    // editTask
    const allTask = await dispatch(projectRealatedTaskAction({ id: paramsId }));
    // ? await projectUpdateSuccess(editTaskData)
    // setloader(false);
    setallTaskData(allTask.payload.tasks);
    let tasksData = allTask.payload.tasks;
    console.log("------------------name of tasks", tasksData);
    let taskFilters = tasksData.length >0 ? tasksData.filter((curTask) => curTask.status == selected ): null
    setSelectedData(taskFilters);
    console.log("------------------name of tasks", taskFilters);
  };

  const handleDateDDMMYYFormat = (date) => {
    let theDate = new Date(Date.parse(date));
    return theDate.toLocaleDateString();
  };

  const handleCompletedTask = async (task) => {
    console.log(task);
    try {
      const completedTask = dispatch(completedTaskAction(task));
      // let completedTask = await axios.put(
      //   `http://localhost:5000/task/completed/${task.id}`
      // );
      console.log(completedTask);
      // setloader(false);
      setcompletedTaskState(completedTask);
      if (completedTask) {
        setstatus(4);
        toast.success("task is completed successfully");
      }
      navgate("/completedtask");
      return completedTask;
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeletedTask = async (task) => {
    console.log(task);
    try {
      const deletedTask = await dispatch(getDeletedTask(task));
      // let deletedTask = await axios.put(
      //   `http://localhost:5000/task/deletedtask/${task.id}`
      // );
      console.log(deletedTask);
      setDeletedTaskState(deletedTask);
      if (deletedTask) {
        return toast.dismiss("task is deletedTask successfully");
      }
      // navgate("/task");
      return deletedTask;
    } catch (error) {
      console.log(error || error.message);
    }
  };

  const editHandler = async (data) => {
    console.log("dsffffadfs", data);
    setopen(!open);
    seteditTask(true);
    seteditTaskData(data);
    // return navgate(`/edit/${data.id}`, { state: data });
  };

  const handleAllTask = async () => {
    const taskData = await dispatch(allTaskGet());
    const localStorageData = localStorage.getItem("token");
    const jwtDecodeData = jwt_decode(localStorageData);
    console.log("---------------------", jwtDecodeData.role);
    setroleData(jwtDecodeData.role);

    setAlltask(taskData.payload);
  };

  // const dataHandler = () => {
  //   selectedData.map((taskInfo) =>
  //     console.log("=====================", taskInfo, selected)
  //   );
  //   // taskInfo.status == selected   )
  // };

  const handleModalToggle = () => setopen(true);

  useEffect(async () => {
    // setisLoggedIN(true);
    handleAllTask();
    allTaskFuncHandler();
    // dataHandler();

    // const localStoragedata = localStorage.getItem("token")
    // console.log("=-----------");
    // console.log(localStoragedata);

    // handleAllTeam();
    // handleAllTask();

    // handleAllProject();
    // allProjectGet
    // setloader(false);
  }, [completedTaskState, open, selected]);
  console.log(allTaskData.length);
  const taskStatus = [
    { label: "Not-Assign", value: 0 },
    { label: "Pending", value: 1 },
    { label: "In-Progress", value: 2 },
    { label: "In-Review", value: 3 },
    { label: "Completed", value: 4 },
    { label: "All-Tasks", value: 5 },
  ];
  return (
    <div className="cardStyle">
      {/* {Loader ? (
        <img src="./images/task.gif" alt="" width="100%" height="560vh" />
      ) : ( */}
      <div>
        <StyledModal
          aria-labelledby="unstyled-modal-title"
          aria-describedby="unstyled-modal-description"
          open={open}
          onClose={handleModalToggle}
          BackdropComponent={Backdrop}
        >
          <Box sx={style}>
            {/* <TaskForm open={open} setopen={setopen} /> */}
            <TaskModal
              open={open}
              setopen={setopen}
              paramsId={paramsId}
              editTask={editTask}
              seteditTask={seteditTask}
              editTaskData={editTaskData}
            />
          </Box>
        </StyledModal>
        {/* </div> */}

        <div className="style">
          <div className="row col d-flex justify-content-center">
            <div className="filter_button">
              <TextField
                select
                label="Filter"
                defaultValue={taskStatus[5].value}
                // inputProps={selected("currency", {
                //   required: "Please enter currency",
                // })}
                // color="primary"
                value={selected}
                onChange={(e) => setSelected(e.target.value)}
                // error={errors.currency}
                // helperText={errors.currency?.message}
              >
                {taskStatus.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              {roleData == 1 && (
                <div>
                  <Fab
                    sx={fabStyle}
                    aria-label="Add"
                    color="primary"
                    onClick={() => setopen(true)}
                  >
                    <AddIcon />
                  </Fab>
                  <h5> Add Task</h5>
                </div>
              )}
            </div>

            {selectedData.map(
              (taskInfo) =>
                taskInfo.status == selected && (
                  <div className="card_padding" key={taskInfo.id}>
                    <Card className="card" sx={{ width: 345, height: 300 }}>
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {taskInfo.task}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="div">
                          {handleDateDDMMYYFormat(taskInfo.dueDate)}
                        </Typography>
                        {/* { console.log(taskInfo.team.id) } */}
                        <Typography variant="body2" color="text.secondary">
                          {taskInfo.description}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                        ></Typography>
                      </CardContent>
                      <CardActions>
                        {/* {taskInfo.completed == true && ( */}
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() => handleCompletedTask(taskInfo)}
                        >
                          Complete
                        </Button>
                        {/* )} */}
                        {roleData == 1 && (
                          <>
                            {" "}
                            <Button
                              className="mr-2"
                              variant="contained"
                              color="error"
                              onClick={() => handleDeletedTask(taskInfo)}
                            >
                              Delete
                            </Button>
                            <Button
                              variant="contained"
                              onClick={() => editHandler(taskInfo)}
                            >
                              Edit
                              <EditIcon />
                            </Button>
                          </>
                        )}
                        {/* </Link> */}
                      </CardActions>
                    </Card>
                    {/* {selectedData<=0 && <h1>No Task Found!!</h1> } */}
                    {/* {taskInfo.status != selected && <h1>No Task Found!!</h1>} */}
                  </div>
                )
            )}

            {selectedData.length <= 0 && (
              <>
                <h2 style={{ color: "red" }}>No Task Found !!</h2>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskItem;
