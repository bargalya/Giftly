import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventsDashboardComponent } from './events-dashboard/events-dashboard.component';
import { NewEventComponent } from './new-event/new-event.component';

const routes: Routes = [{path: 'events-dashboard', component: EventsDashboardComponent}, 
                        {path: 'new-event', component: NewEventComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
