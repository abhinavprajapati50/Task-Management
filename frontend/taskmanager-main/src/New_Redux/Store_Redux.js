
//
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { loginReducer } from "./Reducers/LoginReducers";
import { registerReducer } from "./Reducers/RegisterReducers";
import { deleteTaskReducer, editTaskReducer, getAllTaskReducers, updateReducer } from "./Reducers/GetTaskReducers";
import { getJoinTeamTaskReducers, getSingleTeamReducers, teamReducer } from "./Reducers/TeamReducers";
import { getAllProjectReducers, projectsReducer } from "./Reducers/ProjectReducers";
import { getAllProjectTasksJoinReducers } from "./Reducers/ProjectTaskReducer";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  loginReducer: loginReducer,
  registerReducer: registerReducer,
  taskUpdateReducer: updateReducer, 
  getAllTaskReducers: getAllTaskReducers,
  editTaskReducer: editTaskReducer,
  deleteTaskReducer: deleteTaskReducer,
  teamReducer: teamReducer,
  getSingleTeamReducers: getSingleTeamReducers,
  getJoinTeamTaskReducers: getJoinTeamTaskReducers,
  projectsReducer: projectsReducer,
  getAllProjectReducers: getAllProjectReducers,
  getAllProjectTasksJoinReducers:getAllProjectTasksJoinReducers

});

const middleware = [thunk];
const persistedReducer = persistReducer(persistConfig, rootReducer);
let store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);
let persistor = persistStore(store);

export { store, persistor };
