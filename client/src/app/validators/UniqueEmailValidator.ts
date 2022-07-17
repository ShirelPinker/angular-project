import { Injectable } from "@angular/core";
import { AsyncValidator, AbstractControl, ValidationErrors } from "@angular/forms";
import { Observable, map, catchError, of } from "rxjs";
import { CustomersService } from "../services/customers.service";

@Injectable({ providedIn: 'root' })
export class UniqueEmailValidator implements AsyncValidator {
  constructor(private customerService: CustomersService) {}

  validate(
    control: AbstractControl
  ): Observable<ValidationErrors | null> {
    return this.customerService.isEmailTaken(control.value).pipe(
      map(isTaken => (isTaken ?  { usernameAlreadyExists: {value: control.value} } : null)),
      catchError(() => of(null))
    );
  }
}