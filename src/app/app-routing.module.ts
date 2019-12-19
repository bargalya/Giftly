import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login';
import { RegisterComponent } from './register'
import { EventsDashboardComponent } from './events-dashboard/events-dashboard.component';
import { NewEventComponent } from './new-event/new-event.component';
import { EventComponent } from './event/event.component';
import { FindEventComponent } from './find-event/find-event.component';

const routes: Routes = [{path: 'home', component: HomeComponent}, 	
						{path: 'events-dashboard', component: EventsDashboardComponent}, 
                        {path: 'new-event', component: NewEventComponent},
						{ path: 'login', component: LoginComponent },
						{ path: 'register', component: RegisterComponent },
						{ path: 'event/:id', component: EventComponent },
						{ path: 'find-event', component: FindEventComponent },

						// otherwise redirect to home
						{ path: '**', redirectTo: 'home' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
