import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tipos } from '../interfaces/tipos';

@Injectable({
  providedIn: 'root',
})
export class TipoService {
  private appURL: string;
  private apiURL: string;

  constructor(private http: HttpClient) {
    this.appURL = environment.endpoint;
    this.apiURL = 'blog/tipos/';
  }

  getAllTipos(): Observable<any> {
    return this.http.get<Tipos[]>(`${this.appURL}${this.apiURL}listar`);
  }

  getTipo(id: number): Observable<any> {
    return this.http.get<Tipos>(`${this.appURL}${this.apiURL}modificar`);
  }

  updateTipo(id: number, tipo: Tipos): Observable<void> {
    return this.http.put<void>(
      `${this.appURL}${this.apiURL}modificar/${id}`,
      tipo
    );
  }

  addTipo(tipo: Tipos): Observable<void> {
    return this.http.post<void>(`${this.appURL}${this.apiURL}guardar`, tipo);
  }

  deleteTipo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.appURL}${this.apiURL}eliminar/${id}`);
  }
}
