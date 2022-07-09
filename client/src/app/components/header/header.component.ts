import { Component, OnInit } from '@angular/core';
import { LoginStateService } from 'src/app/services/states/login-state.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  introductionName: String;

  constructor(private loginStateService:LoginStateService) { }

  ngOnInit(): void {
    this.loginStateService.getLoggedInCustomerState().subscribe(loggedInCustomer => {
      if (loggedInCustomer == null) {
        this.introductionName = 'guest'
      } else {
        this.introductionName = loggedInCustomer.firstName
      }
    })
  }

}
