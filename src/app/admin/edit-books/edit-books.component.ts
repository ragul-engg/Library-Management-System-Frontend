import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/model/Book';
import { LibraryService } from 'src/app/service/library.service';

@Component({
  selector: 'app-edit-books',
  templateUrl: './edit-books.component.html',
  styleUrls: ['./edit-books.component.css'],
})
export class EditBooksComponent implements OnInit {
  constructor(
    public service: LibraryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  @Input() book: any = '';

  @Output() Book: EventEmitter<Book> = new EventEmitter<Book>();
  ngOnInit() {
    this.route.queryParams.subscribe((res) => {
      let bookId = res['bookId'];
      this.editBook.patchValue({ bookId: bookId });
      this.service.getBook(bookId).subscribe((res) => {
        this.editBook.patchValue(res);
      });
    });
  }
  editBook: FormGroup = new FormGroup({
    bookId: new FormControl({ value: '', disabled: true }, [
      Validators.required,
    ]),
    bookName: new FormControl(this.book.bookName, [Validators.required]),
    authorName: new FormControl(this.book.authorName, [Validators.required]),
    price: new FormControl(this.book.price, Validators.required),
    bookUrl: new FormControl(''),
  });

  handleEditBook(form: FormGroup) {
    form.enable();

    this.service
      .updateBook({ bookId: this.book.bookId, ...form.value })
      // .addBook(form.value)
      .subscribe((res) => {
        this.Book.emit(res);
      });
    form.reset();
    this.router.navigate(['/admin']);
  }
}
