import { combineReducers } from "@ngrx/store";
import { counterReducer } from "./counter.reducer";
import { userReducer } from "./user.reducer";

export const reducerGroup = combineReducers({
    counter: counterReducer,
    user: userReducer,
  });