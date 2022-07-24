import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Mode } from 'src/app/models/modeEnum';

@Component({
  selector: 'app-shopping-page',
  templateUrl: './shopping-page.component.html',
  styleUrls: ['./shopping-page.component.css']
})
export class ShoppingPageComponent implements OnInit {
  faAngleLeft = faAngleLeft;
  faAngleRight = faAngleRight;
  isShown = true;
  mode: Mode;
  Mode = Mode;

  constructor(private activatedroute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedroute.data.subscribe(data => { this.mode = data['mode']; })
  }

  toggleShow() {
    this.isShown = !this.isShown;
  }
}
