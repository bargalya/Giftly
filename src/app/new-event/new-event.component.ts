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
  constructor(private fb: FormBuilder, private cd: ChangeDetectorRef) { }
  
  _gifts: Array<Gift> = new Array<Gift>();
  ngOnInit() {
    this.myForm = this.fb.group({
      name: ['', [
        Validators.required,
      ]],
      description: '',
      date:'',
      giftUrl:''
    })
  }
  
  get name() {
    return this.myForm.get('name');
  }

  addGift() : void  {
    var giftUrl = this.myForm.get('giftUrl').value;
    /*try{
    var v = new URL(giftUrl, );
    }
    catch{
      return;
    }*/
    this._gifts.push(new Gift(giftUrl, GiftStatus.ReadyForGrabs));
    this.cd.detectChanges();
  }

  removeGift(gift:Gift) : void{
    this._gifts = this._gifts.filter(obj => obj !== gift);
  }

  createEvent() : void {
    var eventName = this.myForm.get('name').value;
    //if()
    var description = this.myForm.get('description').value;
    var date = this.myForm.get('date').value;
    this._event = new Event(eventName, description, date, this._gifts);
    //TODO:send the event to BE and save in the DB
  }
}
