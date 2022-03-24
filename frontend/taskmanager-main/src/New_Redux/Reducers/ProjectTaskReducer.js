import {
  JOIN_PROJECT_TASK_FAIL,
  JOIN_PROJECT_TASK_START,
  JOIN_PROJECT_TASK_SUCCESS,
} from "../ActionTypes";

const initialState = {
  projectTasks: [],
};

export const getAllProjectTasksJoinReducers = (state = initialState, action) => {
  switch (action.type) {
    case JOIN_PROJECT_TASK_START:
      return {
        loading: true,
      };
    case JOIN_PROJECT_TASK_SUCCESS:
      return {
        ...state,
        loading: false,
        alltask: action.payload,
      };

    case JOIN_PROJECT_TASK_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
