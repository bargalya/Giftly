import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { Observable, Subject } from 'rxjs';

const GIFTLY_TOKEN_STR = 'giftly_token';
@Injectable({
  providedIn: 'root'
})
export class SessionService {

  public isloggedIn = new Subject();
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


  isLoggedIn(): boolean {
    const uid = this.getUserIdFromsSession();
    if (uid !== undefined) {     
      return true;
    }    
    return false;
  }
}
