import { DataService } from 'src/app/services/data.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Gift } from 'src/app/models/gift.class';
import { Router, ActivatedRoute } from '@angular/router';
import { GiftlyEvent } from 'src/app/models/event.class';
import { CurrentEventDataService } from 'src/app/services/current-event-data/current-event-data.service';
import { NewEventDataService } from 'src/app/services/new-event-data/new-event-data.service';

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.scss']
})
export class UpdateEventComponent implements OnInit {

  title = 'Update Event';
  updateEventForm: FormGroup;
  gifts: Array<Gift> = new Array<Gift>();;
  eventId: string;
  event: GiftlyEvent;

  constructor(private readonly currentEventDataService: CurrentEventDataService, 
    private readonly newEventDataService: NewEventDataService,
    private readonly dataService: DataService,
    private readonly router: Router, 
    private route: ActivatedRoute,
    private fb: FormBuilder) { 
        this.route.params.subscribe(params => {
          this.eventId = params.id;
      });
    }

  async ngOnInit() {

    this.event = await this.currentEventDataService.data;
        
    if(this.event != null)
        this.gifts = this.event.getGifts();

    const URL_REGEXP = /^[A-Za-z][A-Za-z\d.+-]*:\/*(?:\w+(?::\w+)?@)?[^\s/]+(?::\d+)?(?:\/[\w#!:.?+=&%@\-/]*)?$/;
    this.updateEventForm = this.fb.group({
      name: [this.event.Name, [
        Validators.required,
      ]],
      description: this.event.Description,
      date: this.event.Date,
      giftUrl: ['', [
        // Validators.required,
        Validators.pattern(URL_REGEXP)
      ]],
    });
  }

  async updateEvent() {
    const eventName = this.updateEventForm.get('name').value;
    const description = this.updateEventForm.get('description').value;
    const date = this.updateEventForm.get('date').value;
    this.event = new GiftlyEvent(eventName, description, date, this.gifts);
    this.event.EventId = this.eventId;
    this.dataService.updateEvent(this.event);
    console.log("Event " + eventName +" was created");
    this.newEventDataService.data = this.event;
    this.currentEventDataService.data = this.event;
    this.router.navigate(['/event', this.event.EventId]);
  }

}
