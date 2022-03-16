import {
  UpdateTask_FAIL,
  UpdateTask_START,
  UpdateTask_SUCCESS,
} from "../ActionTypes";

const initialState = {
  updateTask: [],
};

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
