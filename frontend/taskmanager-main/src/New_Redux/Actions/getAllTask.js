import React from "react";
import axios from "axios";
import {
  COMPLETE_TASK_FAIL,
  COMPLETE_TASK_START,
  COMPLETE_TASK_SUCCESS,
  DELETE_TASK_FAIL,
  DELETE_TASK_START,
  DELETE_TASK_SUCCESS,
  TASK_GET_FAIL,
  TASK_GET_START,
  TASK_GET_SUCCESS,
  TASK_POST_FAIL,
  TASK_POST_START,
  TASK_POST_SUCCESS,
  UpdateTask_FAIL,
  UpdateTask_START,
  UpdateTask_SUCCESS,
} from "../ActionTypes";
import { toast } from "react-toastify";

export const taskActions =
  ({ task, description, dueDate, Assign_to, project_name, status }) =>
  async (dispatch) => {
    await dispatch({
      type: TASK_POST_START,
    });
    console.log(task, description, dueDate, Assign_to, project_name, status);
    debugger;
    try {
      let token = localStorage.getItem("token");
      const addTask = await axios.post(
        `http://localhost:5000/task`,
        {
          task,
          description,
          dueDate,
          Assign_to,
          project_name,
          status,
        },
        { headers: { authorization: token } }

        // , project_name
      );
      console.log(addTask);
      toast.success(addTask.data.message);
      if (addTask) {
        return dispatch({
          type: TASK_POST_SUCCESS,
          payload: addTask.data.data,
          loading: false,
        });
      } else {
        return dispatch({
          type: TASK_POST_FAIL,
          payload: addTask.data.message,
          loading: false,
        });
      }
    } catch (error) {
      console.log(error.message);
      return dispatch({
        type: TASK_POST_FAIL,
        payload: error.message || error,
        loading: false,
      });
    }
  };

export const taskUpdateSuccess =
  ({ id, task, description, dueDate, Assign_to, status }) =>
  async (dispatch) => {
    await dispatch({
      type: UpdateTask_START,
    });

    try {
      const updateTask = await axios.put(
        `http://localhost:5000/task/edit/${id}`,
        { task, description, dueDate, Assign_to, status }
      );
      console.log("----updateTask-----=-==", updateTask);
      if (updateTask) {
        toast.success(updateTask.data.message);
        return dispatch({
          type: UpdateTask_SUCCESS,
          payload: updateTask.data.data,
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

export const allTaskGet = () => async (dispatch) => {
  await dispatch({
    type: TASK_GET_START,
  });
  try {
    let token = localStorage.getItem("token");

    const allTasks = await axios.get(`http://localhost:5000/task`, {
      headers: { authorization: token },
    });
    console.log("--------------allTasks=-----=-=-", allTasks);
    if (allTasks) {
      return dispatch({
        type: TASK_GET_SUCCESS,
        payload: allTasks.data.data,
        loading: false,
      });
    }
  } catch (error) {
    console.log(error.message || error);
    return dispatch({
      type: TASK_GET_FAIL,
      payload: error.message || error,
      loading: false,
    });
  }
};

export const completedTaskAction = (task) => async (dispatch) => {
  await dispatch({
    type: COMPLETE_TASK_START,
  });
  try {
    const allTasks = await axios.put(
      `http://localhost:5000/task/completed/${task.id}`
    );
    console.log("----------completed task", allTasks);
    if (allTasks) {
      return dispatch({
        type: COMPLETE_TASK_SUCCESS,
        payload: allTasks.data.data,
        loading: false,
      });
    }
  } catch (error) {
    console.log(error.message || error);
    return dispatch({
      type: COMPLETE_TASK_FAIL,
      payload: error.message || error,
      loading: false,
    });
  }
};
export const getDeletedTask = (task) => async (dispatch) => {
  await dispatch({
    type: DELETE_TASK_START,
  });
  try {
    console.log(task);
    // `http://localhost:5000/task/deletedtask/${task.id}`
    const allTasks = await axios.put(
      `http://localhost:5000/task/deletedtask/${task.id}`
    );
    console.log("--------deletetask", allTasks);
    if (allTasks) {
      return dispatch({
        type: DELETE_TASK_SUCCESS,
        payload: allTasks.data.data,
        loading: false,
      });
    }
  } catch (error) {
    console.log(error.message || error);
    return dispatch({
      type: DELETE_TASK_FAIL,
      payload: error.message || error,
      loading: false,
    });
  }
};

// let deletedTask = await axios.put(
//     `http://localhost:5000/task/deletedtask/${taskId}`
//   );
