import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Mode } from 'src/app/models/modeEnum';
import { ProductsService } from 'src/app/services/products.service';

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
  searchWord: FormControl;
  activeCategory: number | null;

  constructor(private productsService: ProductsService, private activatedroute: ActivatedRoute) { }

  ngOnInit(): void {
    this.searchWord = new FormControl(null);
    this.activatedroute.data.subscribe(data => { this.mode = data['mode']; })
    this.onCategorySelected(1);
  }

  onCategorySelected(categoryId) {
    this.activeCategory = categoryId;
    this.searchWord.setValue('')
    this.productsService.getProductsByCategoryId(this.activeCategory).subscribe()
  }

  searchProduct() {
    
    this.activeCategory = null;   
    this.productsService.getProductsBySearchName(this.searchWord.value || "").subscribe();
  }

  onSearchWordBlur(){
    this.searchWord.setValue(null)
  }

  toggleShow() {
    this.isShown = !this.isShown;
  }

}
