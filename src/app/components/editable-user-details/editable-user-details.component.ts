import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-editable-user-details',
  templateUrl: './editable-user-details.component.html',
  styleUrls: ['./editable-user-details.component.scss']
})
export class EditableUserDetailsComponent implements OnInit {

  @Input() editUserForm: FormGroup;
  @Input() submitted: boolean;


  constructor( ) { }

  ngOnInit() {
  }
}
