import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tematica } from '../interfaces/tematica';

@Injectable({
  providedIn: 'root',
})
export class TematicaService {
  private appURL: string;
  private apiURL: string;

  constructor(private http: HttpClient) {
    this.appURL = environment.endpoint;
    this.apiURL = 'blog/tematicas/';
  }

  getAllTematicas(): Observable<any> {
    return this.http.get<Tematica[]>(`${this.appURL}${this.apiURL}listar`);
  }

  getTematica(id: number): Observable<any> {
    return this.http.get<Tematica>(`${this.appURL}${this.apiURL}modificar`);
  }

  updateTematica(id: number, tematica: Tematica): Observable<void> {
    return this.http.put<void>(
      `${this.appURL}${this.apiURL}modificar/${id}`,
      tematica
    );
  }

  addTematica(tematica: Tematica): Observable<void> {
    return this.http.post<void>(
      `${this.appURL}${this.apiURL}guardar`,
      tematica
    );
  }

  deleteTematica(id: number): Observable<void> {
    return this.http.delete<void>(`${this.appURL}${this.apiURL}eliminar/${id}`);
  }
}
