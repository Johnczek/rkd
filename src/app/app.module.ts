import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LeftPanelComponent } from './left-panel/left-panel.component';
import { RightPanelComponent } from './right-panel/right-panel.component';
import { TrainComponent } from './right-panel/train/train.component';
import { HomepageComponent } from './right-panel/homepage/homepage.component';
import { NotFoundComponent } from './right-panel/not-found/not-found.component';
import {AppRoutingModule} from './app-routing.module';
import {AlertModule} from 'ngx-bootstrap';
import { AlertComponent } from './alert/alert.component';
import {AlertService} from './services/alert.service';

@NgModule({
  declarations: [
    AppComponent,
    LeftPanelComponent,
    RightPanelComponent,
    TrainComponent,
    HomepageComponent,
    NotFoundComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AlertModule.forRoot()
  ],
  providers: [AlertService],
  bootstrap: [AppComponent]
})
export class AppModule {}
