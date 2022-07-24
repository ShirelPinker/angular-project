import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable, of, switchMap, take } from 'rxjs';
import { Category } from 'src/app/models/category';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';
import { ProductsStateService } from 'src/app/services/states/products-state.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories$: Observable<Category[]> = of([]);
  @Output() categorySelected = new EventEmitter();
  activeCategory: number | null;
  searchWord: FormControl;



  constructor(private categoriesService: CategoriesService, private productsService: ProductsService,
    private productsStateService: ProductsStateService) { }

  ngOnInit(): void {
    this.searchWord = new FormControl(null);
    this.categories$ = this.productsStateService.getProductsState().pipe(take(1),
      map(productsState => productsState?.products),
      map(products => {
        if (!Boolean(products)) {
          this.onCategoryClicked(1)
        } else {
          this.activeCategory = products![0].categoryId || 1;
          this.searchWord.setValue('')
        }
      }), switchMap(() => this.categoriesService.getCategories()))
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

  onSearchWordBlur() {
    this.searchWord.setValue(null)
  }

}
