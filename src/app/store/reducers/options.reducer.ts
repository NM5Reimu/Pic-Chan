import { createReducer, on } from '@ngrx/store';
import { CHANGE_VIEW_MOD, TOGGLE_DARK_THEME, TOGGLE_UPDATE_THREADS, SET_UPDATE_PERIOD } from '../actions/options.actions'

export interface OptionsReducerState {
	viewMod: string
	darkTheme: boolean
	updateThreads: boolean
	updatePeriod: number
}

const initialState: OptionsReducerState = {    
	viewMod: 'all', //all, pictures, videos
	darkTheme: false,
	updateThreads: true,
	updatePeriod: 30
}

export const optionsReducer = createReducer(
	initialState,
	on(CHANGE_VIEW_MOD, (state: any, { mod }) => ({...state, viewMod: mod})),
	on(TOGGLE_DARK_THEME, (state: any) => ({...state, darkTheme: !state.darkTheme})),
	on(TOGGLE_UPDATE_THREADS, (state: any) => ({...state, updateThreads: !state.updateThreads})),
	on(SET_UPDATE_PERIOD, (state: any, {time}) => ({...state, updatePeriod: time}))
)