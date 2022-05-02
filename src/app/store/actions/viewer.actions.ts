import { createAction, props } from '@ngrx/store';
import { PostFile } from '../models/threads.model';

export const LOAD_CONTENT = createAction('[Content Viewer] Load Content To Viewer', props<{file: PostFile}>());
export const CLOSE_VIEW = createAction('[Content Viewer] Close Viewer');
