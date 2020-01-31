import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';

const GIFTLY_TOKEN_STR = 'giftly_token';
@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private cookieService: CookieService) { }

  setSession(cvalue) {
    this.cookieService.put(GIFTLY_TOKEN_STR, cvalue);
  }

  deleteSession() {
    this.cookieService.remove(GIFTLY_TOKEN_STR);
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
