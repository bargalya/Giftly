import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.class';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {

  updateUserForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private readonly dataService: DataService,
    private readonly sessionService: SessionService,
    private router: Router
  ) { }

  async ngOnInit() {
    const uid = this.sessionService.getUserIdFromsSession();
    console.log("uid: " + uid);
    const user = await this.dataService.getUserByUid(uid);
    this.updateUserForm = this.formBuilder.group({
      firstName: [user.FirstName, Validators.required],
      lastName: [user.LastName, Validators.required],
      username: [user.UserName, Validators.required],
      password: [user.Password, [Validators.required, Validators.minLength(6)]],
      email: [user.Email, Validators.required]
    });

    this.updateUserForm.valueChanges.subscribe(x=>console.log(x));
  }

  async onSubmit() {
    // stop here if form is invalid
    if (this.updateUserForm.invalid) {
        //InnaToDo: add messagecox!
        console.log("Invalid form!")
        return;
    }

    const user = new User(
        this.updateUserForm.value.firstName,
        this.updateUserForm.value.lastName,
        this.updateUserForm.value.username,
        this.updateUserForm.value.password,
        this.updateUserForm.value.email);
    this.router.navigate(['/home']);
  }

}
