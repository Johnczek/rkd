import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {HomepageComponent} from './right-panel/homepage/homepage.component';
import {TrainComponent} from './right-panel/train/train.component';
import {NotFoundComponent} from './right-panel/not-found/not-found.component';

const appRoutes: Routes = [
  { path: '', component: HomepageComponent},
  { path: 'train/:id', component: TrainComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

