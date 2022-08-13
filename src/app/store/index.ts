import {
	ActionReducerMap,
	createFeatureSelector,
	createSelector,
} from '@ngrx/store';

import { ThreadReducerState, threadReducer } from './reducers/threads.reducer'
import { ViewerReducerState, viewerReducer } from './reducers/viewer.reducer';
import { OptionsReducerState, optionsReducer } from './reducers/options.reducer'
import { SavesReducerState, savesReducer } from './reducers/saves.reducer'
import { ErrorReducerState, errorReducer } from './reducers/error.reducer';

export interface AppState {
	threads: ThreadReducerState
	viewer: ViewerReducerState
	options: OptionsReducerState
	saves: SavesReducerState
	error: ErrorReducerState
}

export const rootReducer: ActionReducerMap<AppState> = {
  threads: threadReducer,
	viewer: viewerReducer,
	options: optionsReducer,
	saves: savesReducer,
	error: errorReducer
};
