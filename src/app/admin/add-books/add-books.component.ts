import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Book } from 'src/app/model/Book';
import { LibraryService } from 'src/app/service/library.service';

@Component({
  selector: 'app-add-books',
  templateUrl: './add-books.component.html',
  styleUrls: ['./add-books.component.css'],
})
export class AddBooksComponent implements OnInit {
  @Output() book: EventEmitter<Book> = new EventEmitter<Book>();

  constructor(
    private service: LibraryService,
    private elementRef: ElementRef
  ) {}

  addBook: FormGroup = new FormGroup({
    bookId: new FormControl('', [Validators.required]),
    bookName: new FormControl('', [Validators.required]),
    authorName: new FormControl('', [Validators.required]),
    price: new FormControl('', Validators.required),
    file: new FormControl(null),
  });

  ngOnInit(): void {
    const addBookData = localStorage.getItem('addBookData');
    if (addBookData) {
      this.addBook.setValue(JSON.parse(addBookData));
    }
    this.addBook.valueChanges.subscribe((res) => {
      localStorage.setItem('addBookData', JSON.stringify(this.addBook.value));
    });
  }

  changeFile(event: any) {
    if (event.target.files && event.target.files.length) {
      this.addBook.patchValue({ file: event.target.files[0] });
    }
  }

  handleAddBook(form: FormGroup) {
    const { file, ...book } = form.value;

    this.service.addBook(JSON.stringify(book), file).subscribe((res) => {
      this.book.emit(res);
    });
    localStorage.removeItem('addBookData');
    form.reset();
  }
}
