import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/model/Book';
import { LibraryService } from 'src/app/service/library.service';

@Component({
  selector: 'app-view-book',
  templateUrl: './view-book.component.html',
  styleUrls: ['./view-book.component.css'],
})
export class ViewBookComponent implements OnInit {
  @Input() src!: string;
  constructor(private route: ActivatedRoute, public service: LibraryService) {
    this.src = '';
  }
  pdfSrc = `http://localhost:8080/api/student/files/`;
  ngOnInit() {
    // this.pdfSrc +=
    // `/${this.router.snapshot.paramMap.get('name')}` || this.pdfSrc;
    this.route.queryParams.subscribe((res: any) => {
      // this.pdfSrc += `/${res['bookId']}.pdf`;
      this.service.getBook(res.bookId).subscribe((res: any) => {
        this.pdfSrc += res.bookUrl;
      });
    });
    console.log(this.pdfSrc);
  }
  onFileSelected() {
    let $img: any = document.querySelector('#file');

    if (typeof FileReader !== 'undefined') {
      let reader = new FileReader();

      reader.onload = (e: any) => {
        this.pdfSrc = e.target.result;
      };

      reader.readAsArrayBuffer($img.files[0]);
    }
  }
}
