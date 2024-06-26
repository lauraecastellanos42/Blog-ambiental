import { Component, OnInit } from '@angular/core';
import { ArticuloService } from 'src/app/services/articulo.service';
import { Articulo } from 'src/app/interfaces/articulo';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  articulos: Articulo[] = [];
  loading: boolean = true;

  constructor(private articuloService: ArticuloService) {}

  ngOnInit(): void {
    this.getArticulos();
  }

  getArticulos() {
    this.loading = true;
    this.articuloService.getAllArticulos().subscribe({
      next: (data) => {
        this.articulos = data;
        this.loading = false;
        console.log(this.articulos);
      },
      error: (err) => {
        console.error('Error al obtener artículos', err);
        this.loading = false;
      },
    });
  }
}
