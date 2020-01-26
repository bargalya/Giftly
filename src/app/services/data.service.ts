import { GiftStatus } from './../models/gift.class';
import { Injectable } from '@angular/core';
import { Event } from '../models/event.class';
import { User } from '../models/user.class';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Gift } from '../models/gift.class';

const userStr = 'user';
const firstNameStr = 'firstName';
const lastNameStr = 'lastName';
const userNameStr = 'userName';
const passwordStr ='password';
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

  constructor(private http: HttpClient) { }

  async getImgDetails(url: string): Promise<Gift> {
    let body = new HttpParams();
    body = body.set('url', url);
    let gift = new Gift(url, GiftStatus.ReadyForGrabs);
    const response = await this.http.post<any>('api/imgservice/' , body, this.httpOptions).toPromise();
    gift.ImgUrl = response['imgUrl'];
    gift.Title = response['imgTitle'];
    return gift;
  }

  saveEvent(event: Event): void {
    let body = new HttpParams();
    body = body.set('description', event.Description);
    body = body.set('name', event.Name);
    body = body.set('date', event.Date.toString());
    body = body.set('gifts', JSON.stringify(event.Gifts));
    this.http.post('api/event/' , body, this.httpOptions)
        .subscribe((response) => console.log(response),
                    (error) => console.log(error));
  }

  getEvent(eventId: string): Event {
    return null;
  }

  saveUser(user: User): void {
        let body = new HttpParams();
        body = body.set(userNameStr, user.UserName);
        body = body.set(firstNameStr, user.FirstName);
        body = body.set(lastNameStr, user.LastName);
        body = body.set(passwordStr, user.Password);
        body = body.set(emailStr, user.Email);
        this.http.post('api/user/' , body, this.httpOptions)
            .subscribe((response) => console.log(response),
                        (error) => console.log(error));
  }

  async getUser(userName: string, password: string): Promise<User> {

    let body = new HttpParams();
    body = body.set(userNameStr, userName);
    body = body.set(passwordStr, password);
    const response = await this.http.post<any>('api/user/' + userName , body, this.httpOptions).toPromise();
    const user = new User(response[userStr][firstNameStr],
                          response[userStr][lastNameStr],
                          response[userStr][userNameStr],
                          response[userStr][passwordStr],
                          response[userStr][emailStr]);
    user.Uid = response[userStr][uidStr];
    return user;
  }

  async getAvailableGifts(eventId: string): Promise<Array<Gift>> {
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
    return true;
  }
}
