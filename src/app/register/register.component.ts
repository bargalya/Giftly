import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from './../services/data.service';
import { User } from '../models/user.class';

@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,     
        private readonly dataService: DataService   
    ) { }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]],
            email: ['', Validators.required]        
        });
    }

    // convenience getter for easy access to form fields
    get formControls() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.dataService.saveUser(new User(this.registerForm.value.username,
             this.registerForm.value.firstName, 
             this.registerForm.value.lastName, 
             this.registerForm.value.password, 
             this.registerForm.value.email));
        
        this.loading = true;        
    }
}
