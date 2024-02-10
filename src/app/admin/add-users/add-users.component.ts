import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Book } from 'src/app/model/Book';
import { LibraryService } from 'src/app/service/library.service';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.css'],
})
export class AddUsersComponent implements OnInit {
  @Output() book: EventEmitter<Book> = new EventEmitter<Book>();

  constructor(public service: LibraryService) {}

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

  ngOnInit(): void {
    const addUserData = localStorage.getItem('addUserData');
    if (addUserData) {
      this.addUser.setValue(JSON.parse(addUserData));
    }
    this.addUser.valueChanges.subscribe((res) => {
      localStorage.setItem('addUserData', JSON.stringify(this.addUser.value));
    });
  }
  handleAddUser(form: FormGroup) {
    console.log(form.value);
    this.service.addUser(form.value);
    localStorage.removeItem('addUserData');
    form.reset();
  }
}
