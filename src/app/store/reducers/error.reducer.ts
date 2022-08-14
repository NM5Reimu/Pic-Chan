import { createReducer, on } from '@ngrx/store';

import { SHOW_ERROR, CLOSE_ERROR } from '../actions/error.actions';

export interface ErrorReducerState {
	enabled: boolean
	id: number
	message: string
}

const initialState: ErrorReducerState = {    
	enabled: false,
	id: 0,
	message: ''
}

export const errorReducer = createReducer(
	initialState,
	on(SHOW_ERROR, (state: any, { enabled, id, message}) => ({...state, enabled, id, message})),
	on(CLOSE_ERROR, (state: any) => ({...state, enabled: false, id: 0, message: ''})),
)