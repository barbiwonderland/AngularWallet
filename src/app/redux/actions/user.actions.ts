import { IUser } from './../../models/user.model';
import { createAction, props } from '@ngrx/store';
export const dataUser = createAction(
  '[Counter Component] Update',
  props<{ user: IUser[] }>()
);