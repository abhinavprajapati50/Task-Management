import { combineReducers } from "redux";
import { userReducer } from "./Reducer";

export const roootReduser = combineReducers({
    user: userReducer
})