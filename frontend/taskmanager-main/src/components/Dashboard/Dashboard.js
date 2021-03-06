import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Grid } from "@mui/material";
import "./Dashboard.css";
import { ToastContainer } from "react-toastify";
import {  useDispatch } from "react-redux";
import { allTaskGet } from "../../New_Redux/Actions/getAllTask";
import { getCompletedTaskAction } from "../../New_Redux/Actions/TeamActions";

// import { allTaskGet } from "../../New_Redux/Actions/RegisterActions";



const cardStyle = {
  backgroundColor: "#ccd7b7",
  width: "100%",
  height: "100vh",
};
const style = {
  display: "flex",
};
const PieChartData = [
  { name: "Group A", value: 400, color: "primary" },
  { name: "Group B", value: 300, color: "secondary" },
  { name: "Group C", value: 300, color: "warning" },
  { name: "Group D", value: 200, color: "success" },
];

export const Dashboard = () => {
  const [allTasks, setAllTasks] = useState([]);
  const [allCompletedTask, setAllCompletedTask] = useState([]);
  const dispatch = useDispatch();

  const allTaskFunc = async () => {
    const allTasks = await dispatch(allTaskGet())  
    console.log(allTasks);
    setAllTasks(allTasks.payload);
    // const allCompletedTask = await axios.get(completedTaskLink);
    const allCompletedTask = await dispatch(  getCompletedTaskAction () )

    // const  allCompletedTask = await axios.get(completedTaskLink );
    setAllCompletedTask(allCompletedTask.payload);
     
  };

  // console.log(allCompletedTask)
  useEffect(() => {
    allTaskFunc()
  }, [])
  
  return (
    <div>
      <div className="Dashboard">
        <ToastContainer />
        <div>
          <div>
            <div className="row col d-flex justify-content-center">
              <div style={{ padding: "1rem" }}>
                <Card
                  sx={{
                    width: 345,
                    height: 200,
                    padding: "1rem",
                    backgroundColor: "#76a376",
                  }}
                >
                  <CardContent>
                    <Typography
                      // variant="body2"
                      color="text.secondary"
                      variant="h5"
                    >
                      CompletedTask
                    </Typography>
                    {/* { tasks.map(currentTask => currentTask && currentTask.completed == true )} */}
                    <Typography gutterBottom variant="h5" component="div">
                      {allCompletedTask.length}
                    </Typography>
                  </CardContent>
                </Card>
              </div>
              <div style={{ padding: "1rem" }}>
                <Card
                  sx={{
                    width: 345,
                    height: 250,
                    padding: "1rem",
                    backgroundColor: "#b0b0ff",
                  }}
                >
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      All Task
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                      {allTasks.length}
                    </Typography>
                    <Grid item xs={6}>
                      <ResponsiveContainer width="100%" height={144}>
                        <PieChart>
                          <Pie
                            data={PieChartData}
                            innerRadius={30}
                            outerRadius={40}
                            dataKey="value"
                          >
                            {PieChartData.map((entry, index) => (
                              <>
                                <Cell
                                  key={`cell-${index}`}
                                  // fill={theme.palette[entry.color].main}
                                  style={{ color: "red" }}
                                />
                                <h5>{entry.name}</h5>
                              </>
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    </Grid>
                  </CardContent>
                </Card>
              </div>

              <div style={{ padding: "1rem" }}>
                <Card
                  sx={{
                    width: 345,
                    height: 200,
                    padding: "1rem",
                    backgroundColor: "#d7d769",
                  }}
                >
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Pending Task
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                    {allTasks.length - allCompletedTask.length}
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
