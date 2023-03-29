import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LibraryService } from '../service/library.service';
import { NotificationService } from '../service/notification.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  constructor(
    private signupService: LibraryService,
    private router: Router,
    private notifi: NotificationService
  ) {}
  signupForm: FormGroup = new FormGroup({
    role: new FormControl('', [Validators.required]),
    userName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    mobileNumber: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]{10}$'),
    ]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
  });
  handleSignUp(signupForm: FormGroup) {
    if (signupForm.value.password != signupForm.value.confirmPassword) {
      this.notifi.showError("Passwords doesn't match", 'Library.io');
      return;
    }
    this.signupService.addUser(signupForm.value);
    this.router.navigate(['/login']);
  }
}
