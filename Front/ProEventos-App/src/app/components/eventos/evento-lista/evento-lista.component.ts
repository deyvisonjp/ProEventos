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
import { environment } from '@environments/environment';

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
  public eventoTema = '';
  public eventoId = 0;

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

  mostrarImagem(imagemUrl: string): string {
    return (imagemUrl !== '') 
      ? `${environment.apiUrl}resources/images/${imagemUrl}` 
      : 'assets/img/no-image.webp'
  }

  // Configurações Modal ngx-bootstrap
  openModal(event: any, template: TemplateRef<void>, eventoTema: string, eventoId: number): void {
    event.stopPropagation();
    this.eventoTema = eventoTema;
    this.eventoId = eventoId;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(): void {
    this.modalRef?.hide();
    this.spinner.show();

    this.EventoService.delete(this.eventoId).subscribe({
      next: (response: any) => {
        if (response.success) {
          this.toastr.success(
            `O Evento ${this.eventoTema} foi deletado com sucesso!`,
            'Deletado!',
            {
              timeOut: 10000,
              positionClass: 'toast-bottom-right',
              progressBar: true,
            }
          );
          this.getEventos();
          // this.eventos = this.eventos.filter(evento => evento.id !== this.eventoId);
          // this.eventosFiltrados = this.eventos;
        } else {
          this.toastr.error(`Resposta inesperada ao deletar o evento ${this.eventoTema}.`);
        }
        this.spinner.hide();
      },
      error: (error) => {
        console.error(error);
        this.toastr.error(`Erro ao tentar deletar o evento ${this.eventoTema}.`);
        this.spinner.hide();
      },
      complete: () => this.spinner.hide()
    });
  }

  decline(): void {
    this.modalRef?.hide();
  }

}
