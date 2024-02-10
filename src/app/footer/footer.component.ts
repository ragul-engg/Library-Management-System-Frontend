import { Component, OnInit } from '@angular/core';
import { LibraryService } from '../service/library.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  constructor(private service: LibraryService) {}
  kural: any = {};
  ngOnInit(): void {
    this.service.getThirukural().subscribe((res) => {
      this.kural = res;
    });
  }
}
