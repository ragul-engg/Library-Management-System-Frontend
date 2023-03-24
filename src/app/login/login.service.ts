import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  rootURL = 'http://localhost:8080/api';
  auth(user: any) {
    // this.notifi.showSuccess('Login success', 'Library.io');
    // if (user.email === 'admin@example.com') {
    //   this.router.navigate(['/admin']);
    // } else {
    //   this.router.navigate(['/student']);
    // }
    // return;
    // const httpOptions = {
    //   // headers: new HttpHeaders({ 'Content-Type': 'application/json' }),

    //   withCredentials: true,
    // };

    this.http.post(this.rootURL + '/login', user).subscribe((res: any) => {
      //   const obj = JSON.parse(res);
      //   localStorage.setItem('authorized', res['authorized']);
      // if (res.authorized === 'yes') {
      console.log(res);
      if (res.msg === 'admin') {
        console.log('1');
        this.notifi.showSuccess('Login Successful', 'Library.io');
        this.router.navigate(['/admin']);
      } else if (res.msg === 'student') {
        console.log('2');
        this.notifi.showSuccess('Login Successful', 'Library.io');
        this.router.navigate(['/student']);
      } else {
        this.notifi.showError('Login Credentials Invalid', 'Library.io');
      }
      console.log(res);
    });
  }
  getUsers() {
    return this.http.get(this.rootURL + '/login');
  }
}
