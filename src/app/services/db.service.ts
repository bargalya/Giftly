import { Injectable } from '@angular/core';
import { Event } from '../models/event.class';
import { User } from '../models/user.class';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  };

  constructor(private http: HttpClient) { }

  saveEvent(event:Event):void{

  }

  getEvent(eventId:number):Event{
    return null;
  }

  saveUser(user:User):void{
  
        let body = new HttpParams();
        body = body.set('userName', user.UserName);
        body = body.set('password', user.Password);
        body = body.set('email', user.Email);
  
        this.http.post('api/user/' , body, this.httpOptions) 
            .subscribe((response) => console.log(response),
                        (error) => console.log(error));

  }

  getUser(userId:number):User{
    return null;
  }
}
