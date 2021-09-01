import { createAction, props } from '@ngrx/store';



export const dataUser = createAction(
  '[Counter Component] Update',
  props<{ user: any }>()
);