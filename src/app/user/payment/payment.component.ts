import { Component, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LibraryService } from 'src/app/service/library.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent {
  userId = -1;
  cost = 0;
  payment: FormGroup = new FormGroup({
    cardNumber: new FormControl('', [Validators.required]),
    ccvNumber: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required]),
    bookId: new FormControl('', [Validators.required]),
    numberOfDays: new FormControl('', [Validators.required]),
    totalAmt: new FormControl({ value: 0, disabled: true }, [
      Validators.required,
    ]),
  });
  constructor(
    private route: ActivatedRoute,
    public service: LibraryService,
    private elementRef: ElementRef,
    private router: Router
  ) {
    this.userId = parseInt(localStorage.getItem('userId')!);
  }
  handlePayment(payment: FormGroup) {
    payment.enable();
    console.log(payment.value);
    this.service.lendBook(this.userId, this.payment.value.bookId);
    this.router.navigate(['/user']);
  }
  ngOnInit() {
    this.route.queryParams.subscribe((res: any) => {
      this.payment.patchValue({ bookId: res.bookId });
      this.cost = res.price;
    });
    this.elementRef.nativeElement
      .querySelector('#enterDays')
      .addEventListener('input', () => [this.setTotalAmt()]);
    this.payment.get('bookId')!.disable();
  }
  setTotalAmt() {
    console.log('hel' + this.cost);

    this.payment.patchValue({
      totalAmt: this.payment.value.numberOfDays * this.cost,
    });
  }
  logThis() {
    console.log('Hello world');
  }
}
