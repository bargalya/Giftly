import { Component, OnInit } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-find-event',
  templateUrl: './find-event.component.html',
  styleUrls: ['./find-event.component.scss']
})
export class FindEventComponent implements OnInit {

  page_title = "Find Event";

  value = '';

  searchEvent() {

    console.debug("guest user is searching for event with id: " + this.value)
    
    }
  constructor() { }

  ngOnInit() {
  }

}
