import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { User } from 'src/app/models/user.class';
import { SessionService } from 'src/app/services/session.service';

@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private readonly dataService: DataService,
        private readonly sessionService: SessionService,
        private router: Router
    ) { }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]],
            email: ['', Validators.required]
        });

        this.registerForm.valueChanges.subscribe(x=>console.log(x));
    }

    // convenience getter for easy access to form fields
    get formControls() { return this.registerForm.controls; }

    async onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            //InnaToDo: add messagecox!
            console.log("Invalid form!")
            return;
        }

        const user = new User(
            this.registerForm.value.firstName,
            this.registerForm.value.lastName,
            this.registerForm.value.username,
            this.registerForm.value.password,
            this.registerForm.value.email);
        const uid = await this.dataService.saveUser(user);
        if (uid === null) {
            return;
        }
        user.Uid = uid;
        this.sessionService.setSession(user.Uid);
        this.router.navigate(['/home']);
        this.loading = true;
    }
}
