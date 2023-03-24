import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Book } from 'src/app/model/Book';
import { LibraryService } from 'src/app/service/library.service';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.css'],
})
export class AddUsersComponent {
  @Output() book: EventEmitter<Book> = new EventEmitter<Book>();

  constructor(private service: LibraryService) {}

  addUser: FormGroup = new FormGroup({
    userType: new FormControl('', [Validators.required]),
    userName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    mobileNumber: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]{10}$'),
    ]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
  });

  handleAddUser(form: FormGroup) {
    console.log(form.value);
    this.service.addUser(form.value);
    form.reset();
  }
}
