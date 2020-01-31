import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { Observable } from 'rxjs';

const GIFTLY_TOKEN_STR = 'giftly_token';
@Injectable({
  providedIn: 'root'
})
export class SessionService {

  isloggedIn: boolean;
  constructor(private cookieService: CookieService) {
    this.isLoggedIn();
   }

  setSession(cvalue) {
    this.cookieService.put(GIFTLY_TOKEN_STR, cvalue);
    this.isLoggedIn();
  }

  deleteSession() {
    this.cookieService.remove(GIFTLY_TOKEN_STR);
    this.isLoggedIn();
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
      this.isloggedIn = true;
      return true;
    }
    this.isloggedIn = false;
    return false;
  }

  getIsLoggedInObservable(): any {
    const isloggegInObservable = new Observable(observer => {
           setTimeout(() => {
               observer.next(this.isloggedIn);
           }, 100);
    });
    return isloggegInObservable;
  }
}
