import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Articulo } from '../interfaces/articulo';

@Injectable({
  providedIn: 'root',
})
export class ArticuloService {
  private appURL: string;
  private apiURL: string;

  constructor(private http: HttpClient) {
    this.appURL = environment.endpoint;
    this.apiURL = 'blog/articulo/';
  }

  getAllArticulos(): Observable<any> {
    return this.http.get<Articulo[]>(`${this.appURL}${this.apiURL}listar`);
  }

  getUniqueArticulo(id: number): Observable<Articulo> {
    return this.http.get<Articulo>(`${this.appURL}${this.apiURL}listar/${id}`);
  }

  getArticulo(id: number): Observable<any> {
    return this.http.get<Articulo>(`${this.appURL}${this.apiURL}modificar`);
  }

  updateArticulo(id: number, formData: FormData): Observable<void> {
    return this.http.put<void>(
      `${this.appURL}${this.apiURL}modificar/${id}`,
      formData
    );
  }

  addArticulo(formData: FormData): Observable<void> {
    return this.http.post<void>(
      `${this.appURL}${this.apiURL}guardar/1`,
      formData
    );
  }

  deleteArticulo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.appURL}${this.apiURL}eliminar/${id}`);
  }
}
