import React from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

const fabStyle = {
  //   position: "absolute",
  //   bottom: 320,
  //   right: 26,
  // top:100,
    
};

export const Add_Task = () => {
  return (
    <div style={{right: "0rem"}}>
      <Fab sx={fabStyle} aria-label="Add" color="primary">
        <AddIcon />
      </Fab>
    </div>
  );
};

//   <Fab sx={fabStyle} aria-label="Add" color="primary">
//           {/* {fab.icon} */}
//           <AddIcon  />
//   </Fab>
