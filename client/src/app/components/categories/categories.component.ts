import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { Category } from 'src/app/models/category';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories$: Observable<Category[]> = of([]);
  @Output() categorySelected = new EventEmitter();
  @Input() activeCategory: number | null;
  searchWord: FormControl;



  constructor(private categoriesService: CategoriesService, private productsService: ProductsService) { }

  ngOnInit(): void {
    this.searchWord = new FormControl(null);
    this.categories$ = this.categoriesService.getCategories();
    this.onCategoryClicked(1);
  }

  onCategoryClicked(categoryId) {
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

}
