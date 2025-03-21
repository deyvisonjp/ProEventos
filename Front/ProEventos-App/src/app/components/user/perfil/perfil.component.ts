import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControlOptions, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TituloDaPaginaComponent } from '../../../shared/titulo-da-pagina/titulo-da-pagina.component';
import { ValidatorField } from '@app/helpers/validatorField';
@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TituloDaPaginaComponent
  ],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent {
  perfilForm: FormGroup;

  get validaForm(): any {
    return this.perfilForm.controls;
  }

  constructor(private formBuilder: FormBuilder) {
    const formOptions: AbstractControlOptions = {
      validators: ValidatorField.mustMatch('password', 'passwordConfirmed')
    };

    this.perfilForm = this.formBuilder.group({
      titulo: ['', [Validators.required]],
      primeiroNome: ['', [Validators.required]],
      ultimoNome: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', [Validators.required]],
      funcao: ['', [Validators.required]],
      descricao: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirmed: ['', [Validators.required]],
    }, formOptions);
  }

  public resetForm(event: any): void {
    event.preventDefault();
    this.perfilForm.reset();
  }
}