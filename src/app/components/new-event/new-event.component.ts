import { NewEventDataService } from './../../services/new-event-data/new-event-data.service';
import { DataService } from 'src/app/services/data.service';
import { Gift, GiftStatus } from 'src/app/models/gift.class';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Event } from 'src/app/models/event.class';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.scss']
})
export class NewEventComponent implements OnInit {
  title = 'New Event';
  event: Event;
  newEventForm: FormGroup;
  constructor(private readonly dataService: DataService, 
    private fb: FormBuilder, 
    private cd: ChangeDetectorRef, 
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

  get name() {
    return this.newEventForm.get('name');
  }

  get giftUrl() {
    return this.newEventForm.get('giftUrl');
  }

  async addGift() {
    const giftUrl = this.newEventForm.get('giftUrl').value;
    if (giftUrl === '') {
      return;
    }
    const gift = await this.dataService.getImgDetails(giftUrl);
    this.gifts.push(gift);
    this.newEventForm.get('giftUrl').setValue('');
    // this.myForm.get('giftUrl').markAsUntouched(); //This didn't work :(
    this.cd.detectChanges();
  }

  removeGift(gift: Gift): void {
    this.gifts = this.gifts.filter(obj => obj !== gift);
  }

  async createEvent() {
    const eventName = this.newEventForm.get('name').value;
    const description = this.newEventForm.get('description').value;
    const date = this.newEventForm.get('date').value;
    this.event = new Event(eventName, description, date, this.gifts);
    this.dataService.saveEvent(this.event);
    console.log("Event " + eventName +" was created");
    this.newEventDataService.data = this.event;
    this.router.navigate(['/event', '']);
  }
}
