import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    
    constructor(
        private formBuilder: FormBuilder,
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

<<<<<<< HEAD:src/app/login/login.component.ts
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
=======
        this.dataService.getUser(this.loginForm.value.username, this.loginForm.value.password);
>>>>>>> d548807039fb0de257b82174043f5d6c1848d302:src/app/components/login/login.component.ts

        this.loading = true;        
    }
}
