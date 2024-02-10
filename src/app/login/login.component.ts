import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LibraryService } from '../service/library.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(public service: LibraryService) {}
  loginForm = new FormGroup({
    email: new FormControl(localStorage.getItem('lastLoginEmail'), [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('', [Validators.required]),
    checked: new FormControl(true),
  });
  handleLogin(loginForm: FormGroup) {
    if (loginForm.get('checked')!.value) {
      localStorage.setItem('lastLoginEmail', loginForm.get('email')!.value);
    } else {
      localStorage.removeItem('lastLoginEmail');
    }
    this.service.auth(loginForm.value);
  }
}
