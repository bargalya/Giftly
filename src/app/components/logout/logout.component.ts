import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private readonly sessionService: SessionService, private router: Router) { }

  ngOnInit() {
    console.log('Logged out');
    this.sessionService.deleteSession();
    this.router.navigate(['/home']);  
  }
}
