import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import {
  Validators,
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  AbstractControl,
  FormArray
} from '@angular/forms';
import {
  BsDatepickerConfig,
  BsDatepickerModule,
  BsLocaleService
} from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxCurrencyDirective } from 'ngx-currency';

import { EventoService } from '@app/services/evento.service';
import { Evento } from '@app/models/evento';
import { Lote } from '@app/models/lote';
import { LoteService } from '@app/services/lote.service';

import { NgxSpinnerService, Spinner } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';


defineLocale('pt-br', ptBrLocale);

@Component({
  selector: 'app-evento-detalhe',
  standalone: true,
  imports: [
    ReactiveFormsModule, CommonModule, BsDatepickerModule, BsDropdownModule, NgxCurrencyDirective
  ],
  templateUrl: './evento-detalhe.component.html',
  styleUrls: ['./evento-detalhe.component.scss']
})
export class EventoDetalheComponent implements OnInit {
  modalRef?: BsModalRef;
  form!: FormGroup;
  evento = {} as Evento;
  loteAtual = { id: 0, nome: '', indice: 0 }
  estadoSalvar = 'post';
  eventoId: number = 0;
  loteForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private eventoService: EventoService,
    private spinner: NgxSpinnerService,
    private toast: ToastrService,
    private localeService: BsLocaleService,
    private loteServcice: LoteService,
    private modalService: BsModalService
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

  get bsConfigLote(): Partial<BsDatepickerConfig> {
    return {
      dateInputFormat: 'DD/MM/YYYY HH:mm',
      containerClass: 'theme-default',
      showWeekNumbers: false,
      adaptivePosition: true,
    };
  }

  get formEvento() {
    return this.form.controls;
  }

  get modoEditar(): boolean {
    return this.estadoSalvar === 'put'
  }

  get lotes(): FormArray {
    return this.form.get('lotes') as FormArray
  }

  criarForm(): void {
    this.form = this.formBuilder.group({
      tema: this.formBuilder.control('', [Validators.required, Validators.minLength(10)]),
      local: this.formBuilder.control('', Validators.required),
      dataEvento: this.formBuilder.control<Date | null>(null, Validators.required),
      quantidadeDePessoas: this.formBuilder.control('', [Validators.required, Validators.min(30)]),
      imagemUrl: this.formBuilder.control('', Validators.required),
      telefone: this.formBuilder.control('', [Validators.required, Validators.pattern('^[0-9]{10,11}$')]),
      email: this.formBuilder.control('', [Validators.required, Validators.email]),
      lotes: this.formBuilder.array([])
    });
  }

  carregarEvento(): void {

    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id === null) {
      this.toast.error('Não foi possível encontrar o ID do evento!');
      return;
    }
    this.eventoId = +id;
    this.estadoSalvar = 'put';
    if (this.eventoId === 0) return;

    this.spinner.show();
    this.eventoService.getEventoById(this.eventoId).subscribe({
      next: (evento: Evento) => {
        this.evento = evento;
        this.form.patchValue({
          ...evento,
          dataEvento: evento.dataEvento ? new Date(evento.dataEvento) : null
        });

        this.evento.lotes?.forEach(lote => {
          this.lotes.push(this.criarLoteEValidar({
            ...lote
          }));
        })

        // 2ª forma de obter os this.lotes...
        // this.carregarLotes();
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
      next: (eventoRetorno: Evento) => {
        this.toast.success('Evento salvo com sucesso!');
        this.router.navigate([`eventos/detalhe/${eventoRetorno.id}`]);
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

  // LOTES -----------------------------------------------------------
  retornaTituloLote(nome: string, indice: number): string {
    return nome == null || nome == '' ? `Lote ${indice + 1}` : nome;
  }

  adicionarLote(): void {
    this.lotes.push(
      this.criarLoteEValidar({ id: 0 } as Lote)
    )
  }

  criarLoteEValidar(lote: Lote): FormGroup {
    return this.formBuilder.group({
      id: [lote.id],
      nome: [lote.nome, Validators.required],
      quantidade: [lote.quantidade, Validators.required],
      preco: [lote.preco, Validators.required],
      dataInicio: [lote.dataInicio],
      dataFim: [lote.dataFim],
    })
  }

  salvarLotes(): void {
    this.spinner.show();

    if (this.lotes.invalid) {
      this.lotes.markAllAsTouched();
      this.toast.warning("Seu formulário de lotes não está correto", 'Form Lote');
      this.spinner.hide();
      return;
    }

    this.loteServcice.putSaveLote(this.eventoId, this.form.value.lotes)
      .subscribe(
        () => {
          this.toast.success('Lotes salvos com sucesso!', 'Sucesso!');
          // this.lotes.clear();
        },
        (error: any) => {
          this.toast.error('Erro ao tentar salvar lote(s)', "Erro Lotes");
          console.error(error);
        }
      ).add(() => this.spinner.hide());
  }



  removerLote(template: TemplateRef<any>, indice: number): void {
    const idControl = this.lotes.get(indice + '.id');
    const nomeControl = this.lotes.get(indice + '.nome');

    if (idControl && nomeControl) {
      this.loteAtual.id = idControl.value;
      this.loteAtual.nome = nomeControl.value;
      this.loteAtual.indice = indice;

      this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
    } else {
      console.error('Controle não encontrado para o índice:', indice);
    }
  }

  confirmDeleteLote() {
    this.modalRef?.hide();
    this.spinner.show();

    this.loteServcice.deleteLote(this.eventoId, this.loteAtual.id)
      .subscribe(
        () => {
          this.toast.success("Lote deletado com sucesso!", "Sucesso!");
          this.lotes.removeAt(this.loteAtual.indice);
        },
        (error: any) => { this.toast.error(`Erro ao tentar deletar ${this.loteAtual.nome}`, "Erro!"); console.error(error) }
      ).add(() => this.spinner.hide());
  }

  declineDeleteLote() {
    this.modalRef?.hide();
    this.spinner.show();
  }

  resetLotes() {
  }

  // CONFIGURAÇÔES EXTRAS
  currencyOptions = {
    prefix: 'R$ ',
    thousands: '.',
    decimal: ',',
    precision: 2,
    allowNegative: false,
    align: 'left'
  };

}
