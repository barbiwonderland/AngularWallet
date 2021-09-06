import { createAction, props } from '@ngrx/store';

export const add = createAction(
  '[Counter Component] Add',
  props<{ num: number }>()
);
export const substract = createAction(
  '[Counter Component] Substract',
  props<{ num: number }>()
);
