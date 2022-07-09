import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register2-page',
  templateUrl: './register2-page.component.html',
  styleUrls: ['./register2-page.component.css']
})
export class Register2PageComponent implements OnInit {
  cities = ['Tel Aviv', 'Jerusalem', 'Ramat Gan', 'Haifa', 'Rishon Letzion', 'Petach Tikva', 'Ashdod', 'Natanya', 'Beer Sheva', 'Bnei Brak']
  signupForm: FormGroup;
  @Output() register2Details = new EventEmitter();


  constructor(private router: Router) { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'city': new FormControl(null, Validators.required),
      'street': new FormControl(null, Validators.required),
      'firstName': new FormControl(null, Validators.required),
      'lastName': new FormControl(null, Validators.required)
    })
  }
  onSubmitClicked() {
    console.log(this.signupForm);
    this.register2Details.emit(this.signupForm.value);

  }
}
