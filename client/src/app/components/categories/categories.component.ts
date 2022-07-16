import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Category } from 'src/app/models/category';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories$: Observable<Category[]> = of([]);
  @Output() categorySelected = new EventEmitter();
  @Input() activeCategory: number | null;

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.categories$ = this.categoriesService.getCategories();
  }
  onCategoryClicked(categoryId) {
    this.categorySelected.emit(categoryId);
  }

}
