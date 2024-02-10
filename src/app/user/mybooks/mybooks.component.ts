import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/model/Book';
import { LibraryService } from 'src/app/service/library.service';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-mybooks',
  templateUrl: './mybooks.component.html',
  styleUrls: ['./mybooks.component.css'],
})
export class MybooksComponent {
  books: Book[] = [];
  lendBookIds: number[] = [];

  // @ViewChild(PaymentComponent) payment!: PaymentComponent;
  constructor(
    public service: LibraryService,
    private notifi: NotificationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  searchBook: FormGroup = new FormGroup({
    searchTerm: new FormControl('', [Validators.required]),
  });
  ngOnInit() {
    this.service
      .getLendBooks(parseInt(localStorage.getItem('userId')!))
      .subscribe((res: any) => {
        res.forEach((element: any) => {
          // this.books.push(element);
          this.lendBookIds.push(element.bookId);
        });
      });
    this.service.getBooks().subscribe((res: any) => {
      res.forEach((element: Book) => {
        if (this.lendBookIds.indexOf(element.bookId) != -1) {
          this.books.push(element);
        }
      });
      // this.books=res.filter((e:Book)=>this.lendBookIds.indexOf(e.bookId)!=-1))
    });
    // this.route.queryParams.subscribe((querys: any) => {
    //   this.service.getBooks().subscribe((res) => {
    //     this.books = res;
    //     console.log(this.books);
    //     if (querys.show === 'mybooks') {
    //       console.log('das');
    //       this.books = this.books.filter(
    //         (e) => this.lendBookIds.indexOf(e.bookId) !== -1
    //       );
    //     }
    //   });
    // });

    // this.books = this.;
  }
  setBooks(books: Book[]) {
    this.books = books;
  }
  getBook(bookId: number) {
    // this.service.lendBook(parseInt(localStorage.getItem('userId')!), bookId);
    if (this.lendBookIds.indexOf(bookId) == -1) {
      // this.lendBookIds.push(bookId);
      this.router.navigate(['../payment'], {
        relativeTo: this.route,
        queryParams: {
          bookId: bookId,
          price: this.books.filter((e) => e.bookId == bookId)[0].price,
        },
      });
    } else {
      this.notifi.showError('You already has that book', 'E-books');
    }
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
  returnBook(bookId: number) {
    this.service.returnBook(parseInt(localStorage.getItem('userId')!), bookId);
    if (this.lendBookIds.indexOf(bookId) != -1) {
      this.lendBookIds = this.lendBookIds.filter((ele) => {
        ele != bookId;
      });
      this.books = this.books.filter(
        (book: Book) => this.lendBookIds.indexOf(book.bookId) != -1
      );
      this.notifi.showSuccess('Book returned', 'Library.io');
    }
  }
  previewBook(bookId: number) {
    this.router.navigate(['view-book'], {
      relativeTo: this.route,
      queryParams: { bookId: bookId, view: 'preview' },
    });
  }

  viewDetails(bookId: number) {
    this.router.navigate(['../book'], {
      relativeTo: this.route,
      queryParams: { bookId },
    });
  }
}
