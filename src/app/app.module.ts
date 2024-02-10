import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { AddBooksComponent } from './admin/add-books/add-books.component';
import { AddUsersComponent } from './admin/add-users/add-users.component';
import { AdminComponent } from './admin/admin.component';
import { EditBooksComponent } from './admin/edit-books/edit-books.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { PaymentComponent } from './user/payment/payment.component';
import { UserComponent } from './user/user.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ViewBookComponent } from './booklist/view-book/view-book.component';
import { FooterComponent } from './footer/footer.component';
import { HomepageComponent } from './homepage/homepage.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { HomeComponent } from './homepage/home/home.component';
import { AboutusComponent } from './homepage/aboutus/aboutus.component';
import { ContactusComponent } from './homepage/contactus/contactus.component';
import { ViewbooksComponent } from './admin/viewbooks/viewbooks.component';
import { BookComponent } from './booklist/book/book.component';
import { BooklistComponent } from './booklist/booklist.component';
import { UserdashboardComponent } from './user/userdashboard/userdashboard.component';
import { MybooksComponent } from './user/mybooks/mybooks.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    LoginComponent,
    SignupComponent,
    UserComponent,
    HeaderComponent,
    AddBooksComponent,
    EditBooksComponent,
    PaymentComponent,
    AddUsersComponent,
    ViewBookComponent,
    FooterComponent,
    HomepageComponent,
    PagenotfoundComponent,
    HomeComponent,
    AboutusComponent,
    ContactusComponent,
    ViewbooksComponent,
    BookComponent,
    BooklistComponent,
    UserdashboardComponent,
    MybooksComponent,
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
    PdfViewerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
