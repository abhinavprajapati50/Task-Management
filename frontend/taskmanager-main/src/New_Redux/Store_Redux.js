// import { applyMiddleware, createStore } from "redux";
// import thunk from "redux-thunk";
// import logger from "redux-logger";

//
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { rootReduser } from "./RootReducers";

const persistConfig = {
  key: "root",
  storage,
};
// const middlware = [thunk];

// if (process.env.NODE_ENV !== "development") {
//   middlware.push(logger);
// }

const middleware = [thunk];
const persistedReducer = persistReducer(persistConfig, rootReduser);
let store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);
let persistor = persistStore(store);

export { store, persistor };

// export const store = createStore(rootReduser, applyMiddleware(...middlware));
