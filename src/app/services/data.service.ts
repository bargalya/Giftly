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

  getImgDetails(url: string, gift: Gift): void {
    let body = new HttpParams();
    body = body.set('url', url);
    this.http.post('api/imgservice/' , body, this.httpOptions)
    .subscribe(
      (response) => {
        console.log({url: response['imgUrl'], title: response['imgTitle']});
        gift.ImgUrl = response['imgUrl'];
        gift.Title = response['imgTitle']; },
      (error) => console.log(error));
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
    console.log('user: ' + response[userStr]);
    const user = new User(response[userStr][firstNameStr],
                          response[userStr][lastNameStr],
                          response[userStr][userNameStr],
                          response[userStr][passwordStr],
                          response[userStr][emailStr]);
    user.Uid = response[userStr][uidStr];
    return user;
  }
}
