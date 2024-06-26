import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TematicaService } from 'src/app/services/tematica.service';
import { Tematica } from 'src/app/interfaces/tematica';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AgregarEditarTematicaComponent } from '../agregar-editar-tematica/agregar-editar-tematica.component';

@Component({
  selector: 'app-tematicas',
  templateUrl: './tematicas.component.html',
  styleUrls: ['./tematicas.component.css'],
})
export class TematicasComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['nombre', 'acciones'];

  dataSource = new MatTableDataSource<Tematica>();
  loading: boolean = false;

  tematicas: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _tematicaService: TematicaService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.getTematicas();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getTematicas() {
    this.loading = true;
    this._tematicaService.getAllTematicas().subscribe((data) => {
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

  addEditTematica(id?: number) {
    const dialogRef = this.dialog.open(AgregarEditarTematicaComponent, {
      width: '550px',
      disableClose: true,
      data: { id: id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getTematicas();
    });
  }

  deleteTematica(id: number) {
    this.loading = true;
    this._tematicaService.deleteTematica(id).subscribe(() => {
      this.mensajeExito();
      this.getTematicas();
    });
  }

  mensajeExito() {
    this._snackBar.open('Tematica eliminada con éxito', '', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
