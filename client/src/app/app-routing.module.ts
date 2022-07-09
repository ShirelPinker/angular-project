import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutPageComponent } from './components/checkout-page/checkout-page.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { ShoppingPageComponent } from './components/shopping-page/shopping-page.component';
import { ReceiptPageComponent } from './components/receipt-page/receipt-page.component';
import { RegisterComponent } from './components/register/register.component';
import { Register1PageComponent } from './components/register1-page/register1-page.component';
import { Register2PageComponent } from './components/register2-page/register2-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'main', component: MainPageComponent },
  { path: 'shopping', component: ShoppingPageComponent, data: { mode: 'store' } },
  { path: 'checkout', component: CheckoutPageComponent, data: { mode: 'preview' } },
  { path: 'register1', component: Register1PageComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'register2', component: Register2PageComponent },
  { path: 'receipt', component: ReceiptPageComponent },
  {path: 'shopping/admin', component: ShoppingPageComponent, data: { mode: 'admin' }}




];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
