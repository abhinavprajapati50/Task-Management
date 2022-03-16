import axios from "axios";
import React from "react";
import { toast } from "react-toastify";
import {
  REGISTER_FAIL,
  REGISTER_START,
  REGISTER_SUCCESS,
} from "../ActionTypes";

export const RegisterActions =
  ({ username, email, password, role }) =>
  async (dispatch) => {
    await dispatch({ type: REGISTER_START });

    try {
      const result = await axios.post("http://localhost:5000/signup", {
        username,
        email,
        password,
        role,
      });
      // console.log("result--=-=--=-=-=-=-=-=-=", result);

      if (result.data.status == false) {
        // toast.error(result.data.message);
        return dispatch({
          type: REGISTER_FAIL,
          isRegistered: false,
          payload: result.data.message,
          loading: false,
        });
      } else {
        localStorage.setItem("token", result.data.token);
        toast.success(result.data.username);
        // console.log("=--------------=-=result.data.data", result);
        return dispatch({
          type: REGISTER_SUCCESS,
          isRegistered: true,
          payload: result.data.data,
          loading: false,
        });
      }
    } catch (error) {
      toast.error(error.message);
      return dispatch({
        type: REGISTER_FAIL,
        isRegistered: false,
        payload: error.message || error,
      });
    }
  };
