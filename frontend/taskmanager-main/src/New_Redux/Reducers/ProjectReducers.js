import { PROJECT_GET_FAIL, PROJECT_GET_START, PROJECT_GET_SUCCESS, PROJECT_POST_FAIL, PROJECT_POST_START, PROJECT_POST_SUCCESS, Update_Project_FAIL, Update_Project_START, Update_Project_SUCCESS } from "../ActionTypes";

const initialState = {
    project: [],
  };

// ------------Add new Project --------------------------------
  
export const projectsReducer = (state = initialState, action) => {
    switch (action.type) {
      case PROJECT_POST_START:
        return {
          loading: true,
        };
      case PROJECT_POST_SUCCESS:
        return {
          ...state,
          loading: false,
          updateTask: action.payload,
        };
  
      case PROJECT_POST_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  // ---------All-Projects

  export const getAllProjectReducers = (state = initialState, action) => {
    switch (action.type) {
      case PROJECT_GET_START:
        return {
          loading: true,
        };
      case PROJECT_GET_SUCCESS:
        return {
          ...state,
          loading: false,
          alltask: action.payload,
        };
  
      case PROJECT_GET_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };

  // ----------------Update_Project

  export const editTaskReducer = (state = initialState, action) => {
    switch (action.type) {
      case Update_Project_START:
        return {
          loading: true,
        };
      case Update_Project_SUCCESS:
        return {
          ...state,
          loading: false,
          alltask: action.payload,
        };
  
      case Update_Project_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  