import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-second-step',
  templateUrl: './register-second-step.component.html',
  styleUrls: ['./register-second-step.component.css']
})
export class RegisterSecondStepComponent implements OnInit {
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
    this.register2Details.emit(this.signupForm.value);

  }
}
