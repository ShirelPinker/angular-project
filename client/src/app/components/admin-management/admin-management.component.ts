import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { combineLatest, filter, tap } from 'rxjs';
import { Category } from 'src/app/models/category';
import { NewProduct } from 'src/app/models/newProduct';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';
import { ProductsStateService } from 'src/app/services/states/products-state.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

enum AdminAction {
  Add,
  Edit
}
enum AdminStatus {
  InAction,
  Empty
}

@UntilDestroy()
@Component({
  selector: 'app-admin-management',
  templateUrl: './admin-management.component.html',
  styleUrls: ['./admin-management.component.css']
})
export class AdminManagementComponent implements OnInit {
  productForm: UntypedFormGroup;
  adminAction: AdminAction = AdminAction.Add;
  categories: Category[] = [];
  productToEditId: number;
  AdminAction = AdminAction;
  AdminStatus = AdminStatus;
  adminStatus: AdminStatus = AdminStatus.Empty;

  constructor(private productsStateService: ProductsStateService, private categoriesService: CategoriesService, private productsService: ProductsService) { }

  ngOnInit(): void {
    this.productForm = new UntypedFormGroup({
      'name': new UntypedFormControl(null, {
        validators: [Validators.required],
        updateOn: 'blur'
      }),
      'category': new UntypedFormControl(null, {
        validators: [Validators.required],
        updateOn: 'blur'
      }),
      'price': new UntypedFormControl(null, {
        validators: [Validators.required],
        updateOn: 'blur'
      }),
      'imgUrl': new UntypedFormControl(null, {
        validators: [Validators.required],
        updateOn: 'blur'
      })
    })

    const products$ = this.productsStateService.getProductsState().pipe(filter(Boolean), untilDestroyed(this))
    const categories$ = this.categoriesService.getCategories()

    combineLatest([products$, categories$])
      .pipe(tap(([productsState, categories]) => this.categories = categories))
      .subscribe(
        ([productsState, categories]) => {
          if (productsState.productToEdit) {
            this.adminStatus = AdminStatus.InAction;
            this.productToEditId = productsState.productToEdit.id;
            this.adminAction = AdminAction.Edit;
            this.productForm.controls['name'].setValue(productsState.productToEdit.name);
            this.productForm.controls['price'].setValue(productsState.productToEdit.price);
            this.productForm.controls['imgUrl'].setValue(productsState.productToEdit.imgUrl);
            let categoryIndex;
            for (let i = 0; i < categories.length; i++) {
              if (categories[i].id == productsState.productToEdit.categoryId) {
                categoryIndex = i;
              }
            }
            this.productForm.controls['category'].setValue(categories[categoryIndex].name);
          }
        })
  }

  onAddNewProduct() {
    this.adminStatus = AdminStatus.InAction;
    this.productForm.reset();
    this.adminAction = AdminAction.Add
  }
  onSave() {
    const category = this.categories.find(category => category.name == this.productForm.value.category)

    const productDetails: NewProduct = {
      name: this.productForm.value.name,
      categoryId: category!.id,
      price: this.productForm.value.price,
      imgUrl: this.productForm.value.imgUrl
    }

    this.adminAction == AdminAction.Add ?
      this.productsService.addNewProduct(productDetails).subscribe(() => this.clearFields()) :
      this.productsService.updateProduct({ ...productDetails, id: this.productToEditId }).subscribe(() => this.clearFields() )
  }

  clearFields() {
    this.productsStateService.setProductToEdit(null);
    this.productForm.reset();
    this.adminStatus = AdminStatus.Empty;
  }
}
