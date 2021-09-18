  import * as x from "../reducers/user.reducer"
  import {
    createReducer,
    on,
    createSelector,
    createFeatureSelector,
  } from '@ngrx/store';

// export const getUserState = createFeatureSelector<x.any>("user")
export const getState = createFeatureSelector<any>('user');