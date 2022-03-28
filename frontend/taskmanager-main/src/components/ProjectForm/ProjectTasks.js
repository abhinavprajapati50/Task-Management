import React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";

import { Add_Task } from "./Add_Task";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import UpIcon from "@mui/icons-material/KeyboardArrowUp";
import { green } from "@mui/material/colors";
import Box from "@mui/material/Box";
import { Team } from "../Team/Team";
import TaskItem from "../TasksList/TaskItem";
import { useState } from "react";
import { useParams } from "react-router-dom";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`action-tabpanel-${index}`}
      aria-labelledby={`action-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `action-tab-${index}`,
    "aria-controls": `action-tabpanel-${index}`,
  };
}

const fabStyle = {
  position: "absolute",
  bottom: 30,
  right: 26,
};

export const ProjectTasks = () => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const [value, setValue] = useState(0);
  

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  // const fabs = [
  //   {
  //     color: "primary",
  //     sx: fabStyle,
  //     icon: <AddIcon />,
  //     label: "Add",
  //   },
  //   {
  //     color: "secondary",
  //     sx: fabStyle,
  //     icon: <AddIcon />,
  //     // icon: <EditIcon />,
  //     label: "Add",
  //   },
  //   // {
  //   //   color: "inherit",
  //   //   sx: { ...fabStyle, ...fabGreenStyle },
  //   //   icon: <UpIcon />,
  //   //   label: "Expand",
  //   // },
  // ];

  {console.log(":==================prjecty task")}
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        position: "relative",
        minHeight: 550,
      }}
    >
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="action tabs example"
        >
          <Tab label="All Team Members" {...a11yProps(0)} />
          <Tab label="Add Task" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Team />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>

              <TaskItem />
        </TabPanel>
      </SwipeableViews>
    </Box>
  );
};

// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
// import Typography from "@mui/material/Typography";
// import CardContent from "@mui/material/CardContent";
// import { projectRealatedTaskAction } from "../../New_Redux/Actions/projectActions";
// import { useDispatch } from "react-redux";
// import { useState } from "react";
// import { useEffect } from "react";
// import Button from "@mui/material/Button";
// import {
//   allTaskGet,
//   completedTaskAction,
//   getDeletedTask,
// } from "../../New_Redux/Actions/getAllTask";
// import { toast } from "react-toastify";
// import EditIcon from "@mui/icons-material/Edit";

// export const ProjectTasks = () => {
//   const { state } = useLocation();
//   const dispatch = useDispatch();
//   const navgate = useNavigate();
//   const [matchedTask, setMatchedtask] = useState([]);
//   const [completedTaskState, setcompletedTaskState] = useState(null);
//   const [deletedTaskState, setDeletedTaskState] = useState([]);

//   const TasksRealatedProjectHandler = async () => {
//     const Tasks = await dispatch(projectRealatedTaskAction(state));
//     console.log(Tasks);
//     setMatchedtask(Tasks.payload[0].tasks);
//   };

//   const handleDateDDMMYYFormat = (date) => {
//     let theDate = new Date(Date.parse(date));
//     return theDate.toLocaleDateString();
//   };

//   const handleCompletedTask = async (task) => {
//     console.log(task);
//     try {
//       const completedTask = await dispatch(completedTaskAction(task));
//       console.log(completedTask);
//       // setloader(false);
//       setcompletedTaskState(completedTask);
//       if (completedTask) {
//         toast.success("task is completed successfully");
//       }
//       navgate("/completedtask");
//       return completedTask;
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   const handleDeletedTask = async (task) => {
//     console.log(task);
//     try {
//       const deletedTask = await dispatch(getDeletedTask(task));
//       // let deletedTask = await axios.put(
//       //   `http://localhost:5000/task/deletedtask/${task.id}`
//       // );
//       console.log(deletedTask);
//       setDeletedTaskState(deletedTask);
//       if (deletedTask) {
//         return toast.dismiss("task is deletedTask successfully");
//       }
//       // navgate("/task");
//       return deletedTask;
//     } catch (error) {
//       console.log(error || error.message);
//     }
//   };

//   const editHandler = async (data) => {
//     console.log("dsffffadfs");
//     return navgate(`/edit/${data.id}`, { state: data });
//   };

//   const allTaskFuncHandler = async () => {
//     const allTask = await dispatch(allTaskGet());
//     // setallTaskData(allTask.payload);
//   };

//   console.log("-----------", matchedTask);
//   useEffect(() => {
//     allTaskFuncHandler();
//     TasksRealatedProjectHandler
//   }, [completedTaskState, deletedTaskState]);

//   return (
//     <div>
//       <div className="cardStyle">
//         {/* {Loader ? (
//         <img src="./images/task.gif" alt="" width="100%" height="560vh" />
//       ) : ( */}
//         <div>
//           <div className="style">
//             <div className="row col d-flex justify-content-center">
//               {matchedTask.map(
//                 (taskInfo) =>
//                   taskInfo.status == 0 &&
//                   taskInfo.chr_delete == 0 && (
//                     <div className="card_padding" key={taskInfo.id}>
//                       <Card
//                         className="card"
//                         sx={{ width: 345, height: 200, padding: "1rem" }}
//                       >
//                         <CardContent>
//                           <Typography gutterBottom variant="h5" component="div">
//                             {taskInfo.task}
//                           </Typography>
//                           <Typography gutterBottom variant="h5" component="div">
//                             {handleDateDDMMYYFormat(taskInfo.dueDate)}
//                           </Typography>
//                           {/* { console.log(taskInfo.team.id) } */}
//                           <Typography variant="body2" color="text.secondary">
//                             {taskInfo.description}
//                           </Typography>
//                           <Typography
//                             variant="body2"
//                             color="text.secondary"
//                           ></Typography>
//                         </CardContent>
//                         <CardActions>
//                           {/* {taskInfo.completed == true && ( */}
//                           <Button
//                             variant="contained"
//                             color="success"
//                             onClick={() => handleCompletedTask(taskInfo)}
//                           >
//                             Complete
//                           </Button>
//                           {/* )} */}
//                           <Button
//                             className="mr-2"
//                             variant="contained"
//                             color="error"
//                             onClick={() => handleDeletedTask(taskInfo)}
//                           >
//                             Delete
//                           </Button>
//                           {/* <Link to={`/edit/${taskInfo.id}`}> */}
//                           <Button
//                             variant="contained"
//                             onClick={() => editHandler(taskInfo)}
//                           >
//                             Edit
//                             <EditIcon />
//                           </Button>
//                           {/* </Link> */}
//                         </CardActions>
//                       </Card>
//                     </div>
//                   )
//                   )}
//                   {matchedTask.length <= 0 && <h1>No Tasks Found</h1>}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
