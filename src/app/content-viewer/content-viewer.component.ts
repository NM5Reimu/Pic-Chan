import { Component, OnInit } from '@angular/core';
import { ViewerReducerState } from '../store/reducers/viewer.reducer'
import { Subscription } from 'rxjs'
import { Store } from '@ngrx/store';
import { AppState } from '../store';
import { CLOSE_VIEW } from '../store/actions/viewer.actions'

@Component({
  selector: 'app-content-viewer',
  templateUrl: './content-viewer.component.html',
  styleUrls: ['./content-viewer.component.less']
})
export class ContentViewerComponent implements OnInit {
  
  viewerState: ViewerReducerState;
  
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    const viewerState$: Subscription = this.store.select('viewer').subscribe(data => this.viewerState = data);
  }

  closeViewer(): void {
    this.store.dispatch(CLOSE_VIEW());
  }
  
}
