import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@Component({
  selector: 'app-eventos',
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './eventos.component.html',
  styleUrl: './eventos.component.scss'
})
export class EventosComponent implements OnInit {

  public eventos: any = [];
  public eventosFiltrados: any = [];
  larguraImagem: number = 100;
  exibirImagem: boolean = true;
  private _filtroListaEventos: string = '';

  public get filtroListaEventos() {
    return this._filtroListaEventos;
  }

  public set filtroListaEventos(value: string) {
    this._filtroListaEventos = value;
    this.eventosFiltrados = this.filtroListaEventos ? this.filtrarEventos(this.filtroListaEventos) : this.eventos;
  }

  filtrarEventos(filtrarPor: string): any {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.eventos.filter(
      (evento: { tema: string; local: string; }) => 
        evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1 
      ||
      evento.local.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getEventos();
  }

  public getEventos(): void {
    this.http.get('https://localhost:7177/api/Evento').subscribe(
      response => {
        this.eventos = response;
        this.eventosFiltrados = this.eventos
      },
      error => console.log(error)
    );
  }

  ocultarImagem() {
    this.exibirImagem = !this.exibirImagem;
  }
}
