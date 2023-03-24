import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Book } from 'src/app/model/Book';
import { LibraryService } from 'src/app/service/library.service';

@Component({
  selector: 'app-add-books',
  templateUrl: './add-books.component.html',
  styleUrls: ['./add-books.component.css'],
})
export class AddBooksComponent {
  @Output() book: EventEmitter<Book> = new EventEmitter<Book>();

  constructor(private service: LibraryService) {}

  addBook: FormGroup = new FormGroup({
    bookId: new FormControl('', [Validators.required]),
    bookName: new FormControl('', [Validators.required]),
    authorName: new FormControl('', [Validators.required]),
    price: new FormControl('', Validators.required),
  });

  handleAddBook(form: FormGroup) {
    console.log(form.value);
    this.service.addBook(form.value).subscribe((res) => {
      this.book.emit(res);
    });
    form.reset();
  }
}
