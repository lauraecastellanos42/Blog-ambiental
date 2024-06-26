import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TipoService } from 'src/app/services/tipo.service';
import { Tipos } from 'src/app/interfaces/tipos';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AgregarEditarTipoComponent } from '../agregar-editar-tipo/agregar-editar-tipo.component';

@Component({
  selector: 'app-tipos',
  templateUrl: './tipos.component.html',
  styleUrls: ['./tipos.component.css'],
})
export class TiposComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['nombre', 'acciones'];

  dataSource = new MatTableDataSource<Tipos>();
  loading: boolean = false;

  // listTipos: Tipos[] = [];

  tipos: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _tipoService: TipoService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.getTipos();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getTipos() {
    this.loading = true;
    this._tipoService.getAllTipos().subscribe((data) => {
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

  addEditTipo(id?: number) {
    const dialogRef = this.dialog.open(AgregarEditarTipoComponent, {
      width: '550px',
      disableClose: true,
      data: { id: id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getTipos();
    });
  }

  deleteTipo(id: number) {
    this.loading = true;
    this._tipoService.deleteTipo(id).subscribe(() => {
      this.mensajeExito();
      this.getTipos();
    });
  }

  mensajeExito() {
    this._snackBar.open('Tipo eliminado con éxito', '', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
