import { CommonModule } from '@angular/common';
import { Component, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { DateTimeFormatPipe } from '@app/helpers/date-time-format.pipe';
import { Evento } from '@app/models/evento';
import { EventoService } from '@app/services/evento.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-evento-lista',
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    DateTimeFormatPipe,
    TooltipModule,
    BsDropdownModule,
    NgxSpinnerModule,
    RouterLink
  ],
  templateUrl: './evento-lista.component.html',
  styleUrl: './evento-lista.component.scss'
})
export class EventoListaComponent {

  public eventos: Evento[] = [];
  public eventosFiltrados: Evento[] = [];
  larguraImagem: number = 100;
  exibirImagem: boolean = true;
  private _filtroListaEventos: string = '';

  modalRef?: BsModalRef;
  message?: string;

  public get filtroListaEventos() {
    return this._filtroListaEventos;
  }

  public set filtroListaEventos(value: string) {
    this._filtroListaEventos = value;
    this.eventosFiltrados = this.filtroListaEventos ? this.filtrarEventos(this.filtroListaEventos) : this.eventos;
  }

  filtrarEventos(filtrarPor: string): Evento[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.eventos.filter(
      (evento: { tema: string; local: string; }) =>
        evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1
        ||
        evento.local.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  constructor(
    private EventoService: EventoService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.getEventos();
  }

  public getEventos(): void {
    this.EventoService.getEventos().subscribe({
      next: (eventos: Evento[]) => {
        this.eventos = eventos;
        this.eventosFiltrados = this.eventos;
      },
      error: (error: any) => {
        this.spinner.hide();
        this.toastr.error('Erro ao carregar os Eventos!', 'Erro!', {
          timeOut: 10000,
          positionClass: 'toast-bottom-right',
          progressBar: true,
        });
      },
      complete: () => this.spinner.hide()
    });
  }

  detalheEvento(id: number): void {
    this.router.navigate([`eventos/detalhe/${id}`])
  };

  ocultarImagem(): void {
    this.exibirImagem = !this.exibirImagem;
  }

  // Configurações Modal ngx-bootstrap
  openModal(template: TemplateRef<void>): void {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(): void {
    this.modalRef?.hide();
    this.toastr.success('O Evento foi deletado com sucesso!', 'Deletado!', {
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      progressBar: true,
    });
  }

  decline(): void {
    this.modalRef?.hide();
  }

}
