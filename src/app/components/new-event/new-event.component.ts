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
  myForm: FormGroup;
  constructor(private readonly dataService: DataService, private fb: FormBuilder, private cd: ChangeDetectorRef, private router: Router) { }

  gifts: Array<Gift> = new Array<Gift>();
  ngOnInit() {
    const URL_REGEXP = /^[A-Za-z][A-Za-z\d.+-]*:\/*(?:\w+(?::\w+)?@)?[^\s/]+(?::\d+)?(?:\/[\w#!:.?+=&%@\-/]*)?$/;
    this.myForm = this.fb.group({
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
    return this.myForm.get('name');
  }

  get giftUrl() {
    return this.myForm.get('giftUrl');
  }

  async addGift() {
    const giftUrl = this.myForm.get('giftUrl').value;
    if (giftUrl === '') {
      return;
    }
    const gift = await this.dataService.getImgDetails(giftUrl);
    this.gifts.push(gift);
    this.myForm.get('giftUrl').setValue('');
    // this.myForm.get('giftUrl').markAsUntouched(); //This didn't work :(
    this.cd.detectChanges();
  }

  removeGift(gift: Gift): void {
    this.gifts = this.gifts.filter(obj => obj !== gift);
  }

  async createEvent() {
    const eventName = this.myForm.get('name').value;
    const description = this.myForm.get('description').value;
    const date = this.myForm.get('date').value;
    this.event = new Event(eventName, description, date, this.gifts);
    const eventId = await this.dataService.saveEvent(this.event);
    console.log("Event " + eventName +" was created with eventId: " + eventId);
    this.router.navigate(['/event', eventId]);
  }
}
