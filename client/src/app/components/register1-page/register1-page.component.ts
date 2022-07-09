import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { UniqueEmailValidator } from 'src/app/validators/UniqueEmailValidator';
import { UniqueGovernmentIdValidator } from 'src/app/validators/UniqueGovernmentIdValidator';

@Component({
  selector: 'app-register1-page',
  templateUrl: './register1-page.component.html',
  styleUrls: ['./register1-page.component.css']
})

export class Register1PageComponent implements OnInit {
  signupForm: FormGroup;
  @Output() register1Details = new EventEmitter();

  constructor(private uniqueEmail: UniqueEmailValidator, private uniqueGovernmentId: UniqueGovernmentIdValidator) { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'governmentId': new FormControl(null, {
        validators: [Validators.required, validGovernmentId()],
        asyncValidators: [this.uniqueGovernmentId.validate.bind(this.uniqueGovernmentId)],
        updateOn: 'blur'
      }),
      'email': new FormControl(null, {
        validators: [Validators.required, Validators.email],
        asyncValidators: [this.uniqueEmail.validate.bind(this.uniqueEmail)],
        updateOn: 'blur'
      }),
      'passwordsFeilds': new FormGroup({
        'password': new FormControl(null, {
          validators: Validators.required,
          updateOn: 'blur'
        }),
        'confirmedPassword': new FormControl(null, {
          validators: Validators.required,
          updateOn: 'blur'
        })
      }, { validators: passwordsMatchValidator, updateOn: 'blur' })

    })
    // this.signupForm.valueChanges.subscribe(form => {
    //   console.log(form)
    //   const governmentId = this.signupForm.get("governmentId")
    //   console.log("dirty " + governmentId.dirty);
    //   console.log("valid " + governmentId.valid);
    // })
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
  return password.value === confirmedPassword.value ? null : { dontMatch: true };
};
