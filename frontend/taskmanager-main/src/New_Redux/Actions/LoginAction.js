import axios from "axios";
import React from "react";
import { LOGIN_FAIL, LOGIN_START, LOGIN_SUCCESS } from "../ActionTypes";

export const LoginAction =
  ({ email, password, role }) =>
  async (dispatch) => {
    await dispatch({ type: LOGIN_START });
    debugger
    try {
      const result = await axios.post("http://localhost:5000/signin", {
        email,
        password,
        role
      });
      if (result.data.status == false) {
        return dispatch({
          type: LOGIN_FAIL,
          isLoggedIn: false,
          payload: result.data.message,
        });
      } else {
        console.log("-----------------------==========<<<<<<<", result.data);
        
        localStorage.setItem("token", result.data.token);
        // localStorage.setItem("tokens", result.data.data);
        // localStorage.setItem({email:result.data.data.email, role: result.data.data.role});
        return dispatch({
          type: LOGIN_SUCCESS,
          isLoggedIN: true,
          payload: result.data.data ? result.data.data : "",
        });
      }
    } catch (error) {
      return dispatch({
        type: LOGIN_FAIL,
        isLoggedIn: false,
        payload: error || error.message,
      });
    }
  };
