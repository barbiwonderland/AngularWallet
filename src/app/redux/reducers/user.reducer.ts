import { IUser } from './../../models/user.model';
import { dataUser } from './../actions/user.actions';
import { createReducer, on } from '@ngrx/store';
export const initialState:IUser[]=[];
const _userReducer = createReducer(
  initialState,
  on(dataUser, (state, { user }) => user)
);

export function userReducer(state: IUser[], action:any) {
  return _userReducer(state,action);
}
