import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-evento-detalhe',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './evento-detalhe.component.html',
  styleUrls: ['./evento-detalhe.component.scss'] // Corrigido para styleUrls
})
export class EventoDetalheComponent {

  eventosDetalhesForm: FormGroup;

  get validaForm(): any {
    return this.eventosDetalhesForm.controls;
  }

  constructor(private formBuilder: FormBuilder) {
    this.eventosDetalhesForm = this.formBuilder.group({
      tema: ['', [Validators.required, Validators.minLength(10)]],
      local: ['', Validators.required],
      dataEvento: ['', Validators.required],
      quantidadeDePessoas: ['', [Validators.required, Validators.min(30)]],
      imagemUrl: ['', Validators.required],
      telefone: ['', [Validators.required, Validators.pattern('^[0-9]{10,11}$')]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  public resetForm(): void {
    this.eventosDetalhesForm.reset()
  }

}