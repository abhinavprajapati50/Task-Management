import { combineReducers } from "redux";
import { userReducer } from "./Reducer";

export const rootReduser = combineReducers({
    user: userReducer
})