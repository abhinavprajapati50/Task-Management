import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { ToastContainer, toast } from "react-toastify";
import ModalUnstyled from "@mui/base/ModalUnstyled";

import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
// import "./Taskcss/Task_Item.css";
import "../TasksList/Taskcss/Task_Item.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import { useLocation } from "react-router-dom";
import { styled, Box } from "@mui/system";

import { allProjectGet } from "../../New_Redux/Actions/projectActions";
import { Project_Form } from "./Project-Form";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import jwt_decode from "jwt-decode";

// import { TaskUpdateForm } from "../TaskForm/TaskUpdateForm";

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
  width: 800,
  height: 570,
  // bgcolor: "background.paper",
  bgcolor: "white",
  border: "2px solid #000",
  overflow: "scroll",
  p: 3,
  px: 4,
  pb: 3,
};

export const Project_List = ({ setisLoggedIN, setloader }) => {
  const [allTaskData, setallTaskData] = useState([]);
  const [completedTaskState, setcompletedTaskState] = useState(null);
  const [open, setopen] = useState(false);
  const [editData, seteditData] = useState(null);
  const [isediting, setIsediting] = useState(false);
  const [roleData, setroleData] = useState(null);
  const navgate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  let locatioState = location;

  setisLoggedIN(true);
  const allTaskFuncHandler = async () => {
    const localStorageData = localStorage.getItem("token");
    const jwtDecodeData = jwt_decode(localStorageData);
    console.log("---------------------", jwtDecodeData.role);
    const allTask = await dispatch(allProjectGet());
    setloader(false);
    setroleData(jwtDecodeData.role);
    setallTaskData(allTask.payload);
  };

  const handleDateDDMMYYFormat = (date) => {
    let theDate = new Date(Date.parse(date));
    console.log(new Date().getFullYear() < theDate.getFullYear());
    return theDate.toLocaleDateString();
  };

  const editHandler = async (data) => {
    console.log(
      "==================================================edit Project",
      data
    );
    setopen(true);
    setIsediting(true);
    seteditData(data);
    // onClick={handleModalToggle}
    // return navgate(`/project/edit/${data.id}`, {
    //   state: { data, update: true },
    // });
  };
  // console.log("-----editData ------>>>>>>", new Date(),   allTaskData[0].dueDate);
  const viewHandler = async (data) => {
    console.log("-----------view task");
    return navgate(`/project/add-task/${data.id}`);
    // return navgate(`/project/add-task/${data.id}`, { state: data });

    // const viewTaskRelatedProject = await dispatch()
  };

  const handleModalToggle = () => {
    setIsediting(false);
    setopen(true);
  };

  useEffect(async () => {
    allTaskFuncHandler();
    setloader(false);
  }, [completedTaskState, open]);
  return (
    <div className="cardStyle">
      {/* <Button  onClick={handleModalToggle}>
        Add Project
      </Button> */}
      {roleData == 1 && (
        <Fab
          // sx={fabStyle}
          aria-label="Add"
          color="primary"
          onClick={handleModalToggle}
        >
          <AddIcon />
        </Fab>
      )}
      <StyledModal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleModalToggle}
        BackdropComponent={Backdrop}
      >
        <Box sx={style}>
          <Project_Form
            open={open}
            setopen={setopen}
            {...(isediting ? { editData: editData } : null)}
            //  {...(this.props.editable ? {editable: this.props.editableOpts} : {})} >

            // isediting={isediting}
          />
        </Box>
      </StyledModal>
      {/* {Loader ? (
        <img src="./images/task.gif" alt="" width="100%" height="560vh" />
      ) : ( */}
      <div>
        <div className="style">
          <div className="row col d-flex justify-content-center">
            {allTaskData.map((taskInfo) => (
              <div className="card_padding" key={taskInfo.id}>
                <Card
                  className="card"
                  sx={{ width: 345, height: 300, padding: "1rem" }}
                >
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {taskInfo.project}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                      {handleDateDDMMYYFormat(taskInfo.dueDate)}
                    </Typography>
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

                    {roleData == 1 && (
                      <Button
                        variant="contained"
                        onClick={() => editHandler(taskInfo)}
                      >
                        Edit
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      onClick={() => viewHandler(taskInfo)}
                    >
                      Task
                    </Button>
                    {/* </Link> */}
                  </CardActions>
                </Card>
              </div>
            ))}
            {allTaskData.length <= 0 && (
              <h3> No Project Found !! Please add projects</h3>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
