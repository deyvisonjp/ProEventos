import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Evento } from '../models/evento';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  baseURL = 'https://localhost:7177/api/Evento';

  constructor(private http: HttpClient) { }

  getEventos(): Observable<Evento[]> {
    return this.http
      .get<Evento[]>(this.baseURL)
      .pipe(take(1));
  }

  getEventosByTema(tema: string): Observable<Evento[]> {
    return this.http
      .get<Evento[]>(`${this.baseURL}/tema/${tema}`)
      .pipe(take(1));;
  }

  getEventoById(id: number): Observable<Evento> {
    return this.http
      .get<Evento>(`${this.baseURL}/${id}`)
      .pipe(take(1));;
  }

  post(evento: Evento): Observable<Evento> {
    return this.http
      .post<Evento>(this.baseURL, evento)
      .pipe(take(1));;
  }

  put(id: number, evento: Evento): Observable<Evento> {
    return this.http
      .put<Evento>(`${this.baseURL}/${id}`, evento)
      .pipe(take(1));;
  }

  delete(id: number): Observable<any> {
    return this.http
      .delete(`${this.baseURL}/${id}`)
      .pipe(take(1));;
  }

}
