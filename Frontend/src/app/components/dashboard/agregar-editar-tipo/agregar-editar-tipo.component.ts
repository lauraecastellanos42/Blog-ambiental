import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Tipos } from 'src/app/interfaces/tipos';
import { TipoService } from 'src/app/services/tipo.service';

@Component({
  selector: 'app-agregar-editar-tipo',
  templateUrl: './agregar-editar-tipo.component.html',
  styleUrls: ['./agregar-editar-tipo.component.css'],
})
export class AgregarEditarTipoComponent implements OnInit {
  formTipo: FormGroup;
  loading: boolean = false;
  title: string = 'Agregar ';
  id: number | undefined;
  // dataSource: MatTableDataSource<Tipos>;

  constructor(
    public dialogRef: MatDialogRef<AgregarEditarTipoComponent>,
    private fb: FormBuilder,
    private _tipoService: TipoService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formTipo = this.fb.group({
      nombre: [
        '',
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.minLength(3),
        ],
      ],
    });
    this.id = data.id;
  }

  ngOnInit(): void {
    this, this.esEditar(this.data.id);
  }

  esEditar(id: number) {
    if (id !== undefined) {
      this.title = 'Editar ';
      this.getTipo(id);
    }
  }

  cancelar() {
    this.dialogRef.close(false);
  }

  getTipo(id: number) {
    this._tipoService.getTipo(id).subscribe((data) => {
      this.loading = false;
      this.formTipo.patchValue({
        nombre: data.nombre,
      });
    });
  }

  addEditTipo() {
    if (this.formTipo.invalid) {
      return;
    }

    const tipo: Tipos = {
      nombre: this.formTipo.value.nombre,
    };

    this.loading = true;
    if (this.id === undefined) {
      this._tipoService.addTipo(tipo).subscribe({
        next: (res) => {
          this.loading = false;
          this.mensajeExitoso(tipo.nombre + ' agregado');
          this.dialogRef.close(true); // Cerrar el diálogo si todo fue exitoso.
        },
        error: (error) => {
          this._snackBar.open(error.error.message, '', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          });
        },
      });
    } else {
      this._tipoService.updateTipo(this.id, tipo).subscribe({
        next: (res) => {
          this.mensajeExitoso(tipo.nombre + ' actualizado');
        },
        error: (error) => {
          this._snackBar.open(error.error.message, '', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          });
        },
      });
    }
    this.loading = false;
    this.dialogRef.close(true);
  }

  mensajeExitoso(title: string) {
    this._snackBar.open(`Tipo ${title} exitosamente`, '', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
