import { Component, OnInit } from '@angular/core';
import { Book } from '../model/Book';
import { LibraryService } from '../service/library.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
})
export class StudentComponent implements OnInit {
  isadd = true;
  books: Book[] = [];
  toggleView() {
    this.isadd = !this.isadd;
  }
  constructor(private service: LibraryService) {}
  ngOnInit() {
    this.service.getBooks().subscribe((res) => {
      this.books = res;
    });
  }
  setBooks(books: Book[]) {
    this.books = books;
  }
}
