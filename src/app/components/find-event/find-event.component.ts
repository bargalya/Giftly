import { Component, OnInit } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { NotifyUserDialogComponent } from '../notify-user-dialog/notify-user-dialog.component';
import { MatDialog } from '@angular/material';
import { NewEventDataService } from 'src/app/services/new-event-data/new-event-data.service';

@Component({
  selector: 'app-find-event',
  templateUrl: './find-event.component.html',
  styleUrls: ['./find-event.component.scss']
})
export class FindEventComponent implements OnInit {

  constructor(private router: Router, private readonly dataService: DataService, 
    private dialog: MatDialog, private newEventDataService: NewEventDataService) {}

  page_title = "Find Event";

  value = '';

  async searchEvent() {
    //TODO: verify permissions
    console.log("guest user is searching for event with id: " + this.value); 
    var event = await this.dataService.getEvent(this.value);
    if(event)  {
      this.newEventDataService.data = event;
      this.router.navigate(['/friend-event', this.value]);
    } else {
      this.dialog.open(NotifyUserDialogComponent, 
        {'data' : 
          {"title" : "There is no such event.", 
          "message" : "Sorry, there is no event with ID: " + this.value + ". Please make sure you have the right event ID."}});
    }
    this.value = '';
  }

  ngOnInit() {
  }

}
