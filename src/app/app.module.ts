import { DataService } from './services/data.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AgGridModule } from '@ag-grid-community/angular';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { EventsDashboardComponent } from './events-dashboard/events-dashboard.component';
import { NewEventComponent } from './new-event/new-event.component';
import { EventComponent } from './event/event.component';
import { GetGiftStatusPipe } from './new-event/new-event.pipe';
import { FindEventComponent } from './find-event/find-event.component';

import { LoginComponent } from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RegisterComponent } from './register';

import { NavMenuComponent } from './nav-menu/nav-menu.component';

import { MatCardModule, MatInputModule, MatButtonModule } from '@angular/material';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,    
    NavMenuComponent, 
    LoginComponent,
    RegisterComponent,     
    EventsDashboardComponent,
    NewEventComponent,
    EventComponent,
    GetGiftStatusPipe,
    FindEventComponent,
    HomeComponent
    ], 
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule, 
    HttpClientModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    BrowserAnimationsModule,
    AgGridModule.withComponents([])
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [   
    DataService       
  ],  
  bootstrap: [AppComponent]
})
export class AppModule { }
