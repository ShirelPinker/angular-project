import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faSeedling } from '@fortawesome/free-solid-svg-icons';
import { LoginStateService } from 'src/app/services/states/login-state.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  introductionName: String;
  faSeedling= faSeedling;
  constructor(private loginStateService:LoginStateService, private router: Router) { }

  ngOnInit(): void {
    this.loginStateService.getLoggedInCustomerState().subscribe(loggedInCustomer => {
      if (loggedInCustomer == null) {
        this.introductionName = 'guest'
      } else {
        this.introductionName = loggedInCustomer.firstName
      }
    })
  }

  onLogoClicked(){
    this.router.navigate(['/main'])
  }

}
