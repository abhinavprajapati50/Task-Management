import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { ToastContainer, toast } from "react-toastify";

import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./Taskcss/Task_Item.css";
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
import Autocomplete from "@mui/material/Autocomplete";
// ---------
import { allTaskGet, taskActions } from "../../New_Redux/Actions/getAllTask";

import {
  getDeletedTask,
  completedTaskAction,
} from "../../New_Redux/Actions/getAllTask";
import TaskForm from "../TaskForm/TaskForm";
import { NavLink } from "react-router-dom";
import { TaskModal } from "./TaskModal";
// import { TaskUpdateForm } from "../TaskForm/TaskUpdateForm";

const fabStyle = {
  position: "absolute",
  bottom: 206,
  right: 16,
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
  p: 3,
  px: 4,
  pb: 3,
};

function TaskItem({ setisLoggedIN, setloader }) {
  // debugger
  const [allTaskData, setallTaskData] = useState([]);
  const [completedTaskState, setcompletedTaskState] = useState(null);
  const [deletedTaskState, setDeletedTaskState] = useState(null);
  const [Alltask, setAlltask] = useState([]);
  const [selected, setSelected] = useState("Pending");

  // const [loader, setloader] = useState(false);
  let [addTask, setaddTask] = useState(false);
  const navgate = useNavigate();
  const dispatch = useDispatch();

  const [open, setopen] = useState(false);

  const allTaskFuncHandler = async () => {
    const allTask = await dispatch(allTaskGet());
    // setloader(false);
    setallTaskData(allTask.payload);
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
    debugger;
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
    debugger;
    console.log("dsffffadfs");
    return navgate(`/edit/${data.id}`, { state: data });
  };

  const handleAllTask = async () => {
    const taskData = await dispatch(allTaskGet());
    console.log("------------------------------", taskData);
    setAlltask(taskData.payload);
  };

  const handleModalToggle = () => setopen(true);

  useEffect(async () => {
    // setisLoggedIN(true);
    allTaskFuncHandler();
    // handleAllTeam();
    // handleAllTask();

    // handleAllProject();
    // allProjectGet
    // setloader(false);
  }, [completedTaskState, deletedTaskState, allTaskData.length, open]);
  console.log(allTaskData.length);
  const top100Films = [
    { label: "Pending", id: 1 },
    { label: "Completed", id: 4 },
    { label: "Rejected", id: 2 },
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
            <TaskModal open={open} setopen={setopen} />
          </Box>
        </StyledModal>
        {/* </div> */}

        <div className="style">
          <div className="row col d-flex justify-content-center">
            <div className="filter_button">
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                // options={top100Films}
                value={selected}
                options={top100Films}
                onChange={(event, value) =>
                  value !== null && setSelected(value)
                }
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Task Action " />
                )}
              />
              <Fab
                      // sx={fabStyle}
                      aria-label="Add"
                      color="primary"
                      onClick={() => setopen(!open)}
                    >
                      <AddIcon /> 
              </Fab>
              <h5> Add Task</h5>
            </div>
            {console.log(allTaskData)}
            {allTaskData.map(
              (taskInfo) =>
                taskInfo.status == (selected.id || "0") && (
                  <div className="card_padding" key={taskInfo.id}>
                    {console.log(
                      "---------=============--->>>>",
                      taskInfo && true
                    )}
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
                        <Button
                          className="mr-2"
                          variant="contained"
                          color="error"
                          onClick={() => handleDeletedTask(taskInfo)}
                        >
                          Delete
                        </Button>
                        {/* <Link to={`/edit/${taskInfo.id}`}> */}
                        <Button
                          variant="contained"
                          onClick={() => editHandler(taskInfo)}
                        >
                          Edit
                          <EditIcon />
                        </Button>
                        {/* </Link> */}
                      </CardActions>
                    </Card>
                    {/* <NavLink to="/newtask"> */}

                    
                    {/* </NavLink> */}
                  </div>
                )
            )}
            {allTaskData <= 0 && (
              <>
                {" "}
                <h2 style={{ color: "red" }}>No Task Found !!</h2>
                <h3 style={{ color: "gray" }}> Please add the task</h3>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskItem;
