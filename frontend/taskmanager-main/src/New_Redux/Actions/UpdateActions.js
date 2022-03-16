import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import {
  UpdateTask_FAIL,
  UpdateTask_START,
  UpdateTask_SUCCESS,
} from "../ActionTypes";

export const taskUpdateSuccess =
  ({id, task, description, dueDate, Assign_to }) =>
  async (dispatch) => {
    debugger;
    console.log("========------------------------id",id, task, description, dueDate, Assign_to );

    await dispatch({
      type: UpdateTask_START,
    });
    // console.log("*******************************", updateTask);

    try {
      const updateTask = await axios.put(
        `http://localhost:5000/task/edit/${id}`,
        {task, description, dueDate, Assign_to}
      );
      console.log("----updateTask-----=-==", updateTask);
      if (updateTask) {
        return dispatch({
          type: UpdateTask_SUCCESS,
          payload: updateTask.data.data ? updateTask.data.data : "",
          loading: false,
        });
      } else {
        return dispatch({
          type: UpdateTask_FAIL,
          payload: updateTask.data.message,
          loading: false,
        });
      }
    } catch (error) {
      console.log(error.message || error);
      return dispatch({
        type: UpdateTask_FAIL,
        payload: error.message || error,
        loading: false,
      });
    }
  };
// export const taskUpdateSuccess = (updateTask) => ({
//   type: UpdateTask_SUCCESS,
//   payload: updateTask ? updateTask : ""
// });
export const taskUpdateFail = (error) => ({
  type: UpdateTask_FAIL,
  payload: error || error.message,
});
