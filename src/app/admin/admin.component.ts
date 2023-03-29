import { Component, OnChanges, OnInit } from '@angular/core';
import { Book } from '../model/Book';
import { LibraryService } from '../service/library.service';
import { NotificationService } from '../service/notification.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  currView = 'addBook';
  selectedBook: Book = {
    bookId: 0,
    bookName: '',
    authorName: '',
    price: 0,
  };
  books: Book[] = [];

  constructor(
    private service: LibraryService,
    private notifi: NotificationService
  ) {}
  toggleAddBook() {
    this.currView = 'addBook';
  }
  toggleEditBook() {
    this.currView = 'editBook';
  }
  toggleAddUser() {
    this.currView = 'addUser';
  }
  ngOnInit(): void {
    this.service.getBooks().subscribe((books) => {
      this.books = books;
    });
  }
  addBook(book: Book) {
    this.books.push(book);
  }
  updateBook(book: any) {
    this.books[this.books.indexOf(this.selectedBook)] = book;
    this.toggleAddBook();
    this.notifi.showSuccess('Book updated successfully', 'Library.io');
  }
  setBooks(books: Book[]) {
    this.books = books;
  }
  deleteBook(bookId: number) {
    this.books = this.books.filter((book) => book.bookId !== bookId);
    this.service.deleteBook(bookId);
    this.notifi.showError('Book deleted successfully', 'Library.io');
  }
  editBook(bookId: number) {
    this.toggleEditBook();
    this.selectedBook = this.books.filter((book) => book.bookId == bookId)[0];
  }
}
