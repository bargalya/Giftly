import { DbService } from './../services/db.service';
import { Gift, GiftStatus } from './../models/gift.class';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Event } from '../models/event.class';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.scss']
})
export class NewEventComponent implements OnInit {
  _event:Event;
  myForm: FormGroup;
  constructor(private readonly dbService: DbService, private fb: FormBuilder, private cd: ChangeDetectorRef) { }
  
  _gifts: Array<Gift> = new Array<Gift>();
  ngOnInit() {
    var URL_REGEXP = /^[A-Za-z][A-Za-z\d.+-]*:\/*(?:\w+(?::\w+)?@)?[^\s/]+(?::\d+)?(?:\/[\w#!:.?+=&%@\-/]*)?$/;
    this.myForm = this.fb.group({
      name: ['', [
        Validators.required,
      ]],
      description: '',
      date:'',
      giftUrl:['', [
        //Validators.required,
        Validators.pattern(URL_REGEXP)
      ]],
    })
  }
  
  get name() {
    return this.myForm.get('name');
  }

  get giftUrl() {
    return this.myForm.get('giftUrl');
  }

  addGift() : void  {
    var giftUrl = this.myForm.get('giftUrl').value;
    if(giftUrl == "")
      return;
    this._gifts.push(new Gift(giftUrl, GiftStatus.ReadyForGrabs));
    this.myForm.get('giftUrl').setValue("");
    //this.myForm.get('giftUrl').markAsUntouched(); //This didn't work :(
    this.cd.detectChanges();
  }

  removeGift(gift:Gift) : void{
    this._gifts = this._gifts.filter(obj => obj !== gift);
  }

  createEvent() : void {
    var eventName = this.myForm.get('name').value;
    var description = this.myForm.get('description').value;
    var date = this.myForm.get('date').value;
    this._event = new Event(eventName, description, date, this._gifts);
    this.dbService.saveEvent(this._event);
  }
}
