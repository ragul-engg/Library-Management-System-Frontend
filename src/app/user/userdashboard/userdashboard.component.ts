import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css'],
})
export class UserdashboardComponent {
  constructor(private router: Router, private route: ActivatedRoute) {}
  showMyBooks() {
    this.router.navigate(['books'], {
      relativeTo: this.route,
      queryParams: { show: 'mybooks' },
    });
  }
}
