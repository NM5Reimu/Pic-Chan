import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

//* NgRx *//
import { Store } from '@ngrx/store';
import { AppState } from '../store';
import { ThreadReducerState } from '../store/reducers/threads.reducer';
import { OptionsReducerState } from '../store/reducers/options.reducer';
import { SavesReducerState } from '../store/reducers/saves.reducer';
import { CHANGE_SELECTED_THREAD, DELETE_THREAD, LOAD_THREAD_REQUEST, UPDATE_THREAD_REQUEST } from '../store/actions/threads.actions'
import { CHANGE_VIEW_MOD, TOGGLE_DARK_THEME, TOGGLE_UPDATE_THREADS, SET_UPDATE_PERIOD } from '../store/actions/options.actions'

//* Dependences for download function *//
import * as JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { DvachThread, DvachFile } from '../store/models/threads.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less']
})
export class SearchComponent implements OnInit{
  
  @ViewChild('OptionsMenu') optionsMenu: ElementRef;
  @ViewChild('TimerInput') timerInput: ElementRef;

  threadsState: ThreadReducerState;
  optionsState: OptionsReducerState;
  savesState: SavesReducerState;

  enterURL: string = '';
  downloadDisable: boolean = false;

  updateTimer: ReturnType<typeof setTimeout>;
  
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.fetchData()
    this.optionsState.updateThreads ? this.startUpdateTimer() : this.stopUpdateTimer();
    this.savesState.savedThreads.length > 0 ? this.loadOldSessionThreads() : console.log('Missing saved threads!')
  }

  fetchData(): void {
    const threadsState$: Subscription = this.store.select('threads').subscribe(data => this.threadsState = data);
    const optionsState$: Subscription = this.store.select('options').subscribe(data => this.optionsState = data);
    const savesState$: Subscription = this.store.select('saves').subscribe(data => this.savesState = data);
  }

  submitURL(url: string): void {
    //! REDO
    url = url.indexOf(".html") > 0 ? url.replace(new RegExp(".html","g"), ".json") : `${url}.json`

    this.store.dispatch(LOAD_THREAD_REQUEST({url}))
    this.enterURL = '';
  }
  
  openOptions(): void {
    let menu = this.optionsMenu.nativeElement;
    let isOpen = menu.style.display !== 'none' ? true : false;
    menu.setAttribute('style', isOpen ? 'display: none' : 'display: flex');
  }

  changeThread(id: number): void {
    this.store.dispatch(CHANGE_SELECTED_THREAD({id}))
  }

  deleteThread(id: number): void {
    this.store.dispatch(DELETE_THREAD({id}))
  }

  filterContentByViewMod(files: DvachFile[]): DvachFile[] {
    switch (this.optionsState.viewMod) {
      case "all":
        return files

      case "pictures":
        return files.filter((file: DvachFile) => file.type !== 10)

      case "videos":
        return files.filter((file: DvachFile) => file.type === 10)

      default:
        return files;
    }
  }

  downloadThread(id: number): void {
    this.downloadDisable = true;

    const threadFiles: JSZip = new JSZip();

    // * Responce => Blob => File => toZIP
    for (const file of this.filterContentByViewMod(this.threadsState.threads[id].files)) {
      const fileURL = `${file.path}`
      const fileBlob = fetch(fileURL).then(response => response.blob()).then(blob => new File([blob], file.displayname));
      threadFiles.file(file.displayname, fileBlob)
    }

    threadFiles.generateAsync({type:"blob"}).then(content => {
      saveAs(content, this.threadsState.threads[id].title)
      this.downloadDisable = false;
    });
  }

  toggleUpdateThread(): void {
    if(this.optionsState.updateThreads) this.stopUpdateTimer(); else this.startUpdateTimer();
    this.store.dispatch(TOGGLE_UPDATE_THREADS())
  }

  toggleDarkTheme(): void {
    this.store.dispatch(TOGGLE_DARK_THEME())
  }

  changeViewMod(mod: string): void {
    this.store.dispatch(CHANGE_VIEW_MOD({mod: mod}))
  }

  setUpdatePeriod(time: number): void {
    this.stopUpdateTimer();
    time = time < 10 || time > 120 ? 10 : time;
    this.store.dispatch(SET_UPDATE_PERIOD({time: time}))
    if(this.optionsState.updateThreads) this.startUpdateTimer();
  }

  startUpdateTimer(): void {
    if(!this.optionsState.updateThreads) this.stopUpdateTimer();

    this.updateTimer = setInterval(() => {
      this.threadsState.threads.map((thread: DvachThread, id: number) => {
        this.store.dispatch(UPDATE_THREAD_REQUEST({threadID: id, threadURL: thread.threadURL}))
      })
    }, this.optionsState.updatePeriod * 1000)
  }

  stopUpdateTimer(): void {
    clearInterval(this.updateTimer)
  }

  loadOldSessionThreads(): void {
    this.savesState.savedThreads.map((url: string) => {
      this.store.dispatch(LOAD_THREAD_REQUEST({url}))
    })
  }

  validationOptionsInput(evt: any){
    let theEvent = evt || window.event;
    let key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode( key );
    let regex = /[0-9]/;
    if( !regex.test(key) ) {
      theEvent.returnValue = false;
      if(theEvent.preventDefault) theEvent.preventDefault();
    }
  }

}  

