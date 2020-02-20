import { Component, OnInit } from '@angular/core';
import {AllCommunityModules} from '@ag-grid-community/all-modules';
import {Router} from "@angular/router"
import { DataService } from 'src/app/services/data.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-events-dashboard',
  templateUrl: './events-dashboard.component.html',
  styleUrls: ['./events-dashboard.component.scss']
})
export class EventsDashboardComponent implements OnInit {

page_title = "Your events";

displayedColumns: string[] = ['name', 'description', 'eventDate'];
dataSource = [];

modules = AllCommunityModules;

constructor(private router: Router, private readonly dataService: DataService,  private readonly sessionService: SessionService) {}

  async ngOnInit() {
    const uid = this.sessionService.getUserIdFromsSession();
    let events = await this.dataService.getUserEvents(uid);    
    let eventsArr = [];
    events.forEach(event => {
      eventsArr.push({ eventId: event._id, eventName: event.name, eventDesription: event.description, eventDate: this.getDate(event.Date) });
    });    
    this.dataSource = eventsArr;
  }

  getDate(date: Date):string{
    if(date === undefined)
      return "";
    else 
      return date.toString();
  }

  onRowClicked(event){
    this.router.navigate(['/event', event.eventId]);
  }

}
