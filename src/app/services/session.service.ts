import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  setSession(cvalue) {
    const d = new Date();
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
    const expires = 'expires=' + d.toUTCString();
    document.cookie = 'token' + '=' + cvalue + ';' + expires + ';path=/';
    console.log('coockie: ' + document.cookie);
  }

  getSession(): string {
    const name = 'token' + '=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let c of ca) {
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  }

  isLoggedIn(): boolean {
    const uid = this.getSession();
    if (uid !== '') {
      // alert('Welcome again ' + username);
      return true; // Todo: validate experation!!
    }
    return false;
  }
}
