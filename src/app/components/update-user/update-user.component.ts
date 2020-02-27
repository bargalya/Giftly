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
  user: User;
  constructor(
    private formBuilder: FormBuilder,
    private readonly dataService: DataService,
    private readonly sessionService: SessionService,
    private router: Router
  ) { }

  async ngOnInit() {
    const uid = this.sessionService.getUserIdFromsSession();
    console.log("uid: " + uid);
    this.user = await this.dataService.getUserByUid(uid);
    this.updateUserForm = this.formBuilder.group({
      firstName: [this.user.FirstName, Validators.required],
      lastName: [this.user.LastName, Validators.required],
      username: [this.user.UserName, Validators.required],
      password: [this.user.Password, [Validators.required, Validators.minLength(6)]],
      email: [this.user.Email, Validators.required]
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

    this.user.FirstName = this.updateUserForm.value.firstName;
    this.user.LastName = this.updateUserForm.value.lastName;
    this.user.UserName = this.updateUserForm.value.username;
    this.user.Password = this.updateUserForm.value.password;
    this.user.Email = this.updateUserForm.value.email;

    await this.dataService.updateUser(this.user);

    this.router.navigate(['/home']);
  }

}
