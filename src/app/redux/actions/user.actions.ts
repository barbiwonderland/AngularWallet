import { createAction, props } from '@ngrx/store';


export const update = createAction(
  '[Counter Component] Update',
  props<{ user: any }>()
);
