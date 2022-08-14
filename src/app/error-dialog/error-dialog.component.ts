import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs'
import { Store } from '@ngrx/store';
import { AppState } from '../store';
import { CLOSE_ERROR } from '../store/actions/error.actions';
import { ErrorReducerState } from '../store/reducers/error.reducer';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.less']
})
export class ErrorDialogComponent implements OnInit {

  errorState: ErrorReducerState;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.fetchData();
    this.autohideErrorAlert();
  }

  fetchData(): void {
    const errorState$: Subscription = this.store.select('error').subscribe(data => this.errorState = data);
  }

  autohideErrorAlert(): void {
    setTimeout(() => this.store.dispatch(CLOSE_ERROR()), 5000)
  }

  closeErrorAlert(): void {
    this.store.dispatch(CLOSE_ERROR())
  }

}
