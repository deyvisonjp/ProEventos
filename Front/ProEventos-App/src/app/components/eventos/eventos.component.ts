import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EventoService } from '../../services/evento.service';
import { Evento } from '../../models/evento';
import { DateTimeFormatPipe } from '../../helpers/date-time-format.pipe';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { TituloDaPaginaComponent } from '../../shared/titulo-da-pagina/titulo-da-pagina.component';

@Component({
  selector: 'app-eventos',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    DateTimeFormatPipe,
    TooltipModule,
    BsDropdownModule,
    NgxSpinnerModule,
    TituloDaPaginaComponent
  ],
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {

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
    private spinner: NgxSpinnerService
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
