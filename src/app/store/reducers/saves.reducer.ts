import { createReducer } from '@ngrx/store';

export interface SavesReducerState {
	savedThreads: string[]
}

const initialState: SavesReducerState = {
	savedThreads: JSON.parse(localStorage.getItem('savedThreads') || '[]') ,
}

export const savesReducer = createReducer(
	initialState
)

//! possible without it