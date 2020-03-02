import { NewEventDataService } from 'src/app/services/new-event-data/new-event-data.service';
import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { Gift } from 'src/app/models/gift.class';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editable-event-details',
  templateUrl: './editable-event-details.component.html',
  styleUrls: ['./editable-event-details.component.scss']
})
export class EditableEventDetailsComponent implements OnInit {

  //title = 'New Event';
  event: Event;
  @Input() editableEventForm: FormGroup;
  constructor(private readonly dataService: DataService, 
    private fb: FormBuilder, 
    private cd: ChangeDetectorRef, 
    private router: Router, 
    private newEventDataService: NewEventDataService) { }

  gifts: Array<Gift> = new Array<Gift>();
  ngOnInit() {
    // const URL_REGEXP = /^[A-Za-z][A-Za-z\d.+-]*:\/*(?:\w+(?::\w+)?@)?[^\s/]+(?::\d+)?(?:\/[\w#!:.?+=&%@\-/]*)?$/;
    // this.editableEventForm = this.fb.group({
    //   name: ['', [
    //     Validators.required,
    //   ]],
    //   description: '',
    //   date: '',
    //   giftUrl: ['', [
    //     // Validators.required,
    //     Validators.pattern(URL_REGEXP)
    //   ]],
    // });
  }

  get name() {
    return this.editableEventForm.get('name');
  }

  get giftUrl() {
    return this.editableEventForm.get('giftUrl');
  }

  async addGift() {
    const giftUrl = this.editableEventForm.get('giftUrl').value;
    if (giftUrl === '') {
      return;
    }
    const gift = await this.dataService.getImgDetails(giftUrl);
    this.gifts.push(gift);
    this.editableEventForm.get('giftUrl').setValue('');
    // this.myForm.get('giftUrl').markAsUntouched(); //This didn't work :(
    this.cd.detectChanges();
  }

  removeGift(gift: Gift): void {
    this.gifts = this.gifts.filter(obj => obj !== gift);
  }
}
