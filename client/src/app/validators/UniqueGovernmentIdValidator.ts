import { Injectable } from "@angular/core";
import { AsyncValidator, AbstractControl, ValidationErrors } from "@angular/forms";
import { Observable, map, catchError, of } from "rxjs";
import { CustomersService } from "../services/customers.service";

@Injectable({ providedIn: 'root' })
export class UniqueGovernmentIdValidator implements AsyncValidator {
  constructor(private customerService: CustomersService) { }

  validate(
    control: AbstractControl
  ): Observable<ValidationErrors | null> {
    return this.customerService.isUniqueGovernmentId(control.value).pipe(
      map(isUnique => (isUnique ? null : { GovernmentIdnotUnique: { value: control.value } })),
      catchError(() => of(null))
    );
  }
}