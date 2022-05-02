import { createAction, props } from '@ngrx/store';
import { DvachThread } from '../models/threads.model'

export const LOAD_THREAD_REQUEST = createAction('[App] Load Thread Request', props<{ url: string}>());
export const LOAD_THREAD_FAILURE = createAction('[App] Load Thread Failure', props<{ error: string}>());
export const LOAD_THREAD_SUCCESS = createAction('[App] Load Thread Success', props<{ thread: DvachThread}>());

export const UPDATE_THREAD_REQUEST = createAction('[App] Update Thread Request', props<{ threadID: number, threadURL: string}>());
export const UPDATE_THREAD_FAILURE = createAction('[App] Update Thread Failure', props<{ error: string}>());
export const UPDATE_THREAD_SUCCESS = createAction('[App] Update Thread Success', props<{ threadID: number, thread: DvachThread}>());

export const CHANGE_SELECTED_THREAD = createAction('[App] Change Selected Thread', props<{ id: number}>());
export const DELETE_THREAD = createAction('[App] Delete Thread', props<{ id: number}>());