import { Component, OnInit } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-find-event',
  templateUrl: './find-event.component.html',
  styleUrls: ['./find-event.component.scss']
})
export class FindEventComponent implements OnInit {

  constructor(private router: Router) {}

  page_title = "Find Event";

  value = '';

  searchEvent() {
    //TODO: verify event id and permissions
    console.log("guest user is searching for event with id: " + this.value);   
    this.router.navigate(['/friend-event', this.value]);
  }

  ngOnInit() {
  }

}
