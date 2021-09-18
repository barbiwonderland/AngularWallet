import { IUser } from './../../models/user.model';
import { currentUser } from './../actions/user.actions';
import { createReducer, on } from '@ngrx/store';
const userFromLS = localStorage.getItem('user');
const localID = JSON.parse(localStorage.getItem('id')!);

export const initialState = userFromLS ? JSON.parse(userFromLS) : [];
const _userReducer = createReducer(
  initialState,
  on(currentUser, (state, action) =>
     state.filter((user: any) => user.id === localID)
  )
);

export function userReducer(state: any, action: any) {
  return _userReducer(state, action);
}
