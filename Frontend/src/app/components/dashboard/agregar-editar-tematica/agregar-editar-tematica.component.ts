import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Tematica } from 'src/app/interfaces/tematica';
import { TematicaService } from 'src/app/services/tematica.service';

@Component({
  selector: 'app-agregar-editar-tematica',
  templateUrl: './agregar-editar-tematica.component.html',
  styleUrls: ['./agregar-editar-tematica.component.css'],
})
export class AgregarEditarTematicaComponent implements OnInit {
  formTematica: FormGroup;
  loading: boolean = false;
  title: string = 'Agregar ';
  id: number | undefined;

  constructor(
    public dialogRef: MatDialogRef<AgregarEditarTematicaComponent>,
    private fb: FormBuilder,
    private _tematicaService: TematicaService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formTematica = this.fb.group({
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
      this.getTematica(id);
    }
  }

  cancelar() {
    this.dialogRef.close(false);
  }

  getTematica(id: number) {
    this._tematicaService.getTematica(id).subscribe((data) => {
      this.loading = false;
      this.formTematica.patchValue({
        nombre: data.nombre,
      });
    });
  }

  addEditTematica() {
    if (this.formTematica.invalid) {
      return;
    }

    const tematica: Tematica = {
      nombre: this.formTematica.value.nombre,
    };

    this.loading = true;

    if (this.id === undefined) {
      this._tematicaService.addTematica(tematica).subscribe({
        next: () => {
          this.loading = false;
          this.mensajeExitoso(tematica.nombre + ' agregada');
          this.dialogRef.close(true);
        },
        error: (err) => {
          this._snackBar.open(err.error.message, '', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          });
        },
      });
    } else {
      this._tematicaService.updateTematica(this.id, tematica).subscribe({
        next: () => {
          this.mensajeExitoso(tematica.nombre + ' actualizada');
        },
        error: (err) => {
          this._snackBar.open(err.error.message, '', {
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
