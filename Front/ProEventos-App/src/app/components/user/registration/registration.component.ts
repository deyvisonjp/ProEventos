import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ValidatorField } from '@app/helpers/validatorField';

@Component({
  selector: 'app-registration',
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  registrationForm: FormGroup;
  
  get validaForm(): any {
    return this.registrationForm.controls;
  }

  constructor(private formBuilder: FormBuilder) {
    
    const formOptions: AbstractControlOptions = {
      validators: ValidatorField.mustMatch('password', 'passwordConfirmed')
    };

    this.registrationForm = this.formBuilder.group({
      primeiroNome: ['', [Validators.required]],
      ultimoNome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirmed: ['', Validators.required]
    }, formOptions);

  }
}