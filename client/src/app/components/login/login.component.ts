import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomersService } from 'src/app/services/customers.service';
import { LoginStateService } from 'src/app/services/states/login-state.service';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ServerError } from 'src/app/models/serverError';

@UntilDestroy()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: UntypedFormGroup;
  isLoggedInCustomer: boolean = false;
  loginFailed = false;
  loginErrorMsg = '';

  constructor(private loginStateService: LoginStateService, private customersService: CustomersService, private router: Router) { }

  ngOnInit(): void {
    this.loginStateService.getLoggedInCustomerState().pipe(untilDestroyed(this)).subscribe(loggedInCustomer => this.isLoggedInCustomer = Boolean(loggedInCustomer))
    this.loginForm = new UntypedFormGroup({
      'email': new UntypedFormControl(null, Validators.required),
      'password': new UntypedFormControl(null, Validators.required),
    })
  }

  onLoginClicked() {
    const customerLoginData = { email: this.loginForm.value.email, password: this.loginForm.value.password }
    this.customersService.login(customerLoginData).subscribe({
        next: (cartState) => {
          if (!cartState) {
            this.router.navigate(['/shopping/admin'])
          }
        },
        error: (error: ServerError) => {
          if (!error.shouldDisplay) return
          this.loginFailed = true;
          this.loginErrorMsg = error.msg;
        }
      })
  }

  onSignUpClicked() {
    this.router.navigate(['/register'])
  }
}
