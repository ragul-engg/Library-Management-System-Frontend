import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/model/Book';
import { LibraryService } from 'src/app/service/library.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
})
export class BookComponent implements OnInit {
  book: Book = {
    bookId: -1,
    bookName: '',
    authorName: '',
    price: 1,
  };
  isAlreadyLendBook: boolean = false;

  constructor(
    private service: LibraryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe((res: any) => {
      this.service.getBook(res.bookId).subscribe((res: any) => {
        this.book = res;
      });
    });
  }
  getBook(bookId: number) {
    // this.service.lendBook(parseInt(localStorage.getItem('userId')!), bookId);
    // if (this.lendBookIds.indexOf(bookId) == -1) {
    // this.lendBookIds.push(bookId);
    // this.notifi.showSuccess('Book lent', 'Library.io');
    this.router.navigate(['../payment'], {
      relativeTo: this.route,
      queryParams: {
        bookId: bookId,
        // price: this.books.filter((e) => e.bookId == bookId)[0].price,
      },
    });
    // }
    console.log('dsfa');
  }
  viewBook() {
    this.router.navigate(['../view-book'], {
      relativeTo: this.route,
      queryParams: {
        bookId: this.book.bookId,
      },
    });
  }
}
