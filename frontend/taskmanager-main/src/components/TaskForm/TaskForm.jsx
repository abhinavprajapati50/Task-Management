import React, { useState } from "react";
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
import Button from '@mui/material/Button';



const style = {
  marginBottom: "2rem",
};

function TaskForm() {
  const [dead_line, setdead_line] = useState(new Date());
  const [age, setAge] = useState("");
  const [task, settask] = useState("");
  const [description, setDescription] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleDate = (newValue) => {
    setdead_line(newValue);
  };

  return (
    <div className="container col-sm-8 mt-4">
      <h4 className="mb-4">Add Task</h4>
      <form action="/"
        // method="post"
      >
        <div className="form-group">
          <label for="title">Task</label>
          <input
            type="text"
            className="form-control"
            id="task"
            aria-describedby="emailHelp"
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
          />
        </div>
        <div className="form-group">
          <label for="dueDate">Due Date</label>
          {/* <input
            type="text"
            className="form-control"
            id="dueDate"
            aria-describedby="emailHelp"
          /> */}
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={3} style={style}>
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
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <Select
              value={age}
              onChange={handleChange}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>abhinav</MenuItem>
              <MenuItem value={20}>abhay</MenuItem>
              <MenuItem value={30}>sagar</MenuItem>
              <MenuItem value={30}>mayank</MenuItem>
              <MenuItem value={30}>shreya</MenuItem>
              <MenuItem value={30}>khushal</MenuItem>
            </Select>
            <FormHelperText>Assign to</FormHelperText>
          </FormControl>
        </div>

        <Button type="submit" variant="contained">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default TaskForm;
