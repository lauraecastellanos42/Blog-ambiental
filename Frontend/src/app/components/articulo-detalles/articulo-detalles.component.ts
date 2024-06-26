import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticuloService } from 'src/app/services/articulo.service';
import { Articulo } from 'src/app/interfaces/articulo';

@Component({
  selector: 'app-articulo-detalles',
  templateUrl: './articulo-detalles.component.html',
  styleUrls: ['./articulo-detalles.component.css'],
})
export class ArticuloDetallesComponent implements OnInit {
  articulo: Articulo | undefined;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private articuloService: ArticuloService
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.getArticulo(id);
  }

  getArticulo(id: number): void {
    this.loading = true;
    this.articuloService.getUniqueArticulo(id).subscribe({
      next: (data) => {
        this.articulo = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al obtener artículo', err);
        this.loading = false;
      },
    });
  }
}
