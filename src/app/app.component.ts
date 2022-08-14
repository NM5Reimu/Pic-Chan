import { Component } from '@angular/core';
import { Subscription } from 'rxjs'
import { Store } from '@ngrx/store';
import { AppState } from './store';
import { ErrorReducerState } from './store/reducers/error.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  errorState: ErrorReducerState;

  constructor(private store: Store<AppState>) { }

  ngOnInit(){
    this.fetchData();
  }

  fetchData(): void {
    const errorState$: Subscription = this.store.select('error').subscribe(data => this.errorState = data);
  }
}

