import { Gift, GiftStatus } from './../models/gift.class';
import { Component, OnInit } from '@angular/core';
import {AllCommunityModules} from '@ag-grid-community/all-modules';
import { Event } from '../models/event.class';
import { forEach } from '@angular/router/src/utils/collection';
@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.scss']
})
export class NewEventComponent implements OnInit {

  columnDefs = [
    {headerName: 'URL', field: 'giftUrl' },
    {headerName: 'Status', field: 'status' }
  ]

  giftsList = [ ]

modules = AllCommunityModules;

  constructor() { }

  ngOnInit() {
    var gifts = new Array<Gift>();
    for(let i=0; i<this.giftsList.length; i++){
      gifts.push(new Gift(this.giftsList[i].giftUrl, this.giftsList[i].status)); 
    }
    var name = (document.getElementById("event-name") as HTMLInputElement).value;
    var description = (document.getElementById("event-description") as HTMLInputElement).value;
    this._event = new Event(name, description, gifts);
  }


  addGift() : void  {
    var giftUrl = (document.getElementById("gift-url") as HTMLInputElement).value;
    var totalGifts = [{ giftUrl: giftUrl, status: GiftStatus.ReadyForGrabs}];
    
    var gifts = [];
    if(this._event != null) 
      gifts = this._event.getGifts();
    for(let i=0; i<gifts.length; i++){
      totalGifts.push({ giftUrl: gifts[i].Url, status: gifts[i].Status});
    }
    this.giftsList = totalGifts;
    gifts.push(new Gift(giftUrl, GiftStatus.ReadyForGrabs));
    this._event.setGifts(gifts);
  }

  createEvent() : void {
    //TODO:send the event to BE and save in to the DB
  }
  _event:Event;

}
