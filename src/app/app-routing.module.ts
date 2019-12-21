import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login';
import { RegisterComponent } from './components/register'
import { EventsDashboardComponent } from './components/events-dashboard/events-dashboard.component';
import { NewEventComponent } from './components/new-event/new-event.component';
import { EventComponent } from './components/event/event.component';
import { FindEventComponent } from './components/find-event/find-event.component';

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
