import {
  LOGOUT_SUCCESS,
  REGISTER_FAIL,
  REGISTER_START,
  REGISTER_SUCCESS,
} from "../ActionTypes";

const initialState = {
  currentUser: [],
};

export const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_START:
      return {
        loading: true,
      };

    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        currentUser: action.payload,
      };

    case REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LOGOUT_SUCCESS:
      console.log("Logged Out");
      return {};
    default:
      return state;
  }
};
