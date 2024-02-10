import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Book } from '../model/Book';
import { NotificationService } from './notification.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class LibraryService {
  constructor(
    private http: HttpClient,
    private notifi: NotificationService,
    private router: Router,
    private location: Location
  ) {}
  rootURL = `http://${window.location.hostname}:8080/api`;
  len: number = Math.floor(Math.random() * 1330) + 1;

  addUser(user: any) {
    this.http.post(this.rootURL + '/signup', user).subscribe((res: any) => {
      if (res !== false)
        this.notifi.showSuccess('Signed up successfully', 'Library.io');
      else this.notifi.showError('Error while signing up ', 'library.io');
      console.log(res);
    });
  }
  addBook(book: string, file: File): Observable<Book> {
    const formData = new FormData();
    formData.append('book', book);
    formData.append('file', file);

    return this.http.post<Book>(`${this.rootURL}/admin/upload`, formData);
  }
  updateBook(book: Book): Observable<Book> {
    return this.http.post<Book>(`${this.rootURL}/admin/addBook`, book);
  }
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.rootURL + '/admin/books');
  }
  getUsers() {
    this.http.get(this.rootURL + '/admin/');
  }
  deleteBook(id: number) {
    this.http.delete(`${this.rootURL}/admin/deleteBook/${id}`).subscribe();
  }
  searchBooks(bookName: string): Observable<Book[]> {
    let httpParams = new HttpParams();
    httpParams = httpParams.append('bookName', bookName);
    return this.http.get<Book[]>(`${this.rootURL}/student/searchBooks`, {
      params: httpParams,
    });
  }
  lendBook(userId: number, bookId: number) {
    this.http
      .post(`${this.rootURL}/student/lend-book`, {
        userId: userId,
        bookId: bookId,
      })
      .subscribe();
  }
  getLendBooks(userId: number) {
    return this.http.get(`${this.rootURL}/student/lend-book`, {
      params: {
        userId: userId,
      },
    });
  }
  returnBook(userId: number, bookId: number) {
    this.http
      .delete(`${this.rootURL}/student/return-book`, {
        body: {
          userId: userId,
          bookId: bookId,
        },
      })
      .subscribe();
  }
  getThirukural() {
    let httpParam = new HttpParams();
    httpParam = httpParam.append('num', this.len);
    return this.http.get(`https://api-thirukkural.vercel.app/api`, {
      params: httpParam,
    });
  }

  getBook(bookId: number) {
    return this.http.get(`${this.rootURL}/admin/book/${bookId}`);
  }

  togglePass() {
    const pass = <HTMLInputElement>document.getElementById('password');
    const confirm = <HTMLInputElement>(
      document.getElementById('confirmPassword')
    );
    pass.type = pass.type === 'password' ? 'text' : 'password';
    if (confirm) {
      confirm.type = confirm.type === 'password' ? 'text' : 'password';
    }
  }
  auth(user: any) {
    this.http.post(this.rootURL + '/login', user).subscribe((res: any) => {
      if (res.userId) localStorage.setItem('userId', res.userId);
      if (res.msg === 'ADMIN') {
        this.router.navigate(['/admin']);
      } else if (res.msg === 'USER') {
        this.router.navigate(['/user']);
      } else {
        this.notifi.showError('Invalid Login Credentials', 'Library.io');
      }
    });
  }
  logout() {
    this.router.navigate(['/']);
  }
  goBack() {
    this.location.back();
  }
}
