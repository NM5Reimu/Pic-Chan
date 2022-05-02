import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, map, mergeMap, catchError } from 'rxjs';
import { ThreadsService } from '../../services/threads.service';
import { LOAD_THREAD_REQUEST, LOAD_THREAD_SUCCESS, UPDATE_THREAD_REQUEST, UPDATE_THREAD_SUCCESS } from '../actions/threads.actions';
import { DvachThread, PostFile } from '../models/threads.model';
 
@Injectable()
export class ThreadsEffects {
 
  constructor(
    private actions$: Actions,
    private threadsService: ThreadsService
  ) {}

  loadThread$ = createEffect(() => this.actions$.pipe(
    ofType(LOAD_THREAD_REQUEST),
    mergeMap(action => this.threadsService.loadThread(action.url)
    .pipe(
      map((data:any) => {

        // * Converting the received data to the required type 
        // * and 36 lines of disgusting code

        let threadPosts = data["threads"][0]["posts"];

        let threadFiles: any[] = [];
        threadPosts.map((post:any) => threadFiles.push(...post.files))

        let files = threadFiles.map((file: any): PostFile => 
          new PostFile(
            file.displayname,
            file.fullname,
            file.name,
            file.md5,
            file.path,
            file.thumbnail,
            file.type,
            file.height,
            file.width,
            file.tn_height,
            file.tn_width,
            file.size
          )
        );

        let thread = new DvachThread(
          data.Board,
          data.posts_count,
          data.files_count,
          data.current_thread,
          files,
          data.title,
          action.url
        );

        return LOAD_THREAD_SUCCESS({thread})
      }),
      catchError(() => EMPTY)
    )),
  ))

  updateThread$ = createEffect(() => this.actions$.pipe(
    ofType(UPDATE_THREAD_REQUEST),
    mergeMap(action => this.threadsService.loadThread(action.threadURL)
    .pipe(
      map((data:any) => {

        // * Converting the received data to the required type 
        // * and 36 lines of disgusting code

        let threadPosts = data["threads"][0]["posts"];

        let threadFiles: any[] = [];
        threadPosts.map((post:any) => threadFiles.push(...post.files))

        let files = threadFiles.map((file: any): PostFile => 
          new PostFile(
            file.displayname,
            file.fullname,
            file.name,
            file.md5,
            file.path,
            file.thumbnail,
            file.type,
            file.height,
            file.width,
            file.tn_height,
            file.tn_width,
            file.size
          )
        );

        let thread = new DvachThread(
          data.Board,
          data.posts_count,
          data.files_count,
          data.current_thread,
          files,
          data.title,
          action.threadURL
        );

        return UPDATE_THREAD_SUCCESS({threadID: action.threadID, thread: thread })
      }),
      catchError(() => EMPTY)
    )),
  ))
}