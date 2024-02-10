import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/model/Book';
import { LibraryService } from 'src/app/service/library.service';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-viewbooks',
  templateUrl: './viewbooks.component.html',
  styleUrls: ['./viewbooks.component.css'],
})
export class ViewbooksComponent {
  // currView = 'addBook';
  searchBook: FormGroup = new FormGroup({
    searchTerm: new FormControl('', [Validators.required]),
  });
  selectedBook: Book = {
    bookId: 0,
    bookName: '',
    authorName: '',
    price: 0,
  };
  books: Book[] = [];

  constructor(
    public service: LibraryService,
    private notifi: NotificationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  // toggleAddBook() {
  //   this.currView = 'addBook';
  // }
  // toggleEditBook() {
  //   this.currView = 'editBook';
  // }
  // toggleAddUser() {
  //   this.currView = 'addUser';
  // }
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
    // this.toggleAddBook();
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
    // this.toggleEditBook();
    // this.selectedBook = this.books.filter((book) => book.bookId == bookId)[0];
    this.router.navigate(['admin/editbook'], {
      queryParams: { bookId },
    });
  }
  handleSearch(form: FormGroup) {
    if (form.value.searchTerm !== null) {
      this.service.searchBooks(form.value.searchTerm).subscribe((res) => {
        // this.books.emit(res);
        this.books = res;
      });
    } else {
      this.service.getBooks().subscribe((res) => {
        this.books = res;
      });
    }
    console.log(form.value);
    form.reset();
  }
  viewDetails(bookId: number) {
    this.router.navigate(['../book'], {
      relativeTo: this.route,
      queryParams: { bookId },
    });
  }
}
