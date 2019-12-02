import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login';
import { RegisterComponent } from './register'
import { EventsDashboardComponent } from './events-dashboard/events-dashboard.component';
import { NewEventComponent } from './new-event/new-event.component';

const routes: Routes = [{path: 'events-dashboard', component: EventsDashboardComponent}, 
                        {path: 'new-event', component: NewEventComponent},
			{ path: 'login', component: LoginComponent },
			{ path: 'register', component: RegisterComponent },

  			// otherwise redirect to home
			{ path: '**', redirectTo: '' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
