import { createReducer, on } from '@ngrx/store';
import { increment, decrement, reset,substract,add } from '../actions/counter.action';
import { dataUser } from '../actions/user.actions';
export const initialState: any = 10;

const _counterReducer = createReducer(
  initialState,
  on(increment, (state) => state + 1),
  on(decrement, (state) => state - 1),
  on(reset, (state) => 0),
  on(add, (state, { num }) => state+num),
  on(substract, (state, { num }) => state - num),
  // on(dataUser, (state, { user }) => user)
);

export function counterReducer(state: any, action: any) {
  return _counterReducer(state, action);
}
