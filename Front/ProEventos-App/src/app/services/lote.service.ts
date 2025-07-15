import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Lote } from '@app/models/lote';

import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoteService {
  baseURL = 'https://localhost:7177/api/Lote';

  constructor(private http: HttpClient) { }

  getLotesByEventoId(eventoId: number): Observable<Lote[]> {
    return this.http
      .get<Lote[]>(`${this.baseURL}/${eventoId}`)
      .pipe(take(1));;
  }

  putSaveLote(eventoId: number, lotes: Lote[]): Observable<Lote[]> {
    return this.http
      .put<Lote[]>(`${this.baseURL}/${eventoId}`, lotes)
      .pipe(take(1));;
  }

  deleteLote(loteId: number, eventoId: number): Observable<any> {
    return this.http
      .delete(`${this.baseURL}/${eventoId}/${loteId}`)
      .pipe(take(1));;
  }

}
