import { Injectable } from "@angular/core";
import { AsyncValidator, AbstractControl, ValidationErrors } from "@angular/forms";
import { Observable, map, catchError, of, tap } from "rxjs";
import { OrdersService } from "../services/orders.service";

@Injectable({ providedIn: 'root' })
export class AvailableDeliveyDateValidator implements AsyncValidator {
  constructor(private ordersService:OrdersService) {}

  validate(
    control: AbstractControl
  ): Observable<ValidationErrors | null> {
    const deliveryDate =control.value;
    return this.ordersService.getOrdersByDeliveryDate(deliveryDate).pipe(
      map(orders => (orders.length>3 ?  { notAvailable: {value: control.value} } : null)),
      catchError(() => of(null))
    );
  }
}