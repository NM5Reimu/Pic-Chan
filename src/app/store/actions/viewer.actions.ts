import { createAction, props } from '@ngrx/store';
import { DvachFile } from '../models/threads.model';

export const LOAD_CONTENT = createAction('[Content Viewer] Load Content To Viewer', props<{file: DvachFile}>());
export const CLOSE_VIEW = createAction('[Content Viewer] Close Viewer');
