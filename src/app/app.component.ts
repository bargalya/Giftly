import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'giftly';

  constructor(private http: HttpClient) {
    // this.http.get('api/user/37362').subscribe(res => {console.log('BE result:', res)});
  }
}
