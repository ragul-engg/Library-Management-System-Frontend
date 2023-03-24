import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { StudentComponent } from './student/student.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { AddBooksComponent } from './admin/add-books/add-books.component';
import { EditBooksComponent } from './admin/edit-books/edit-books.component';
import { ToastrModule } from 'ngx-toastr';
import { PaymentComponent } from './student/payment/payment.component';
import { AddUsersComponent } from './admin/add-users/add-users.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    LoginComponent,
    SignupComponent,
    StudentComponent,
    HeaderComponent,
    AddBooksComponent,
    EditBooksComponent,
    PaymentComponent,
    AddUsersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 1500,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
