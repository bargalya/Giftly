import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

const GIFTLY_TOKEN_STR = 'giftly_token';
@Injectable({
  providedIn: 'root'
})
export class SessionService {

  public isloggedIn = new BehaviorSubject<boolean>(false);
  constructor(private cookieService: CookieService) {
    this.isLoggedIn();
   }

  setSession(cvalue) {
    this.cookieService.put(GIFTLY_TOKEN_STR, cvalue);
    this.isloggedIn.next(true);
  }

  deleteSession() {
    this.cookieService.remove(GIFTLY_TOKEN_STR);
    this.isloggedIn.next(false);
  }

  getSession(): string {
    return this.cookieService.get(GIFTLY_TOKEN_STR);
  }

  getUserIdFromsSession(): string {
    return this.cookieService.get(GIFTLY_TOKEN_STR);
  }


  isLoggedIn() {
    const uid = this.getUserIdFromsSession();
    if (uid !== undefined) {     
      this.isloggedIn.next(true);
    } else {
      this.isloggedIn.next(false);
    }
  }
}
