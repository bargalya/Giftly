import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from '@ag-grid-community/angular';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { EventsDashboardComponent } from './events-dashboard/events-dashboard.component';
import { NewEventComponent } from './new-event/new-event.component';
import { GetGiftStatusPipe } from './new-event/new-event.pipe';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,     
    LoginComponent,
    RegisterComponent,     
    EventsDashboardComponent,
    NewEventComponent,
    GetGiftStatusPipe
    ], 
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule, 
    HttpClientModule,
    AgGridModule.withComponents([])
  ],
  providers: [          
  ],  
  bootstrap: [AppComponent]
})
export class AppModule { }
