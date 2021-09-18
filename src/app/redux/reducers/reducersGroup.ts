import { IUser } from './../../models/user.model';
import { combineReducers } from '@ngrx/store';
import { counterReducer } from './operations.reducer';
import { userReducer } from './user.reducer';

export const reducerGroup = combineReducers({
  // counter: counterReducer,
  user: userReducer,
});
