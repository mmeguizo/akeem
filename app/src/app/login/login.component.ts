
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
    // sgs.setBrowserTitle.emit('Login');
    // this.createForm();
  }

  ngOnInit() {

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
    // Create user object from user's input
    const user = {
      username: this.form.get('username').value, // Username input field
      password: this.form.get('password').value // Password input field
    }

    // Function to send login data to API
    this.authService.login(user).subscribe((data: any) => {

      // Check if response was a success or error
      if (!data.success) {
        // this.messageClass = 'alert alert-danger'; // Set bootstrap error class
        // this.message = data.message; // Set error message
        //  this.toastr.error('Failed', data.message);
        this.authService.makeToast('error', 'Failed', data.message);


        this.processing = false; // Enable submit button
        this.enableForm(); // Enable form for editting



      } else {
        // this.messageClass = 'alert alert-success'; // Set bootstrap success class
        // this.message = data.message; // Set success message
        //  this.toastr.success('Success', data.message);
        this.authService.makeToast('success', 'Success', data.message);

        // Function to store user's token in client local storage
        this.authService.storeUserData(data.token, data.user, data.userToken);


        // if (this.authService.CurrentlyloggedIn()) {
        //   console.log(this.authService.CurrentlyloggedIn());
        //   setTimeout(() => {
        //     this.router.navigate([data.role]); // Navigate to dashboard view
        //   }, 1000);

        // } else {
        //   this.authService.logout()
        //   this.router.navigate(['login']); // Navigate to dashboard view
        // }

        // After 2 seconds, redirect to dashboard page

      }
    });
  }


  showBootstrapModal() {
  }

}
