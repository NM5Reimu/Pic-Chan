import { createAction, props } from '@ngrx/store';

export const CHANGE_VIEW_MOD = createAction('[Search] Change View Mod', props<{mod: string}>());
export const TOGGLE_DARK_THEME = createAction('[Search] Toggle Dark Theme');
export const TOGGLE_UPDATE_THREADS = createAction('[Search] Toggle Update Threads');
export const SET_UPDATE_PERIOD = createAction('[Search] Set Update Period', props<{time: number}>());