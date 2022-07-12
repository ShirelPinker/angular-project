import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';
import { ActivatedRoute } from '@angular/router';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-shopping-page',
  templateUrl: './shopping-page.component.html',
  styleUrls: ['./shopping-page.component.css']
})
export class ShoppingPageComponent implements OnInit {
  faSearch= faSearch;
  mode;
  searchWord: string;
  activeCategory: number;

  constructor(private productsService: ProductsService, private activatedroute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedroute.data.subscribe(data => { this.mode = data['mode']; })
    this.onCategorySelected(1);
  }

  onCategorySelected(categoryId) {
    this.activeCategory = categoryId;
    this.searchWord = ''
    this.productsService.getProductsByCategoryId(this.activeCategory).subscribe();

  }

  searchProduct() {
    this.activeCategory = null;
    this.productsService.getProductsBySearchName(this.searchWord).subscribe();
  }

}
