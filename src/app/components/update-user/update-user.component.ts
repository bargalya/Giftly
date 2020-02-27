import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.class';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {

  updateUserForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.updateUserForm = this.formBuilder.group({
      firstName: ['1', Validators.required],
      lastName: ['1', Validators.required],
      username: ['1', Validators.required],
      password: ['123456', [Validators.required, Validators.minLength(6)]],
      email: ['1', Validators.required]
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
