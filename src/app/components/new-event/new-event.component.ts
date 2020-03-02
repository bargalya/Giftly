import { NewEventDataService } from './../../services/new-event-data/new-event-data.service';
import { DataService } from 'src/app/services/data.service';
import { Gift } from 'src/app/models/gift.class';
import { Component, OnInit } from '@angular/core';
import { GiftlyEvent } from 'src/app/models/event.class';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.scss']
})
export class NewEventComponent implements OnInit {
  title = 'New Event';
  event: GiftlyEvent;
  newEventForm: FormGroup;
  constructor(private readonly dataService: DataService, 
    private fb: FormBuilder,
    private router: Router, 
    private newEventDataService: NewEventDataService) { }

  gifts: Array<Gift> = new Array<Gift>();
  ngOnInit() {
    const URL_REGEXP = /^[A-Za-z][A-Za-z\d.+-]*:\/*(?:\w+(?::\w+)?@)?[^\s/]+(?::\d+)?(?:\/[\w#!:.?+=&%@\-/]*)?$/;
    this.newEventForm = this.fb.group({
      name: ['', [
        Validators.required,
      ]],
      description: '',
      date: '',
      giftUrl: ['', [
        // Validators.required,
        Validators.pattern(URL_REGEXP)
      ]],
    });
  }

  async createEvent() {
    const eventName = this.newEventForm.get('name').value;
    const description = this.newEventForm.get('description').value;
    const date = this.newEventForm.get('date').value;
    this.event = new GiftlyEvent(eventName, description, date, this.gifts);
    this.dataService.saveEvent(this.event);
    console.log("Event " + eventName +" was created");
    this.newEventDataService.data = this.event;
    this.router.navigate(['/event', '']);
  }
}
