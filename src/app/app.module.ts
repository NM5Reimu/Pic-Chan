/* Core */
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule }   from '@angular/common/http';
import { environment } from 'src/environments/environment';

/* Components */
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { PreviewComponent } from './preview/preview.component';
import { ContentViewerComponent } from './content-viewer/content-viewer.component';
import { FooterComponent } from './footer/footer.component';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';

/* Services */
import { ThreadsService } from './services/threads.service';

/* NgRx Store */
import { StoreModule } from '@ngrx/store';
import { rootReducer } from './store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { ThreadsEffects } from './store/effects/threads.effects';

/* Svistoperdelki */
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';


const devModules = environment.production ? [] : [StoreDevtoolsModule.instrument({ name: 'NgRx PicChan' })];

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    PreviewComponent,
    ContentViewerComponent,
    FooterComponent,
    ErrorDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot(rootReducer), 
    EffectsModule.forRoot([ThreadsEffects]),
    NoopAnimationsModule,
    DragDropModule,
    ...devModules,
  ],
  providers: [ThreadsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
