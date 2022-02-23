import React, { useState } from 'react';
import moment from 'moment';

import TaskItem from './TaskItem';

function TodoList() {
 

  const displayTasks = () => {
    // return tasks.map((task) => {
    //   return <TaskItem key={task.id} taskInfo={task} />;
    // });
  };
  
  const cardStyle = {
    backgroundColor: "#ccd7b7",
    // width: "100%",
    // height: "100vh",
    padding: "10px",
    display:"flex"
  };

  return (
    <div  style={cardStyle }>
      <div className="row" >
        {displayTasks()}
      </div>
    </div>
  );
}

export default TodoList;
