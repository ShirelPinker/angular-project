import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { AboutStoreComponent } from './components/about-store/about-store.component';
import { StoreInfoComponent } from './components/store-info/store-info.component';
import { CartComponent } from './components/cart/cart.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { ShoppingPageComponent } from './components/shopping-page/shopping-page.component';
import { CheckoutPageComponent } from './components/checkout-page/checkout-page.component';
import { RegisterFirstStepComponent } from './components/register-first-step/register-first-step.component';
import { RegisterSecondStepComponent } from './components/register-second-step/register-second-step.component';
import { ReceiptPageComponent } from './components/receipt-page/receipt-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoToShoppingComponent } from './components/go-to-shopping/go-to-shopping.component';
import { LoggedInNotificationComponent } from './components/logged-in-notification/logged-in-notification.component';
import { RegisterComponent } from './components/register/register.component';
import { CartCheckoutPreviewComponent } from './components/cart-checkout-preview/cart-checkout-preview.component';
import { CheckoutFormComponent } from './components/checkout-form/checkout-form.component';
import { HighlighterPipe } from './pipes/highlighter.pipe';
import { AdminManagementComponent } from './components/admin-management/admin-management.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { catchError, Observable, of, tap } from 'rxjs';
import { CustomersService } from './services/customers.service';
import { GuestLoginComponent } from './components/guest-login/guest-login.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    AboutStoreComponent,
    StoreInfoComponent,
    CartComponent,
    CartItemComponent,
    CategoriesComponent,
    ProductsComponent,
    ProductCardComponent,
    MainPageComponent,
    ShoppingPageComponent,
    CheckoutPageComponent,
    RegisterFirstStepComponent,
    RegisterSecondStepComponent,
    ReceiptPageComponent,
    GoToShoppingComponent,
    LoggedInNotificationComponent,
    RegisterComponent,
    CartCheckoutPreviewComponent,
    CheckoutFormComponent,
    HighlighterPipe,
    AdminManagementComponent,
    GuestLoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    ModalModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    {
      provide: APP_INITIALIZER,
      useFactory: (customersService: CustomersService) => () => {
        if (!localStorage.getItem('token')) {
          return of()
        }

        return customersService.loginByToken().pipe(
          catchError(() => {
            localStorage.removeItem('token')
            return of()
          }))
      },
      deps: [CustomersService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
