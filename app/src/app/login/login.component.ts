
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../@core/services/auth.service';
import { ConnectionService } from '../@core/services/connection.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: String;
  password: String;
  msg: String;
  loader = false;
  disableSubmit;
  conn;
  userID;

  messageClass;
  message;
  processing = false;
  form: FormGroup;



  constructor(
    public cs: ConnectionService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,

  ) {
    // this.createForm();
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required], // Username field
      password: ['', Validators.required] // Password field
    });
  }

  enableForm() {
    this.form.controls['username'].enable(); // Enable username field
    this.form.controls['password'].enable(); // Enable password field
  }

  disableForm() {
    this.form.controls['username'].disable(); // Disable username field
    this.form.controls['password'].disable(); // Disable password field
  }
  Submit() {
    const user = {
      username: this.username,
      password: this.password,
    };

  }
  // Functiont to submit form and login user
  onLoginSubmit() {

    this.processing = true; // Used to submit button while is being processed
    this.disableForm(); // Disable form while being process
    const user = {
      username: this.form.get('username').value, // Username input field
      password: this.form.get('password').value // Password input field
    }

    // Function to send login data to API
    this.authService.login(user).subscribe((data: any) => {

      // Check if response was a success or error
      if (!data.success) {
        this.authService.makeToast('danger', 'Failed Logging in', data.message);
        this.processing = false; // Enable submit button
        this.enableForm(); // Enable form for editting
      } else {
        this.authService.makeToast('success', 'Success', data.message);
        // Function to store user's token in client local storage
        this.authService.storeUserData(data.token, data.user, data.userToken);
        if (this.authService.CurrentlyloggedIn()) {
            this.authService.loggingIn(data.role)
        } else {
          this.authService.logout()
          this.router.navigate(['login']); // Navigate to dashboard view
        }
        // After 2 seconds, redirect to dashboard page

      }
    });

  }



}
