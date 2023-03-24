import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthserviceService {
  constructor() {}

  IsLoggedIn() {
    return localStorage.getItem('JSESSIONID') == null;
  }
}
