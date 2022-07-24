import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, UntypedFormControl, UntypedFormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { UniqueEmailValidator } from 'src/app/validators/UniqueEmailValidator';
import { UniqueGovernmentIdValidator } from 'src/app/validators/UniqueGovernmentIdValidator';

@Component({
  selector: 'app-register-first-step',
  templateUrl: './register-first-step.component.html',
  styleUrls: ['./register-first-step.component.css']
})

export class RegisterFirstStepComponent implements OnInit {
  signupForm: UntypedFormGroup;
  @Output() register1Details = new EventEmitter();

  constructor(private uniqueEmail: UniqueEmailValidator, private uniqueGovernmentId: UniqueGovernmentIdValidator) { }

  ngOnInit(): void {
    this.signupForm = new UntypedFormGroup({
      'governmentId': new UntypedFormControl(null, {
        validators: [Validators.required, validGovernmentId()],
        asyncValidators: [this.uniqueGovernmentId.validate.bind(this.uniqueGovernmentId)],
        updateOn: 'blur'
      }),
      'email': new UntypedFormControl(null, {
        validators: [Validators.required, Validators.email],
        asyncValidators: [this.uniqueEmail.validate.bind(this.uniqueEmail)],
        updateOn: 'blur'
      }),
      'passwordsFeilds': new UntypedFormGroup({
        'password': new UntypedFormControl(null, {
          validators: [Validators.required,Validators.minLength(7)],
          updateOn: 'blur'
        }),
        'confirmedPassword': new UntypedFormControl(null, {
          validators:[Validators.required,Validators.minLength(7)],
          updateOn: 'blur'
        })
      }, { validators: passwordsMatchValidator, updateOn: 'blur' })

    })
  }

  onNextClicked() {
    const customeRegister1Detais = {
      governmentId: this.signupForm.value.governmentId,
      email: this.signupForm.value.email,
      password: this.signupForm.value.passwordsFeilds.password

    }
    this.register1Details.emit(customeRegister1Detais);
  }
}


export function validGovernmentId(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const governmentId:number = control.value;
    return governmentId?.toString().length == 9 ? null : { forbiddenName: { value: control.value } };
  };
}

export const passwordsMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const confirmedPassword = control.get('confirmedPassword');
  return areMatching(password, confirmedPassword) ? null : { dontMatch: true };

  function areMatching(p1,p2) {
    const bothExist = p1 && p2
    const areMatch = p1?.value === p2?.value;
    return bothExist && areMatch
  }
};
