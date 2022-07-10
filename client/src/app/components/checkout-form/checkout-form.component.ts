import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { CartStateService } from 'src/app/services/states/cart-state.service';
import { CartService } from 'src/app/services/cart.service';
import { CustomersService } from 'src/app/services/customers.service';
import { LoginStateService } from 'src/app/services/states/login-state.service';
import { OrdersService } from 'src/app/services/orders.service';
import { AvailableDeliveyDateValidator } from 'src/app/validators/AvailableDeliveyDateValidator';

@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.css']
})
export class CheckoutFormComponent implements OnInit {
  cities = ['Tel Aviv', 'Jerusalem', 'Ramat Gan', 'Haifa', 'Rishon Letzion', 'Petach Tikva', 'Ashdod', 'Natanya', 'Beer Sheva', 'Bnei Brak']
  signupForm: UntypedFormGroup;
  loggedInUserId: number;
  loggedInUserCity: string;
  loggedInUserStreet: string;
  //cahnge to customer
  cartId;
  constructor(private cartService: CartService, private ordersService: OrdersService, private cartStateService: CartStateService, private loginStateService: LoginStateService, private router: Router, private availabeDeliveryDate: AvailableDeliveyDateValidator, private customersService: CustomersService) { }

  ngOnInit(): void {
    this.cartStateService.getCartState().subscribe(cartState => {
      this.cartId = cartState.cart.id;
    })

    this.loginStateService.getLoggedInCustomerState().pipe(
      switchMap((customer) => {
        this.loggedInUserId = customer.id;
        return this.customersService.getCustomerAddress(customer.id)
      })).subscribe(customerAddress => {
        this.loggedInUserCity = customerAddress.city;
        this.loggedInUserStreet = customerAddress.street;
      })


    this.signupForm = new UntypedFormGroup({
      'city': new UntypedFormControl(null, Validators.required),
      'street': new UntypedFormControl(null, Validators.required),
      'deliveryDate': new UntypedFormControl(null, {
        validators: Validators.required,
        asyncValidators: [this.availabeDeliveryDate.validate.bind(this.availabeDeliveryDate)],
        updateOn: 'blur'
      }),
      'creditCard': new UntypedFormControl(null, {
        validators: [Validators.required, caredidCardValidator()],
        updateOn: 'blur'
      })
    })
  }

  onOrderClicked() {
    const ccLastFourDigit= (this.signupForm.value.creditCard).slice(-4)
    const orderDetails = {
      customerId: this.loggedInUserId,
      cartId: this.cartId,
      deliveryCity: this.signupForm.value.city,
      deliveryStreet: this.signupForm.value.street,
      deliveryDate: this.signupForm.value.deliveryDate,
      creditCard: ccLastFourDigit,
    }
    this.ordersService.addOrder(orderDetails).pipe(
      switchMap(()=>{
        return this.cartService.deActivateCart(this.cartId)
      }))
      .subscribe(() => this.router.navigate(['/receipt']))

  }

  ondblclickCity() {
    let cityIndex;
    for (let i = 0; i < this.cities.length; i++) {
      if (this.cities[i].toLowerCase() == this.loggedInUserCity.toLowerCase()) {
        cityIndex = i;
      }
    }

    this.signupForm.controls['city'].setValue(this.cities[cityIndex]);
  }

  ondblclickStreet() {
    this.signupForm.controls['street'].setValue(this.loggedInUserStreet)
  }



}
export function caredidCardValidator(): ValidatorFn {
  const regex = new RegExp(/^\d{16}$/);

  return (control: AbstractControl): ValidationErrors | null => {
    const enteredCrediCard = (control.value)?.replaceAll(" ", "").replaceAll("-", "")
    const isValidCc = regex.test(enteredCrediCard);
    return isValidCc ? null : { isValidCc: { value: control.value } };
  };
}