import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Mode } from 'src/app/models/modeEnum';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-shopping-page',
  templateUrl: './shopping-page.component.html',
  styleUrls: ['./shopping-page.component.css']
})
export class ShoppingPageComponent implements OnInit {
  faSearch= faSearch;
  mode:Mode;
  Mode = Mode;
  searchWord: string;
  activeCategory: number | null;

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
