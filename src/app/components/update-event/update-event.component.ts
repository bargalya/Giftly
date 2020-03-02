import { DataService } from 'src/app/services/data.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Gift } from 'src/app/models/gift.class';
import { Router, ActivatedRoute } from '@angular/router';
import { GiftlyEvent } from 'src/app/models/event.class';

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.scss']
})
export class UpdateEventComponent implements OnInit {

  title = 'Update Event';
  updateEventForm: FormGroup;
  gifts = [];
  eventId: string;
  event: GiftlyEvent;

  constructor(private readonly dataService: DataService, 
    private readonly router: Router, 
    private route: ActivatedRoute,
    private fb: FormBuilder) { 
        this.route.params.subscribe(params => {
          this.eventId = params.id;
      });
    }


  // gifts: Array<Gift> = new Array<Gift>();
  async ngOnInit() {
    this.event = await this.dataService.getEvent(this.eventId);
        
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

  async createEvent() {
    // const eventName = this.newEventForm.get('name').value;
    // const description = this.newEventForm.get('description').value;
    // const date = this.newEventForm.get('date').value;
    // this.event = new Event(eventName, description, date, this.gifts);
    // this.dataService.saveEvent(this.event);
    // console.log("Event " + eventName +" was created");
    // this.newEventDataService.data = this.event;
    this.router.navigate(['/event', '']);
  }

}
