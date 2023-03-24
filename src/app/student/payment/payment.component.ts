import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent {
  payment: FormGroup = new FormGroup({
    cardNumber: new FormControl('', [Validators.required]),
    ccvNumber: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required]),
    bookId: new FormControl('', [Validators.required]),
    numberOfDays: new FormControl('', [Validators.required]),
  });
  handlePayment(payment: FormGroup) {
    console.log(payment.value);
  }
}
