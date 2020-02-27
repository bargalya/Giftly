import { GiftStatus } from './../models/gift.class';
import { Injectable } from '@angular/core';
import { Event } from '../models/event.class';
import { User } from '../models/user.class';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Gift } from '../models/gift.class';
import { SessionService } from './session.service';

const userStr = 'user';
const firstNameStr = 'firstName';
const lastNameStr = 'lastName';
const userNameStr = 'userName';
const passwordStr = 'password';
const emailStr = 'email';
const uidStr = '_id';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  };

  constructor(private http: HttpClient, private readonly sessionService: SessionService) { }

  async getImgDetails(url: string): Promise<Gift> {
    let body = new HttpParams();
    body = body.set('url', url);
    const gift = new Gift(url, GiftStatus.ReadyForGrabs);
    const response = await this.http.post<any>('api/imgservice/' , body, this.httpOptions).toPromise();
    gift.ImgUrl = response['imgUrl'];
    gift.Title = response['imgTitle'];
    return gift;
  }

  async saveEvent(event: Event): Promise<string> {
    let body = new HttpParams();
    body = body.set('description', event.Description);
    body = body.set('name', event.Name);
    body = body.set('date', event.Date.toString());
    body = body.set('gifts', JSON.stringify(event.Gifts));
    const uid = this.sessionService.getUserIdFromsSession();
    body = body.set('uid', uid);
    const response = await this.http.post<any>('api/event/' , body, this.httpOptions)
                    .toPromise()
                    .catch(err => this.handleError(err));
    return response["eventData"]["_id"];
  }

  async getEvent(eventId: string): Promise<Event> {
    const response = await this.http.get('api/event/' + eventId , this.httpOptions)
    .toPromise()
    .catch(err => this.handleError(err));
    
    console.log(response);
    if (response === undefined)
      return null;
    if (response['status'] === 'Failed') {
      console.log(response['message']);
      return null;
    }
    const gifts = await this.getAllGifts(eventId);
    let event = new Event(response['event']['name'], response['event']['description'], response['event']['date'], gifts);
    return event;
  }

  async saveUser(user: User): Promise<string> {
        let body = new HttpParams();
        body = body.set(userNameStr, user.UserName);
        body = body.set(firstNameStr, user.FirstName);
        body = body.set(lastNameStr, user.LastName);
        body = body.set(passwordStr, user.Password);
        body = body.set(emailStr, user.Email);
        const response = await this.http.post<any>('api/user/' , body, this.httpOptions)
                                        .toPromise()
                                        .catch(err => this.handleError(err));
        if (response['status'] === 'Failed') {
          console.log(response['message']);
          return null;
        }
        return response[userStr][uidStr];
  }

  async getUser(userName: string, password: string): Promise<User> {

    let body = new HttpParams();
    body = body.set(userNameStr, userName);
    body = body.set(passwordStr, password);
    const response = await this.http.post<any>('api/user/' + userName , body, this.httpOptions)
                                    .toPromise()
                                    .catch(err => this.handleError(err));
    if (response === undefined) {
      return null;
    }
    const user = new User(response[userStr][firstNameStr],
                          response[userStr][lastNameStr],
                          response[userStr][userNameStr],
                          response[userStr][passwordStr],
                          response[userStr][emailStr]);
    user.Uid = response[userStr][uidStr];
    return user;
  }

  async getUserByUid(uid: string): Promise<User> {

    let body = new HttpParams();
    const response = await this.http.post<any>('api/user/' + uid , body, this.httpOptions)
                                    .toPromise()
                                    .catch(err => this.handleError(err));
    if (response === undefined) {
      return null;
    }
    console.log("response: " + response);
    const user = new User(response[userStr][firstNameStr],
                          response[userStr][lastNameStr],
                          response[userStr][userNameStr],
                          response[userStr][passwordStr],
                          response[userStr][emailStr]);
    user.Uid = response[userStr][uidStr];
    return user;
  }

  async getUserEvents(uid: string): Promise<any> {

    const response = await this.http.get('api/user/events/' + uid , this.httpOptions)
                                    .toPromise()
                                    .catch(err => this.handleError(err));
    let events = response['userEvents'];
    console.log("events: " + JSON.stringify(events));  
    if (response === undefined) {
      return null;
    }
    let eventsArr = new Array();
    events.forEach(event => {new Event(event.name, event.description, event.data, null);
      eventsArr.push(event);
    });
    return eventsArr;
  }

  async getAvailableGifts(eventId: string): Promise<Array<Gift>> {
    const response = await this.http.get('api/gift/' + eventId, this.httpOptions).toPromise();
     let res = this.buildGiftArrayFromPromise(response).filter(x=>x.Status == GiftStatus.ReadyForGrabs);
     return res;
  }

  async getAllGifts(eventId: string): Promise<Array<Gift>> {
    const response = await this.http.get('api/gift/' + eventId, this.httpOptions).toPromise();  
    return this.buildGiftArrayFromPromise(response);
  }

  async getGiftsBoughtByUser(eventId:string, userId:string): Promise<Array<Gift>> {
    var url = 'api/gift/' + eventId + '/' + userId;
    console.log(url);
    const response = await this.http.get(url, this.httpOptions).toPromise();
    return this.buildGiftArrayFromPromise(response);
  }

  private buildGiftArrayFromPromise(promise: Object): Array<Gift> {
    var gifts: Array<Gift> = [];
    promise["gifts"].forEach((gift) => {
      gifts.push(
        new Gift(
          gift["url"],
          gift["status"],
          gift["imgTitle"],
          gift["imgUrl"],
          gift["_id"]
        ));
    });
    return gifts;
  }

  //returns false if the gift is already taken
  async setGiftStatusToTaken(giftId: string, userId: string): Promise<boolean> {
    const body = {'status': GiftStatus.Taken, 'userId': userId};
    var response = await this.http.put('api/gift/' + giftId, body).toPromise()
      .then(() =>  true)
      .catch(() => false);
      return response;
  }

  async setGiftStatusToAvailable(giftId): Promise<boolean> {
    const body = {'status': GiftStatus.ReadyForGrabs};
    const response = await this.http.put('api/gift/' + giftId, body).toPromise()
      .then(() => true)
      .catch((error) => {console.log(error); 
                        return false; });
    return response;
  }

  handleError(response) {
    if (response['status'] === 'Failed') {
      console.log(response['message']);
    }
  }
}
