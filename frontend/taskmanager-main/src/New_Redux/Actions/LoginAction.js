import axios from "axios";
import React from "react";
import { LOGIN_FAIL, LOGIN_START, LOGIN_SUCCESS } from "../ActionTypes";

export const LoginAction =
  ({ email, password }) =>
  async (dispatch) => {
    await dispatch({ type: LOGIN_START });
    try {
      const result = await axios.post("http://localhost:5000/signin", {
        email,
        password,
      });
        console.log(result);
      if (result.data.status == false) {
        return dispatch({
          type: LOGIN_FAIL,
          isLoggedIn: false,
          payload: result.data.message,
        });
      } else {
        localStorage.setItem("token", result.data.token);
        // toast.success(`Welcome ${result.data.data} `);
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
