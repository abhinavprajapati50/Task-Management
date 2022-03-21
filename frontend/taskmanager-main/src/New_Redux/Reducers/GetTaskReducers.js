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
  UpdateTask_FAIL,
  UpdateTask_START,
  UpdateTask_SUCCESS,
} from "../ActionTypes";

const initialState = {
  alltask: [],
};

// const initialState = {
//   updateTask: [],
// };

export const updateReducer = (state = initialState, action) => {
  switch (action.type) {
    case UpdateTask_START:
      return {
        loading: true,
      };
    case UpdateTask_SUCCESS:
      return {
        ...state,
        loading: false,
        updateTask: action.payload,
      };

    case UpdateTask_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};


export const getAllTaskReducers = (state = initialState, action) => {
  switch (action.type) {
    case TASK_GET_START:
      return {
        loading: true,
      };
    case TASK_GET_SUCCESS:
      return {
        ...state,
        loading: false,
        alltask: action.payload,
      };

    case TASK_GET_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const editTaskReducer = (state = initialState, action) => {
  switch (action.type) {
    case COMPLETE_TASK_START:
      return {
        loading: true,
      };
    case COMPLETE_TASK_SUCCESS:
      return {
        ...state,
        loading: false,
        alltask: action.payload,
      };

    case COMPLETE_TASK_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const deleteTaskReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_TASK_START:
      return {
        loading: true,
      };
    case DELETE_TASK_SUCCESS:
      return {
        ...state,
        loading: false,
        alltask: action.payload,
      };

    case DELETE_TASK_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
