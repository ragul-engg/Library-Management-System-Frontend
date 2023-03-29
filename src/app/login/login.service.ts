import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '../service/notification.service';

@Injectable({
  providedIn: 'root',
})
export class LogInService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private notifi: NotificationService
  ) {}
  rootURL = 'http://10.0.137.203:8080/api';
  auth(user: any) {
    this.http.post(this.rootURL + '/login', user).subscribe((res: any) => {
      localStorage.setItem('userId', res.userId);
      if (res.msg === 'ADMIN') {
        this.notifi.showSuccess('Login Successful', 'Library.io');
        this.router.navigate(['/admin']);
      } else if (res.msg === 'USER') {
        this.notifi.showSuccess('Login Successful', 'Library.io');
        this.router.navigate(['/student']);
      } else {
        this.notifi.showError('Login Credentials Invalid', 'Library.io');
      }
    });
  }
  getUsers() {
    return this.http.get(this.rootURL + '/login');
  }
}
