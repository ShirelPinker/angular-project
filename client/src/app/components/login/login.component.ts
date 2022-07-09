import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomersService } from 'src/app/services/customers.service';
import { LoginStateService } from 'src/app/services/states/login-state.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  signupForm: FormGroup;
  isLoggedInCustomer: boolean = false;

  constructor(private loginStateService:LoginStateService, private customersService:CustomersService, private router: Router) { }
  
  ngOnInit(): void {
    this.loginStateService.getLoggedInCustomerState().subscribe(loggedInCustomer => {
      if (loggedInCustomer) {
        this.isLoggedInCustomer = true;
      }
    })
    this.signupForm = new FormGroup({
      'email': new FormControl('s@gmail.com', Validators.required),
      'password': new FormControl('1234567', Validators.required),
      })
  }


  onLoginClicked() {
    const customerLoginData = { email: this.signupForm.value.email, password: this.signupForm.value.password }
    this.customersService.login(customerLoginData).subscribe((response)=>{if (!response){
    this.router.navigate(['/shopping/admin'])

    }})
  }

  onSignUpClicked() {
    this.router.navigate(['/register'])
  }
}
