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
  signupForm: UntypedFormGroup;
  adminAction: AdminAction = AdminAction.Add;
  categories: Category[] = [];
  productToEditId: number;
  AdminAction = AdminAction;
  AdminStatus = AdminStatus;
  adminStatus: AdminStatus = AdminStatus.Empty;

  constructor(private productsStateService: ProductsStateService, private categoriesService: CategoriesService, private productsService: ProductsService) { }

  ngOnInit(): void {
    this.signupForm = new UntypedFormGroup({
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

    const products$ = this.productsStateService.getProductsState().pipe(filter(Boolean),untilDestroyed(this))
    const categories$ = this.categoriesService.getCategories()

    combineLatest([products$,categories$])
    .pipe(tap(([productsState, categories])=> this.categories = categories))
      .subscribe(
        ([productsState, categories]) => {
          if (productsState.productToEdit) {
            this.adminStatus = AdminStatus.InAction;
            this.productToEditId = productsState.productToEdit.id;
            this.adminAction = AdminAction.Edit;
            this.signupForm.controls['name'].setValue(productsState.productToEdit.name);
            this.signupForm.controls['price'].setValue(productsState.productToEdit.price);
            this.signupForm.controls['imgUrl'].setValue(productsState.productToEdit.imgUrl);
            let categoryIndex;
            for (let i = 0; i < categories.length; i++) {
              if (categories[i].id == productsState.productToEdit.categoryId) {
                categoryIndex = i;
              }
            }
            this.signupForm.controls['category'].setValue(categories[categoryIndex].name);
          }
        })
  }

  onAddNewProduct() {
    this.adminStatus = AdminStatus.InAction;
    this.signupForm.reset();
    this.adminAction = AdminAction.Add
  }
  onSave() {
    const category = this.categories.find(category => category.name == this.signupForm.value.category)

    const productDetails: NewProduct = {
      name: this.signupForm.value.name,
      categoryId: category!.id,
      price: this.signupForm.value.price,
      imgUrl: this.signupForm.value.imgUrl
    }

    this.adminAction == AdminAction.Add ?
      this.productsService.addNewProduct(productDetails).subscribe(() => this.clearFields()) :
      this.productsService.updateProduct({ ...productDetails, id: this.productToEditId }).subscribe(() => {
        // this.productsStateService.setProductToEdit(null);
        this.clearFields()
      })
  }

  clearFields() {
    this.productsStateService.setProductToEdit(null);
    this.signupForm.reset();
    this.adminStatus = AdminStatus.Empty;
  }
}
