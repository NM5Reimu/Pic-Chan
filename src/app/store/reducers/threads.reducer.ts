import { createReducer, on } from '@ngrx/store';
import { LOAD_THREAD_SUCCESS, DELETE_THREAD, CHANGE_SELECTED_THREAD, UPDATE_THREAD_SUCCESS} from '../actions/threads.actions';
import { DvachThread } from '../models/threads.model';

export interface ThreadReducerState {
	threads: DvachThread[]
	selectedThreadID: number
}

const initialState: ThreadReducerState = {
	threads: JSON.parse(localStorage.getItem('savedThread') || '[]') ,
	selectedThreadID: 0
}

export const threadReducer = createReducer(
	initialState,
	on(LOAD_THREAD_SUCCESS, (state: any, { thread }) => ({...state, threads: [...state.threads, thread]})),
	on(UPDATE_THREAD_SUCCESS, (state: any, { threadID, thread }) => ({...state, threads: [...state.threads.slice(0, threadID), thread, ...state.threads.slice(threadID + 1)]})),
	on(DELETE_THREAD, (state: any, { id }) => ({...state, threads: [...state.threads.slice(0, id), ...state.threads.slice(id + 1)], selectedThreadID: 0})),
	on(CHANGE_SELECTED_THREAD, (state: any, { id }) => ({...state, selectedThreadID: id }))
)



