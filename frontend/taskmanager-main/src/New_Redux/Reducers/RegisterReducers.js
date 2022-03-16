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
  console.log("Register -- action ==>>> ", action);
  switch (action.type) {
    case REGISTER_START:
      console.log("Register -- action -- REGISTER_START ==>>> ", action);
      return {
        loading: true,
      };

    case REGISTER_SUCCESS:
      console.log("Register -- action -- REGISTER_SUCCESS ==>>> ", action);
      return {
        ...state,
        loading: false,
        currentUser: action.payload,
      };

    case REGISTER_FAIL:
      console.log("Register -- action -- REGISTER_FAIL ==>>> ", action);
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
