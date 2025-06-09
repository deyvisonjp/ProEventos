import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  Validators,
  ReactiveFormsModule,
  NonNullableFormBuilder,
  FormGroup,
  FormBuilder,
  AbstractControl
} from '@angular/forms';
import {
  BsDatepickerConfig,
  BsDatepickerModule,
  BsLocaleService
} from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import { ActivatedRoute } from '@angular/router';

import { EventoService } from '@app/services/evento.service';
import { Evento } from '@app/models/evento';

import { NgxSpinnerService, Spinner } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

defineLocale('pt-br', ptBrLocale);

@Component({
  selector: 'app-evento-detalhe',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, BsDatepickerModule],
  templateUrl: './evento-detalhe.component.html',
  styleUrls: ['./evento-detalhe.component.scss']
})
export class EventoDetalheComponent implements OnInit {

  form!: FormGroup;
  evento = {} as Evento;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private eventoService: EventoService,
    private spinner: NgxSpinnerService,
    private toast: ToastrService,
    private localeService: BsLocaleService
  ) { }

  ngOnInit(): void {
    this.localeService.use('pt-br');
    this.criarForm();
    this.carregarEvento();
  }

  get bsConfig(): Partial<BsDatepickerConfig> {
    return {
      dateInputFormat: 'DD/MM/YYYY HH:mm',
      containerClass: 'theme-default',
      showWeekNumbers: false,
      adaptivePosition: true,
      isAnimated: true
    };
  }

  get formEvento() {
    return this.form.controls;
  }

  criarForm(): void {
    this.form = this.formBuilder.group({
      tema: this.formBuilder.control('', [Validators.required, Validators.minLength(10)]),
      local: this.formBuilder.control('', Validators.required),
      dataEvento: this.formBuilder.control<Date | null>(null, Validators.required),
      quantidadeDePessoas: this.formBuilder.control('', [Validators.required, Validators.min(30)]),
      imagemUrl: this.formBuilder.control('', Validators.required),
      telefone: this.formBuilder.control('', [Validators.required, Validators.pattern('^[0-9]{10,11}$')]),
      email: this.formBuilder.control('', [Validators.required, Validators.email])
    });
  }

  carregarEvento(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    this.spinner.show();
    this.eventoService.getEventoById(+id).subscribe({
      next: (evento: Evento) => {
        this.evento = evento;
        this.form.patchValue({
          ...evento,
          dataEvento: evento.dataEvento ? new Date(evento.dataEvento) : null
        });
      },
      error: () => {
        this.toast.error('Erro ao carregar evento');
      },
      complete: () => this.spinner.hide()
    });
  }

  salvarEvento(): void {
    debugger;
    if (this.form.invalid) {
      this.toast.error('Formulário inválido');
      return;
    }

    const eventoParaSalvar: Evento = {
      ...this.evento,
      ...this.form.value,
      dataEvento: new Date(this.form.value.dataEvento)
    };

    this.spinner.show();

    debugger;
    const operacao = this.evento.id
      ? this.eventoService.put(this.evento.id, eventoParaSalvar)
      : this.eventoService.post(eventoParaSalvar);

    operacao.subscribe({
      next: () => {
        this.toast.success('Evento salvo com sucesso!');
      },
      error: (error) => {
        const mensagem = error?.error?.message || 'Erro ao salvar evento';
        this.toast.error(mensagem);
      },
    }).add(() => this.spinner.hide());
  }

  resetForm(): void {
    this.form.reset();
    this.form.patchValue({
      quantidadeDePessoas: 30
    });
  }

  cssValidator(campo: AbstractControl | null | undefined): string {
    return campo && campo.errors && campo.touched ? 'is-invalid' : '';
  }

}
