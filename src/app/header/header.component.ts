import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Book } from '../model/Book';
import { LibraryService } from '../service/library.service';
import { NotificationService } from '../service/notification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(
    private router: Router,
    private notifi: NotificationService,
    private service: LibraryService
  ) {}
  @Output() books: EventEmitter<Book[]> = new EventEmitter<Book[]>();
  searchBook: FormGroup = new FormGroup({
    searchTerm: new FormControl('', [Validators.required]),
  });

  handleSearch(form: FormGroup) {
    if (form.value.searchTerm !== null) {
      this.service.searchBooks(form.value.searchTerm).subscribe((res) => {
        this.books.emit(res);
      });
      form.reset();
    } else {
      this.service.getBooks().subscribe((res) => {
        this.books.emit(res);
      });
    }
  }
  handleLogout() {
    this.router.navigate(['/']);
    this.notifi.showSuccess('Logout successful', 'Library.io');
  }
}
