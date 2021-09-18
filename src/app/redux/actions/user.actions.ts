import { IUser } from './../../models/user.model';
import { createAction, props } from '@ngrx/store';
export const currentUser = createAction(
  '[Counter Component] Update'
);