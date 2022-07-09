import { Component, OnInit } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { Router } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { CustomerRegistrationData } from 'src/app/models/customerRegistrationData';
import { CustomersService } from 'src/app/services/customers.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  showRegister: number;
  newCustomerRegistrationData: CustomerRegistrationData;
  register1details;

  constructor(private customersService: CustomersService, private router: Router) { }

  ngOnInit(): void {
    this.showRegister = 1;
  }

  onRegister1Completed(register1details) {
    this.showRegister++
    this.register1details = register1details;
  }
  onRegister2Completed(register2details) {
    this.newCustomerRegistrationData = { ...register2details, ...this.register1details }
    this.customersService.addUser(this.newCustomerRegistrationData)
      .subscribe(() => this.router.navigate(['/first']));
  }
}
