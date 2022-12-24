import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, pipe, switchMap, take } from 'rxjs';
import { CustomerRegistrationData } from 'src/app/models/customerRegistrationData';
import { CartService } from 'src/app/services/cart.service';
import { CustomersService } from 'src/app/services/customers.service';
import { CartStateService } from 'src/app/services/states/cart-state.service';
import { LoginStateService } from 'src/app/services/states/login-state.service';

@Component({
  selector: 'app-guest-login',
  templateUrl: './guest-login.component.html',
  styleUrls: ['./guest-login.component.css']
})
export class GuestLoginComponent implements OnInit {
  newGuestData: CustomerRegistrationData = {
    governmentId: 0,
    email: '',
    password: '1234567',
    city: 'Tel Aviv',
    street: 'Rothschild',
    firstName: 'guest',
    lastName: ''
  }
  constructor(private customersService: CustomersService, private router: Router, private loginStateService: LoginStateService, private cartService: CartService, private cartStateService: CartStateService) { }

  ngOnInit(): void {

  }
  onLoginClicked() {
    const guestRegistrationData = this.generateNewGuest()
    this.customersService.addUser(guestRegistrationData).pipe(
      switchMap(() => { return this.loginStateService.getLoggedInCustomerState() }),
      switchMap(customer => { return this.cartService.createNewCart(customer!.id) }
      )
    ).subscribe(() => this.router.navigate(['/shopping']));
  }

  private generateNewGuest() {
    const newGuestRegistrationData = { ...this.newGuestData }
    newGuestRegistrationData.email = `guest_${this.generateRandomString()}@gmail.com`
    return newGuestRegistrationData
  }

  private generateRandomString() {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';
    for (let i = 0; i < 10; i++) {
      randomString += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return randomString;
  }
}
