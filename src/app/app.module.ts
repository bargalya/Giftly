import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AgGridModule } from '@ag-grid-community/angular';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { EventsDashboardComponent } from './events-dashboard/events-dashboard.component';
import { NewEventComponent } from './new-event/new-event.component';
import { GetGiftStatusPipe } from './new-event/new-event.pipe';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register';
import { NavMenuComponent } from './nav-menu/nav-menu.component';

@NgModule({
  declarations: [
    AppComponent,    
    NavMenuComponent, 
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
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [          
  ],  
  bootstrap: [AppComponent]
})
export class AppModule { }
