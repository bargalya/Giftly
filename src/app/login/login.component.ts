import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from './../services/data.service';

// TODO: maybe this should be in a different filem, that is responsible for all the sends and wating for responses
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user.class';               

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    
    constructor(
        private formBuilder: FormBuilder,
        private http: HttpClient,
        private readonly dataService: DataService  
    ) {  }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });        
    }

    // convenience getter for easy access to form fields
    get formControls() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // Debug print
        console.log("submit was called " + this.loginForm.value.username + " password " + this.loginForm.value.password);

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.dataService.getUser(this.loginForm.value.username, this.loginForm.value.password);

        this.loading = true;        
    }
}
