import { Gift, GiftStatus } from './../models/gift.class';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Event } from '../models/event.class';
@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.scss']
})
export class NewEventComponent implements OnInit {
  _event:Event;
  constructor(private cd: ChangeDetectorRef) { }
  
  _gifts: Array<Gift> = new Array<Gift>();
  ngOnInit() {
  }


  addGift() : void  {
    var giftUrl = (document.getElementById("gift-url") as HTMLInputElement).value;
    try{
    var v = new URL(giftUrl, );
    }
    catch{
      return;
    }
    this._gifts.push(new Gift(giftUrl, GiftStatus.ReadyForGrabs));
    this.cd.detectChanges();
  }

  removeGift(gift:Gift) : void{
    this._gifts = this._gifts.filter(obj => obj !== gift);
  }

  createEvent() : void {
    var name = (document.getElementById("event-name") as HTMLInputElement).value;
    var description = (document.getElementById("event-description") as HTMLInputElement).value;
    this._event = new Event(name, description, this._gifts);
    //TODO:send the event to BE and save in the DB
  }
}
