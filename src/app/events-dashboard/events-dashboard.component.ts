import { Component, OnInit } from '@angular/core';
import {AllCommunityModules} from '@ag-grid-community/all-modules';
import { HttpClient } from '@angular/common/http';
import {Router} from "@angular/router"

@Component({
  selector: 'app-events-dashboard',
  templateUrl: './events-dashboard.component.html',
  styleUrls: ['./events-dashboard.component.scss']
})
export class EventsDashboardComponent implements OnInit {
  columnDefs = [
    {headerName: 'Id', field: 'eventId' },
    {headerName: 'Name', field: 'eventName' },
    {headerName: 'Description', field: 'eventDesription' },
    {headerName: 'EventDate', field: 'eventDate' },
];

rowData = [
    { eventId: 1, eventName: 'Birthday party', eventDesription: "celebrating my birthday", eventDate: '1/02/2020' },
    { eventId: 2, eventName: 'Anniversary celebration', eventDesription: "", eventDate: '1/01/2020' },

  ];

modules = AllCommunityModules;

constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    // this.rowData = this.http.get('https://api.myjson.com/bins/15psn9');
  }

  onRowClicked(event){
    this.router.navigate(['/event', event.data.eventId]);
  }

}
