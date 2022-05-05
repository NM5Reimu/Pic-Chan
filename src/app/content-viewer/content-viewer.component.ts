import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('v_wrapper') v_wrapper: ElementRef;

  viewerState: ViewerReducerState;
  viewerCoordinates: DOMRect;
  
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

  mouseStartTracking($event:any): void {
    if($event.button == 0){
      let newCoordinates: DOMRect = $event.target.getBoundingClientRect()
      this.viewerCoordinates = newCoordinates;
    }
    
  }

  mouseEndTracking($event:any): void {
    if($event.button == 0){
      let newCoordinates: DOMRect = $event.target.getBoundingClientRect()
      if(this.viewerCoordinates.x === newCoordinates.x || this.viewerCoordinates.y === newCoordinates.y) this.closeViewer();
    }
    
  }

  contentAutoScaling(contentHeight: number): number {
    const windowHeight = window.innerHeight
    return contentHeight > windowHeight ? windowHeight : contentHeight
  }

  contentZoom($event:any): void {
    $event.preventDefault();

    const styleHeightStr = this.v_wrapper.nativeElement.style.height;
    const currentHeight: number = Number(styleHeightStr.substring(0, styleHeightStr.length - 2)) //"1000px"

    this.v_wrapper.nativeElement.style.height = $event.deltaY > 0 ? `${Math.round(currentHeight * 0.9)}px` : `${Math.round(currentHeight * 1.1)}px`
  }
  
}
