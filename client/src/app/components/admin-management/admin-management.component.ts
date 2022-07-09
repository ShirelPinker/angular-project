import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';
import { ProductsStateService } from 'src/app/services/states/products-state.service';

enum AdminAction {
  Add,
  Edit
}
enum AdminStatus {
  InAction,
  Empty
}

@Component({
  selector: 'app-admin-management',
  templateUrl: './admin-management.component.html',
  styleUrls: ['./admin-management.component.css']
})
export class AdminManagementComponent implements OnInit {
  signupForm: FormGroup;
  adminAction: AdminAction = AdminAction.Add;
  categories: Category[] = [];
  productToEditId: number;
  AdminAction = AdminAction;
  AdminStatus = AdminStatus;
  adminStatus: AdminStatus = AdminStatus.Empty;

  constructor(private productsStateService: ProductsStateService, private categoriesService: CategoriesService, private productsService: ProductsService) { }

  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe(categories => this.categories = categories)

    this.signupForm = new FormGroup({
      'name': new FormControl(null, {
        validators: [Validators.required],
        updateOn: 'blur'
      }),
      'category': new FormControl(null, {
        validators: [Validators.required],
        updateOn: 'blur'
      }),
      'price': new FormControl(null, {
        validators: [Validators.required],
        updateOn: 'blur'
      }),
      'imgUrl': new FormControl(null, {
        validators: [Validators.required],
        updateOn: 'blur'
      })
    })

    this.productsStateService.getProductsState().subscribe(
      productsState => {
        if (productsState.productToEdit) {
          this.adminStatus = AdminStatus.InAction;
          this.productToEditId = productsState.productToEdit.id;
          this.adminAction = AdminAction.Edit;
          this.signupForm.controls['name'].setValue(productsState.productToEdit.name);
          this.signupForm.controls['price'].setValue(productsState.productToEdit.price);
          this.signupForm.controls['imgUrl'].setValue(productsState.productToEdit.imgUrl);
          let categoryIndex;
          for (let i = 0; i < this.categories.length; i++) {
            if (this.categories[i].id == productsState.productToEdit.categoryId) {
              categoryIndex = i;
            }
          }

          this.signupForm.controls['category'].setValue(this.categories[categoryIndex].name);
        }
      })
  }

  onAddNewProduct() {
    this.adminStatus = AdminStatus.InAction;
    this.signupForm.reset();
    this.adminAction =AdminAction.Add
  }
  onSave() {
    const category = this.categories.find(category => category.name == this.signupForm.value.category)
    const productDetails = {
      name: this.signupForm.value.name,
      categoryId: category.id,
      price: this.signupForm.value.price,
      imgUrl: this.signupForm.value.imgUrl
    }

    this.adminAction == AdminAction.Add ?
      this.productsService.addNewProduct(productDetails).subscribe(() => this.clearFeilds()) :
      this.productsService.updateProduct({ ...productDetails, id: this.productToEditId }).subscribe(() => {
        this.productsStateService.setProductToEdit(null);
        this.clearFeilds()
      })
  }

  clearFeilds() {
    this.signupForm.reset();
    this.adminStatus = AdminStatus.Empty;
  }
}
