import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { UserNotification } from 'src/app/models/user-notification.class';

@Component({
  selector: 'app-notify-user-dialog',
  templateUrl: './notify-user-dialog.component.html',
  styleUrls: ['./notify-user-dialog.component.scss']
})
export class NotifyUserDialogComponent{

  constructor(@Inject(MAT_DIALOG_DATA) public notification: UserNotification) {}

}
