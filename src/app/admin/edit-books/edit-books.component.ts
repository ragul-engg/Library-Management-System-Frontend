import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Book } from 'src/app/model/Book';
import { LibraryService } from 'src/app/service/library.service';

@Component({
  selector: 'app-edit-books',
  templateUrl: './edit-books.component.html',
  styleUrls: ['./edit-books.component.css'],
})
export class EditBooksComponent {
  constructor(private service: LibraryService) {}

  @Input() book: any = '';

  @Output() Book: EventEmitter<Book> = new EventEmitter<Book>();

  editBook: FormGroup = new FormGroup({
    bookId: new FormControl({ value: this.book.bookId, disabled: true }, [
      Validators.required,
    ]),
    bookName: new FormControl(this.book.bookName, [Validators.required]),
    authorName: new FormControl(this.book.authorName, [Validators.required]),
    price: new FormControl(this.book.price, Validators.required),
  });

  ngOnChanges() {
    this.editBook.setValue(this.book);
  }

  handleEditBook(form: FormGroup) {
    this.service
      .addBook({ bookId: this.book.bookId, ...form.value })
      .subscribe((res) => {
        this.Book.emit(res);
      });
    form.reset();
  }
}
