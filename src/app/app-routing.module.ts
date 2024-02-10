import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { AuthguardGuard } from './service/authguard.guard';
import { SignupComponent } from './signup/signup.component';
import { UserComponent } from './user/user.component';
import { ViewBookComponent } from './booklist/view-book/view-book.component';
import { HomepageComponent } from './homepage/homepage.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { HomeComponent } from './homepage/home/home.component';
import { AboutusComponent } from './homepage/aboutus/aboutus.component';
import { ContactusComponent } from './homepage/contactus/contactus.component';
import { PaymentComponent } from './user/payment/payment.component';
import { EditBooksComponent } from './admin/edit-books/edit-books.component';
import { AddBooksComponent } from './admin/add-books/add-books.component';
import { AddUsersComponent } from './admin/add-users/add-users.component';
import { ViewbooksComponent } from './admin/viewbooks/viewbooks.component';
import { BookComponent } from './booklist/book/book.component';
import { BooklistComponent } from './booklist/booklist.component';
import { UserdashboardComponent } from './user/userdashboard/userdashboard.component';
import { MybooksComponent } from './user/mybooks/mybooks.component';

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      { path: 'aboutus', component: AboutusComponent },
      { path: 'contactus', component: ContactusComponent },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [AuthguardGuard],
    children: [
      { path: '', component: UserdashboardComponent },
      { path: 'books', component: BooklistComponent },
      { path: 'book', component: BookComponent },
      { path: 'view-book', component: ViewBookComponent },
      { path: 'mybooks', component: MybooksComponent },
      { path: 'payment', component: PaymentComponent },
    ],
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthguardGuard],
    children: [
      { path: 'editbook', component: EditBooksComponent },
      { path: 'addbook', component: AddBooksComponent },
      { path: 'adduser', component: AddUsersComponent },
      { path: 'viewbooks', component: ViewbooksComponent },
      { path: 'book', component: BookComponent },
      { path: 'view-book', component: ViewBookComponent },
    ],
  },
  { path: '**', component: PagenotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
