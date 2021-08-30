import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/models/user';
import { update } from '../actions/user.actions';
export const initialState:Array<any> =[ {
  user: '',
  password: '',
  email: '',
  surname: '',
  id: '',
  name: '',
}]

const _userReducer = createReducer(
  initialState,
  on(update, (state, { user }) => user)
);

export function userReducer(state: any, action:any) {
  return _userReducer(state,action);
}
