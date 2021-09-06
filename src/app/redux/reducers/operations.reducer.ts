import { createReducer, on } from '@ngrx/store';
import { add,  substract } from '../actions/operations.actions';
export const initialState: any = 10;

const _counterReducer = createReducer(
  initialState,
  on(add, (state, { num }) => state+num),
  on(substract, (state, { num }) => state - num),
);

export function counterReducer(state: any, action: any) {
  return _counterReducer(state, action);
}
