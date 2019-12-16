import { Injectable } from '@angular/core';
import { Event } from '../models/event.class';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  saveEvent(event:Event):void{

  }

  getEvent(eventId:number):Event{
    return null;
  }

  saveUser(user:any):void{//ToDo:change tipe og user from any to User (create User)

  }

  getUser(userId:number):any{//ToDo:change tipe og user from any to User (create User)
    return null;
  }
}
