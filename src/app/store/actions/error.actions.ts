import { createAction, props } from '@ngrx/store';

export const SHOW_ERROR = createAction('[Error Dialog] Show New Error', props<{enabled: boolean, id: number, message: string}>());
export const CLOSE_ERROR = createAction('[Error Dialog] Close Error Alert');