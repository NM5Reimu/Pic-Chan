import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule }   from '@angular/common/http';

/* Components */
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { PreviewComponent } from './preview/preview.component';
import { ContentViewerComponent } from './content-viewer/content-viewer.component';
import { FooterComponent } from './footer/footer.component';

/* Services */
import { ThreadsService } from './services/threads.service';

/* NgRx Store */
import { StoreModule } from '@ngrx/store';
import { rootReducer } from './store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { ThreadsEffects } from './store/effects/threads.effects';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    PreviewComponent,
    ContentViewerComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot(rootReducer), 
    StoreDevtoolsModule.instrument({ name: 'NgRx PicChan' }),
    EffectsModule.forRoot([ThreadsEffects]),
    NoopAnimationsModule,
    DragDropModule
  ],
  providers: [ThreadsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
