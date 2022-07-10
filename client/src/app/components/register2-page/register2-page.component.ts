import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register2-page',
  templateUrl: './register2-page.component.html',
  styleUrls: ['./register2-page.component.css']
})
export class Register2PageComponent implements OnInit {
  cities = ['Tel Aviv', 'Jerusalem', 'Ramat Gan', 'Haifa', 'Rishon Letzion', 'Petach Tikva', 'Ashdod', 'Natanya', 'Beer Sheva', 'Bnei Brak']
  signupForm: UntypedFormGroup;
  @Output() register2Details = new EventEmitter();


  constructor(private router: Router) { }

  ngOnInit(): void {
    this.signupForm = new UntypedFormGroup({
      'city': new UntypedFormControl(null, Validators.required),
      'street': new UntypedFormControl(null, Validators.required),
      'firstName': new UntypedFormControl(null, Validators.required),
      'lastName': new UntypedFormControl(null, Validators.required)
    })
  }
  onSubmitClicked() {
    console.log(this.signupForm);
    this.register2Details.emit(this.signupForm.value);

  }
}
