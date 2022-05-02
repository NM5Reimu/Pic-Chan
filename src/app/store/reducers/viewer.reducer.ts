import { createReducer, on } from '@ngrx/store';
import { PostFile } from '../models/threads.model';
import { LOAD_CONTENT, CLOSE_VIEW} from '../actions/viewer.actions'

export interface ViewerReducerState {
	content?: PostFile
	isActive: boolean
}

const initialState: ViewerReducerState = {    
	isActive: false
}

export const viewerReducer = createReducer(
	initialState,
	on(LOAD_CONTENT, (state: any, { file }) => ({...state, content: file, isActive: true})),
	on(CLOSE_VIEW, (state: any) => ({...state, isActive: false})),
)
