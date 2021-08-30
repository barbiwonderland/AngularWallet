import { createAction, props } from '@ngrx/store';

export const increment = createAction('[Counter Component] Increment');
export const decrement = createAction('[Counter Component] Decrement');
export const reset = createAction('[Counter Component] Reset');
export const add = createAction(
  '[Counter Component] Add',
  props<{ num: number }>()
);
export const substract = createAction(
  '[Counter Component] Substract',
  props<{ num: number }>()
);
