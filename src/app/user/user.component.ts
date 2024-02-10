import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Book } from '../model/Book';
import { LibraryService } from '../service/library.service';
import { NotificationService } from '../service/notification.service';
import { PaymentComponent } from './payment/payment.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewBookComponent } from '../booklist/view-book/view-book.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  isadd = true;
  books: Book[] = [];
  lendBookIds: number[] = [];
  toggleView() {
    this.isadd = !this.isadd;
  }

  @ViewChild(ViewBookComponent) viewbook!: ViewBookComponent;
  constructor(
    private service: LibraryService,
    private notifi: NotificationService,
    private router: Router,
    private route: ActivatedRoute
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
    // this.parent = this.child.name;
    console.log(this.lendBookIds);
  }
  setBooks(books: Book[]) {
    this.books = books;
  }
  getBook(bookId: number) {
    // this.service.lendBook(parseInt(localStorage.getItem('userId')!), bookId);
    if (this.lendBookIds.indexOf(bookId) == -1) {
      // this.lendBookIds.push(bookId);
      // this.notifi.showSuccess('Book lent', 'Library.io');
      this.router.navigate(['payment'], {
        relativeTo: this.route,
        queryParams: {
          bookId: bookId,
          price: this.books.filter((e) => e.bookId == bookId)[0].price,
        },
      });
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
  previewBook(bookId: number) {
    this.router.navigate(['view-book'], {
      relativeTo: this.route,
      queryParams: { bookId: bookId, view: 'preview' },
    });
  }
  ngAfterViewInit() {
    // this.viewbook.pdfSrc += 'CGM.docx';
  }
}
