import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

//
import { Store } from '@ngrx/store';
import { AppState } from '..';
import { ThreadReducerState } from '../reducers/threads.reducer';

//
import { map, mergeMap, catchError, tap, Subscription, of } from 'rxjs';
import { ThreadsService } from '../../services/threads.service';
import { DELETE_THREAD, LOAD_THREAD_REQUEST, LOAD_THREAD_SUCCESS, UPDATE_THREAD_REQUEST, UPDATE_THREAD_SUCCESS, LOAD_THREAD_FAILURE } from '../actions/threads.actions';
import { DvachThread, DvachFile, ResponceDvachThread } from '../models/threads.model';
import { SHOW_ERROR } from '../actions/error.actions';
 
@Injectable()
export class ThreadsEffects {
 
  constructor(
    private actions$: Actions,
    private threadsService: ThreadsService,
    private store: Store<AppState>
  ) {}
  
  threadsState: ThreadReducerState;
  threadsState$: Subscription = this.store.select('threads').subscribe(data => this.threadsState = data);

  loadThread$ = createEffect(() => this.actions$.pipe(
    ofType(LOAD_THREAD_REQUEST),
    mergeMap(action => this.threadsService.loadThread(action.url)
    .pipe(
      map((data:ResponceDvachThread) => {

        const thread = new DvachThread(
          data.board.id,
          data.posts_count,
          data.files_count,
          data.current_thread,
          [],
          data.title,
          action.url
        );

        data.threads[0].posts.map((post:{files:DvachFile[]}) => post.files && thread.files.push(...post.files))

        return LOAD_THREAD_SUCCESS({thread})
      }),
      catchError(err => of(SHOW_ERROR({enabled: true, id: 228, message: `Thread loading failure! \n ${action.url}`})))
    )),
  ))

  updateThread$ = createEffect(() => this.actions$.pipe(
    ofType(UPDATE_THREAD_REQUEST),
    mergeMap(action => this.threadsService.loadThread(action.threadURL)
    .pipe(
      map((data:ResponceDvachThread) => {

        const thread = new DvachThread(
          data.board.id,
          data.posts_count,
          data.files_count,
          data.current_thread,
          [],
          data.title,
          action.threadURL
        );

        data.threads[0].posts.map((post:{files:DvachFile[]}) => {
          if(post.files){
            thread.files.push(...post.files)
          }
        })

        return UPDATE_THREAD_SUCCESS({threadID: action.threadID, thread: thread })
      }),
      catchError(err => of(SHOW_ERROR({enabled: true, id: 322, message: `Thread updating failure! \n ${action.threadURL}`})))
    )),
  ))

  saveThreads$ = createEffect(() => this.actions$.pipe(
      ofType(...[LOAD_THREAD_SUCCESS, DELETE_THREAD]),
      tap(() => localStorage.setItem('savedThreads', JSON.stringify(this.threadsState.threads?.map(thread => thread.threadURL) || [] )))
    ),
    { dispatch: false }
  )
}