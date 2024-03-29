import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutPageComponent } from './components/checkout-page/checkout-page.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { ShoppingPageComponent } from './components/shopping-page/shopping-page.component';
import { ReceiptPageComponent } from './components/receipt-page/receipt-page.component';
import { RegisterComponent } from './components/register/register.component';
import { Mode } from './models/modeEnum'
import { IsLoggedInGuard } from './guards/is-logged-in.guard';
import { IsAdminGuard } from './guards/is-admin.guard';

const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'main', component: MainPageComponent },
  { path: 'shopping', component: ShoppingPageComponent, data:  { mode: Mode.Store }, canActivate: [IsLoggedInGuard]  },
  { path: 'checkout', component: CheckoutPageComponent, data: { mode: Mode.Preview } },
  { path: 'register', component: RegisterComponent },
  { path: 'receipt', component: ReceiptPageComponent },
  { path: 'shopping/admin', component: ShoppingPageComponent, data: { mode: Mode.Admin }, canActivate: [IsAdminGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
