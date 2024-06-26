import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ArticuloService } from 'src/app/services/articulo.service';
import { Articulo } from 'src/app/interfaces/articulo';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.css'],
})
export class ArticulosComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['fecha', 'titulo', 'acciones'];
  dataSource = new MatTableDataSource<Articulo>();
  loading: boolean = false;

  articulos: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _articuloService: ArticuloService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.getArticulos();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getArticulos() {
    this.loading = true;
    this._articuloService.getAllArticulos().subscribe((data) => {
      this.loading = false;
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  //Editar articulo
  editArticulo(id: number) {
    this.router.navigate(['/editar-articulo', id]);
  }

  deleteArticulo(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loading = true;
        this._articuloService.deleteArticulo(id).subscribe(
          (data) => {
            this.mensajeExito();
            this.getArticulos();
            this.actualizarVista(id);
          },
          (error) => {
            this.loading = false;
            this._snackBar.open('Artículo eliminado', 'Cerrar', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
            this.actualizarVista(id);
            console.error('Error al eliminar el artículo', error);
          }
        );
      }
    });
  }

  actualizarVista(id: number) {
    this.dataSource.data = this.dataSource.data.filter(
      (articulo: Articulo) => articulo.id !== id
    );
    this.loading = false;
  }

  mensajeExito() {
    this._snackBar.open('Artículo eliminado con éxito', 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
