import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventsDashboardComponent } from './events-dashboard/events-dashboard.component';

const routes: Routes = [{path: 'events-dashboard', component: EventsDashboardComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
