import { Component, OnInit } from '@angular/core';
import { Book } from '../model/Book';
import { LibraryService } from '../service/library.service';
import { NotificationService } from '../service/notification.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
})
export class StudentComponent implements OnInit {
  isadd = true;
  books: Book[] = [];
  lendBookIds: number[] = [];
  toggleView() {
    this.isadd = !this.isadd;
  }
  constructor(
    private service: LibraryService,
    private notifi: NotificationService
  ) {}
  ngOnInit() {
    this.service.getBooks().subscribe((res) => {
      this.books = res;
    });
    this.service
      .getLendBooks(parseInt(localStorage.getItem('userId')!))
      .subscribe((res: any) => {
        res.forEach((element: any) => {
          this.lendBookIds.push(element.bookId);
        });
      });
    console.log(this.lendBookIds);
  }
  setBooks(books: Book[]) {
    this.books = books;
  }
  getBook(bookId: number) {
    this.service.lendBook(parseInt(localStorage.getItem('userId')!), bookId);
    if (this.lendBookIds.indexOf(bookId) == -1) {
      this.lendBookIds.push(bookId);
      this.notifi.showSuccess('Book lent', 'Library.io');
    }
    console.log(this.lendBookIds);
  }
  returnBook(bookId: number) {
    this.service.returnBook(parseInt(localStorage.getItem('userId')!), bookId);
    if (this.lendBookIds.indexOf(bookId) != -1) {
      this.lendBookIds = this.lendBookIds.filter((ele) => {
        ele != bookId;
      });
      this.notifi.showSuccess('Book returned', 'Library.io');
    }
  }
}
