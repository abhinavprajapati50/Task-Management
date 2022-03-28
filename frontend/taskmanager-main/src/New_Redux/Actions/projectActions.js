import axios from "axios";
import jwt_decode from "jwt-decode";

import {
  JOIN_PROJECT_TASK_FAIL,
  JOIN_PROJECT_TASK_START,
  JOIN_PROJECT_TASK_SUCCESS,
  PROJECT_GET_FAIL,
  PROJECT_GET_START,
  PROJECT_GET_SUCCESS,
  PROJECT_POST_FAIL,
  PROJECT_POST_START,
  PROJECT_POST_SUCCESS,
  Update_Project_FAIL,
  Update_Project_START,
  Update_Project_SUCCESS,
} from "../ActionTypes";

export const projectActions =
  ({ project, description, dueDate }) =>
  async (dispatch) => {
    await dispatch({
      type: PROJECT_POST_START,
    });
    console.log(
      "----------project, description, dueDate=====",
      project,
      description,
      dueDate
    );
    try {
      let token = localStorage.getItem('token');

      const projectData = await axios.post(`http://localhost:5000/projects`, {
        project,
        description,
        dueDate,
      }, {
        headers: { 'authorization': token }
      });
      console.log(projectData);
      if (projectData) {
        return dispatch({
          type: PROJECT_POST_SUCCESS,
          payload: projectData.data.data,
          loading: false,
        });
      } else {
        return dispatch({
          type: PROJECT_POST_FAIL,
          payload: projectData.data.message,
          loading: false,
        });
      }
    } catch (error) {
      console.log(error.message || error);
      return dispatch({
        type: PROJECT_POST_FAIL,
        payload: error.message || error,
        loading: false,
      });
    }
  };

export const allProjectGet = () => async (dispatch) => {
  await dispatch({
    type: PROJECT_GET_START,
  });
  try {
     let token = localStorage.getItem("token");

    // console.log("))))))))))))))))))localhost00", tokens);
    const allTasks = await axios.get(`http://localhost:5000/allprojects`, { headers: { 'authorization': token } });
    if (allTasks) {
      return dispatch({
        type: PROJECT_GET_SUCCESS,
        payload: allTasks.data.data,
        loading: false,
      });
    }
  } catch (error) {
    console.log(error.message || error);
    return dispatch({
      type: PROJECT_GET_FAIL,
      payload: error.message || error,
      loading: false,
    });
  }
};
export const projectRealatedTaskAction =
  ({ id }) =>
  async (dispatch) => {
    await dispatch({
      type: JOIN_PROJECT_TASK_START,
    });
    console.log(id);
    try {
      const allTasks = await axios.get(
        `http://localhost:5000/joinProject/${id}`
      );
      console.log(allTasks.data.data[0]);
      if (allTasks) {
        return dispatch({
          type: JOIN_PROJECT_TASK_SUCCESS,
          payload: allTasks.data.data[0],
          loading: false,
        });
      }
    } catch (error) {
      console.log(error.message || error);
      return dispatch({
        type: JOIN_PROJECT_TASK_FAIL,
        payload: error.message || error,
        loading: false,
      });
    }
  };

export const projectUpdateSuccess =
  ({ id, project, description, dueDate }) =>
  async (dispatch) => {
    console.log(
      "========------------------------id",
      id,
      project,
      description,
      dueDate
    );

    await dispatch({
      type: Update_Project_START,
    });

    try {
      const updateTask = await axios.put(
        `http://localhost:5000/project/edit/${id}`,
        { project, description, dueDate }
      );
      console.log("----updateTask-----=-==", updateTask);
      if (updateTask) {
        return dispatch({
          type: Update_Project_SUCCESS,
          payload: updateTask.data.data ? updateTask.data.data : "",
          loading: false,
        });
      } else {
        return dispatch({
          type: Update_Project_FAIL,
          payload: updateTask.data.message,
          loading: false,
        });
      }
    } catch (error) {
      console.log(error.message || error);
      return dispatch({
        type: Update_Project_FAIL,
        payload: error.message || error,
        loading: false,
      });
    }
  };
