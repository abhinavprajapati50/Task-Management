import types, {
  LOGIN_FAIL,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGOUT_START,
  LOGOUT_SUCCESS,
  REGISTER_FAIL,
  REGISTER_START,
  REGISTER_SUCCESS,
  UpdateTask_FAIL,
  UpdateTask_SUCCESS,
} from "./ActionTypes";
const initialState = {
  loading: false,
  currentUser: null,
  error: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_START:
    case LOGIN_START:
    case LOGOUT_START:
      return {
        ...state,
        loading: true,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
    case UpdateTask_SUCCESS:
    case LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        currentUser: action.payload,
      };

    case REGISTER_FAIL:
    case LOGIN_FAIL:
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
