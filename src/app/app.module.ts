import { DataService } from './services/data.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AgGridModule } from '@ag-grid-community/angular';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { EventsDashboardComponent } from './components/events-dashboard/events-dashboard.component';
import { NewEventComponent } from './components/new-event/new-event.component';
import { EventComponent } from './components/event/event.component';
import { GetGiftStatusPipe } from './components/new-event/new-event.pipe';
import { FindEventComponent } from './components/find-event/find-event.component';

import { LoginComponent } from './components/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RegisterComponent } from './components/register';

import { NavMenuComponent } from './components/nav-menu/nav-menu.component';

import { MatCardModule, MatInputModule, MatButtonModule, MatFormFieldModule,
  MatDatepickerModule, MatNativeDateModule, MatSelectModule, MatButtonToggleModule,
  MatIconModule, 
  MatDialogModule,
  MatTableModule} from '@angular/material';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { FriendEventComponent } from './components/friend-event/friend-event.component';
import { GiftsTableComponent } from './components/gifts-table/gifts-table.component';
import { GetGiftImageId} from './components/gifts-table/gifts-table.pipe';
import { NotifyUserDialogComponent } from './components/notify-user-dialog/notify-user-dialog.component';
import { LogoutComponent } from './components/logout/logout.component';
import { CookieModule } from 'ngx-cookie';
import { EditableUserDetailsComponent } from './editable-user-details/editable-user-details.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';

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
    GetGiftImageId,
    FindEventComponent,
    HomeComponent,
    FriendEventComponent,
    GiftsTableComponent,
    LogoutComponent,
    NotifyUserDialogComponent,
    EditableUserDetailsComponent,
    UpdateUserComponent
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
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatTableModule,
    AgGridModule.withComponents([]),
    CookieModule.forRoot()
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    NotifyUserDialogComponent
  ]
})
export class AppModule { }
