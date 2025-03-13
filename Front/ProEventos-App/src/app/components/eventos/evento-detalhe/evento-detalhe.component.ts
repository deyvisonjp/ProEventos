import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { EmailValidator, FormControl, FormGroup, ReactiveFormsModule, RequiredValidator, Validators } from '@angular/forms';

@Component({
  selector: 'app-evento-detalhe',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './evento-detalhe.component.html',
  styleUrl: './evento-detalhe.component.scss'
})
export class EventoDetalheComponent {

  eventosDetalhesForm = new FormGroup({
    tema: new FormControl('', [Validators.required, Validators.minLength(10)]),
    local: new FormControl('', Validators.required),
    dataEvento: new FormControl('', Validators.required),
    id: new FormControl('', Validators.required),
    quantidadeDePessoas: new FormControl('', [Validators.required, Validators.min(30)]),
    imagemUrl: new FormControl('', Validators.required),
    telefone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10,11}$')]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

}
