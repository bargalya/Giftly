import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// TODO: maybe this should be in a different filem, that is responsible for all the sends and wating for responses
import { HttpClient } from '@angular/common/http';

// TODO: define in a common file (?)
//const serverAddress = 'http://localhost:3000/';                       

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    
    constructor(
        private formBuilder: FormBuilder,
        private http: HttpClient  
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

        // let formData = new FormData();
        // formData.append('username', this.loginForm.value.username);    
        // formData.append('password', this.loginForm.value.password);

        let formData = {
            userName: this.loginForm.value.username,
            password: this.loginForm.value.password
        }
        

        this.http.post('api/user/' , formData) 
            .subscribe((response) => console.log(response),
                       (error) => console.log(error));

        this.loading = true;        
    }
}
