import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { roootReduser } from "./RootReducers";
import logger from "redux-logger";

const middlware = [thunk];

if (process.env.NODE_ENV !== "development") {
    middlware.push(logger);
}

export const store = createStore(roootReduser, applyMiddleware(...middlware));
