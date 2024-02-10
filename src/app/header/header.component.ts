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
  constructor(private router: Router, private service: LibraryService) {}
  @Output() books: EventEmitter<Book[]> = new EventEmitter<Book[]>();

  handleLogout() {
    this.service.logout();
    localStorage.removeItem('userId');
  }
}
