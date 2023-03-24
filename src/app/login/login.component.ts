import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { LibraryService } from '../service/library.service';
import { LogInService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private login: LogInService) {
    // this.signupService.getUsers().subscribe(result->{
    //   this.data=result;
    // });
  }
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  // user = {
  //   email: '',
  //   password: '',
  // };
  handleLogin(loginForm: FormGroup) {
    console.log(loginForm.value);
    this.login.auth(loginForm.value);
    // this.login.auth(this.user);
    // console.log(this.data);
  }
}
