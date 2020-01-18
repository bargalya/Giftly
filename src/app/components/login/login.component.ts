import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { SessionService } from 'src/app/services/session.service';
import { User } from 'src/app/models/user.class';
import { Router } from '@angular/router';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;

    constructor(
        private formBuilder: FormBuilder,
        private readonly dataService: DataService,
        private readonly sessionService: SessionService,
        private readonly router: Router
    ) {  }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    // convenience getter for easy access to form fields
    get formControls() { return this.loginForm.controls; }

    async onSubmit() {
        this.submitted = true;

        // Debug print
        console.log('submit was called ' + this.loginForm.value.username + ' password ' + this.loginForm.value.password);

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        const user = await this.dataService.getUser(this.loginForm.value.username, this.loginForm.value.password);
        if (user === null) {
            alert('Wrong username or password');
            return;
        }
        this.sessionService.setSession(user.Uid);
        this.router.navigate(['/events-dashboard']);
        this.loading = true;
    }
}
