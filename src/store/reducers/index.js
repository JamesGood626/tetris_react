import { combineReducers } from "redux";
import { boardReducer } from "./board";

export const rootReducer = combineReducers({
  board: boardReducer
});
