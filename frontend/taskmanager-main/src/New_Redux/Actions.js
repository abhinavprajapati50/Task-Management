import {LOGIN_FAIL, LOGIN_START, LOGIN_SUCCESS, LOGOUT_SUCCESS, REGISTER_FAIL, REGISTER_START, REGISTER_SUCCESS} from "./ActionTypes";

export const registerStart = () => ({
  type: REGISTER_START,
});

export const registerSuccess = (user) => ({
  type: REGISTER_SUCCESS,
  payload: user,
});
export const registerFail = (error) => ({
    type: REGISTER_FAIL,
    payload: error ||error.message 
});

// -------LOGIN

export const loginStart = () => ({
  type: LOGIN_START,
});

export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});
export const loginFail = (error) => ({
    type: LOGIN_FAIL,
    payload: error ||error.message 
});


export const logout = (user) => ({
    type: LOGOUT_SUCCESS,
    payload:user
})