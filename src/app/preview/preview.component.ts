import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../store'
import { ThreadReducerState } from '../store/reducers/threads.reducer';
import { LOAD_CONTENT } from '../store/actions/viewer.actions'
import { PostFile } from '../store/models/threads.model';
import { OptionsReducerState } from '../store/reducers/options.reducer';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.less']
})
export class PreviewComponent implements OnInit {
  
  threadsState: ThreadReducerState
  optionsState: OptionsReducerState

  mainURL: string = "https://2ch.hk/"


  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    const threadsState$: Subscription = this.store.select('threads').subscribe(data => this.threadsState = data);
    const optionsState$: Subscription = this.store.select('options').subscribe(data => this.optionsState = data);
  }

  openViewer(file: PostFile): void {
    this.store.dispatch(LOAD_CONTENT({file}))
  }
  
  filterContentByViewMod(files: PostFile[]): PostFile[] {
    switch (this.optionsState.viewMod) {
      case "all":
        return files

      case "pictures":
        return files.filter((file: PostFile) => file.type !== 10 && file.type !== 6)

      case "videos":
        return files.filter((file: PostFile) => file.type === 10 || file.type === 6)

      default:
        return files;
    }
  }

}
