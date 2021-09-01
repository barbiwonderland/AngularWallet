import { dataUser } from './../actions/user.actions';
import { createReducer, on } from '@ngrx/store';
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
  on(dataUser, (state, { user }) => user)
);

export function userReducer(state: any, action:any) {
  return _userReducer(state,action);
}
