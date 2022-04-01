import {
  COMPLETED_TASK_FAIL,
  COMPLETED_TASK_START,
  COMPLETED_TASK_SUCCESS,
  DELETE_TASK_FAIL,
  DELETE_TASK_START,
  DELETE_TASK_SUCCESS,
  DELETE_TEAM_FAIL,
  DELETE_TEAM_START,
  DELETE_TEAM_SUCCESS,
  GET_TEAM_FAIL,
  GET_TEAM_START,
  GET_TEAM_SUCCESS,
  JOIN_TEAM_TASK_FAIL,
  JOIN_TEAM_TASK_START,
  JOIN_TEAM_TASK_SUCCESS,
  SIGLE_TEAM_MEMBER_FAIL,
  SIGLE_TEAM_MEMBER_START,
  SIGLE_TEAM_MEMBER_SUCCESS,
  TEAM_FAIL,
  TEAM_START,
  TEAM_SUCCESS,
} from "../ActionTypes";

const initialState = {
  allTeam: [],
};

export const teamReducer = (state = initialState, action) => {
  switch (action.type) {
    case TEAM_START:
      return {
        loading: true,
      };
    case TEAM_SUCCESS:
      return {
        ...state,
        loading: false,
        updateTask: action.payload,
      };

    case TEAM_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getSingleTeamReducers = (state = initialState, action) => {
  switch (action.type) {
    case SIGLE_TEAM_MEMBER_START:
    case GET_TEAM_START:
      return {
        loading: true,
      };
    case SIGLE_TEAM_MEMBER_SUCCESS:
    case GET_TEAM_SUCCESS:
      return {
        ...state,
        loading: false,
        alltask: action.payload,
      };

    case SIGLE_TEAM_MEMBER_FAIL:
    case GET_TEAM_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export const getJoinTeamTaskReducers = (state = initialState, action) => {
  switch (action.type) {
    case JOIN_TEAM_TASK_START:
    case COMPLETED_TASK_START:
      return {
        loading: true,
      };
    case JOIN_TEAM_TASK_SUCCESS:
    case COMPLETED_TASK_SUCCESS:
      return {
        ...state,
        loading: false,
        alltask: action.payload,
      };

    case JOIN_TEAM_TASK_FAIL:
    case COMPLETED_TASK_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

//   export const editTaskReducer = (state = initialState, action) => {
//     switch (action.type) {
//       case COMPLETE_TASK_START:
//         return {
//           loading: true,
//         };
//       case COMPLETE_TASK_SUCCESS:
//         return {
//           ...state,
//           loading: false,
//           alltask: action.payload,
//         };

//       case COMPLETE_TASK_FAIL:
//         return {
//           ...state,
//           loading: false,
//           error: action.payload,
//         };
//       default:
//         return state;
//     }
//   };

  export const deleteTeamReducer = (state = initialState, action) => {
    switch (action.type) {
      case DELETE_TEAM_START:
        return {
          loading: true,
        };
      case DELETE_TEAM_SUCCESS:
        return {
          ...state,
          loading: false,
          alltask: action.payload,
        };

      case DELETE_TEAM_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
