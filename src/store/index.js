import { createStore, applyMiddleware, compose } from "redux";
import middleware from "./middleware";
import { rootReducer } from "./reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(middleware))
);
