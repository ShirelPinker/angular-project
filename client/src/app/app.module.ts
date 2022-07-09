import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
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
import { Register1PageComponent } from './components/register1-page/register1-page.component';
import { Register2PageComponent } from './components/register2-page/register2-page.component';
import { ReceiptPageComponent } from './components/receipt-page/receipt-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoToShoppingComponent } from './components/go-to-shopping/go-to-shopping.component';
import { LoggedInNotificationComponent } from './components/logged-in-notification/logged-in-notification.component';
import { RegisterComponent } from './components/register/register.component';
import { CartCheckoutPreviewComponent } from './components/cart-checkout-preview/cart-checkout-preview.component';
import { CheckoutFormComponent } from './components/checkout-form/checkout-form.component';
import { HighlighterPipe } from './pipes/highlighter.pipe';
import { AdminManagementComponent } from './components/admin-management/admin-management.component';

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
    Register1PageComponent,
    Register2PageComponent,
    ReceiptPageComponent,
    GoToShoppingComponent,
    LoggedInNotificationComponent,
    RegisterComponent,
    CartCheckoutPreviewComponent,
    CheckoutFormComponent,
    HighlighterPipe,
    AdminManagementComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
