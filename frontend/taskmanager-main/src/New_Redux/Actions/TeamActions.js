import React from "react";
import axios from "axios";
import {
  TEAM_START,
  TEAM_SUCCESS,
  TEAM_FAIL,
  SIGLE_TEAM_MEMBER_START,
  SIGLE_TEAM_MEMBER_SUCCESS,
  SIGLE_TEAM_MEMBER_FAIL,
  GET_TEAM_START,
  GET_TEAM_SUCCESS,
  GET_TEAM_FAIL,
  JOIN_TEAM_TASK_START,
  JOIN_TEAM_TASK_SUCCESS,
  JOIN_TEAM_TASK_FAIL,
  COMPLETED_TASK_START,
  COMPLETED_TASK_SUCCESS,
  COMPLETED_TASK_FAIL,
  DELETE_TEAM_START,
  DELETE_TEAM_SUCCESS,
  DELETE_TEAM_FAIL,
} from "../ActionTypes";

export const teamActions =
({ name, gender, work,projectId }) =>
// ({ task, description, dueDate, Assign_to }) =>
async (dispatch) => {
    await dispatch({
      type: TEAM_START,
    });
    try {
      let token = localStorage.getItem("token");
      const teamData = await axios.post(
        `http://localhost:5000/team`,
        {
          name,
          gender,
          work, // task, description, dueDate, Assign_to
          projectId
        },
        {
          headers: { authorization: token },
        }
      );
      console.log("===========UPDTAETASK", teamData);
      if (teamData) {
        return dispatch({
          type: TEAM_SUCCESS,
          payload: teamData.data.data,
          loading: false,
        });
      } else {
        return dispatch({
          type: TEAM_FAIL,
          payload: teamData.data.message,
          loading: false,
        });
      }
    } catch (error) {
      console.log(error.message || error);
      return dispatch({
        type: TEAM_FAIL,
        payload: error.message || error,
        loading: false,
      });
    }
  };

export const getSingleTeamMemberAction = (teamId) => async (dispatch) => {
  await dispatch({
    type: SIGLE_TEAM_MEMBER_START,
  });
  try {
    const allTasks = await axios.get(`http://localhost:5000/team/${teamId}`);
    console.log(allTasks.data.data);
    // if (allTasks) {
      return dispatch({
        type: SIGLE_TEAM_MEMBER_SUCCESS,
        payload: allTasks.data.data,
        loading: false,
      });
    // }
  } catch (error) {
    console.log(error.message || error);
    return dispatch({
      type: SIGLE_TEAM_MEMBER_FAIL,
      payload: error.message || error,
      loading: false,
    });
  }
};
export const getAllTeamAction = (team) => async (dispatch) => {
  await dispatch({
    type: GET_TEAM_START,
  });
  try {
    let token = localStorage.getItem("token");

    const allTasks = await axios.get(`http://localhost:5000/team`, {
      headers: { authorization: token },
    });
    console.log("-------------------------allTasksallTasks>>>>>>>>>", allTasks);
    if (allTasks) {
      return dispatch({
        type: GET_TEAM_SUCCESS,
        payload: allTasks.data.data,
        loading: false,
      });
    }
  } catch (error) {
    console.log(error.message || error);
    return dispatch({
      type: GET_TEAM_FAIL,
      payload: error.message || error,
      loading: false,
    });
  }
};
export const getJoinTeamTaskAction = (id) => async (dispatch) => {
  await dispatch({
    type: JOIN_TEAM_TASK_START,
  });
  try {
    const allTasks = await axios.get(
      `http://localhost:5000/joinTeamTask/${id}`
    );
    console.log(allTasks);
    if (allTasks) {
      return dispatch({
        type: JOIN_TEAM_TASK_SUCCESS,
        payload: allTasks.data.data,
        loading: false,
      });
    }
  } catch (error) {
    console.log(error.message || error);
    return dispatch({
      type: JOIN_TEAM_TASK_FAIL,
      payload: error.message || error,
      loading: false,
    });
  }
};

export const getCompletedTaskAction = (id) => async (dispatch) => {
  await dispatch({
    type: COMPLETED_TASK_START,
  });
  try {
    const allCompletedTask = await axios.get(
      `http://localhost:5000/completedTask`
    );
    console.log(allCompletedTask);
    if (allCompletedTask) {
      return dispatch({
        type: COMPLETED_TASK_SUCCESS,
        payload: allCompletedTask.data.data,
        loading: false,
      });
    }
  } catch (error) {
    console.log(error.message || error);
    return dispatch({
      type: COMPLETED_TASK_FAIL,
      payload: error.message || error,
      loading: false,
    });
  }
};

// deleteTeamReducer

export const deleteTeamMemberAction = (team) => async (dispatch) => {
  await dispatch({
    type: DELETE_TEAM_START,
  });
  try {
    console.log(team);
    const allTeams = await axios.delete(
      `http://localhost:5000/team/deletedteam/${team.id}`
    );
    console.log("--------deleteteaam", allTeams);
    if (allTeams) {
      return dispatch({
        type: DELETE_TEAM_SUCCESS,
        payload: allTeams.data.data,
        loading: false,
      });
    }
  } catch (error) {
    console.log(error.message || error);
    return dispatch({
      type: DELETE_TEAM_FAIL,
      payload: error.message || error,
      loading: false,
    });
  }
};


// export const getEditTask = (task) => async (dispatch) => {
//   await dispatch({
//     type: COMPLETE_TASK_START,
//   });
//   try {
//     const allTasks = await axios.put(
//       `http://localhost:5000/task/completed/${task.id}`
//     );
//     if (allTasks) {
//       return dispatch({
//         type: COMPLETE_TASK_SUCCESS,
//         payload: allTasks.data.data,
//         loading: false,
//       });
//     }
//   } catch (error) {
//     console.log(error.message || error);
//     return dispatch({
//       type: COMPLETE_TASK_FAIL,
//       payload: error.message || error,
//       loading: false,
//     });
//   }
// };
// export const getDeletedTask = (task) => async (dispatch) => {
//   await dispatch({
//     type: DELETE_TASK_START,
//   });
//   try {
//     console.log(task);
//     // `http://localhost:5000/task/deletedtask/${task.id}`
//     const allTasks = await axios.put(
//       `http://localhost:5000/task/deletedtask/${task.id}`
//     );
//     console.log("--------deletetask", allTasks);
//     if (allTasks) {
//       return dispatch({
//         type: DELETE_TASK_SUCCESS,
//         payload: allTasks.data.data,
//         loading: false,
//       });
//     }
//   } catch (error) {
//     console.log(error.message || error);
//     return dispatch({
//       type: DELETE_TASK_FAIL,
//       payload: error.message || error,
//       loading: false,
//     });
//   }
// };

// // let deletedTask = await axios.put(
// //     `http://localhost:5000/task/deletedtask/${taskId}`
// //   );
