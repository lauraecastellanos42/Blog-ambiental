import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ArticuloService } from 'src/app/services/articulo.service';
import { TematicaService } from 'src/app/services/tematica.service';
import { TipoService } from 'src/app/services/tipo.service';
import { Articulo } from 'src/app/interfaces/articulo';

@Component({
  selector: 'app-crear-articulo',
  templateUrl: './crear-articulo.component.html',
  styleUrls: ['./crear-articulo.component.css'],
})
export class CrearArticuloComponent implements OnInit {
  articuloForm: FormGroup;
  tematicas: any[] = [];
  tipos: any[] = [];
  imageUrl: string | ArrayBuffer | null = null;
  articuloId: number | null = null;
  isEditMode: boolean = false;
  editMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private articuloService: ArticuloService,
    private tematicaService: TematicaService,
    private tipoService: TipoService,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.articuloForm = this.fb.group({
      titulo: ['', Validators.required],
      tematicas: ['', Validators.required],
      tipos: ['', Validators.required],
      parrafos: ['', Validators.required],
      archivos: [null],
    });
  }

  ngOnInit(): void {
    this.cargarTematicas();
    this.cargarTipos();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editMode = true;
      this.cargarArticuloParaEditar(+id);
    }
  }

  cancelar() {
    this.router.navigate(['/index']);
  }

  cargarTematicas() {
    this.tematicaService.getAllTematicas().subscribe({
      next: (data) => {
        this.tematicas = data;
      },
      error: (err) => console.error('Error al cargar temáticas', err),
    });
  }

  cargarTipos() {
    this.tipoService.getAllTipos().subscribe({
      next: (data) => {
        this.tipos = data;
      },
      error: (err) => console.error('Error al cargar tipos', err),
    });
  }

  cargarArticuloParaEditar(id: number) {
    this.articuloService.getUniqueArticulo(id).subscribe((data: Articulo) => {
      this.articuloForm.patchValue({
        titulo: data.titulo,
        tematicas: data.tematicasDTO ? data.tematicasDTO.map((t) => t.id) : [],
        tipos: data.tiposDTO ? data.tiposDTO.map((t) => t.id) : [],
        parrafos: data.parrafosDTO
          ? data.parrafosDTO.map((p) => p.cuerpo).join('\n')
          : '',
      });

      // Cargar la imagen si existe
      if (data.imagenesDTO && data.imagenesDTO.length > 0) {
        const imagen = data.imagenesDTO[0];
        this.imageUrl = 'data:' + imagen.mime + ';base64,' + imagen.contenido;
      }
    });
  }

  guardarArticulo() {
    const formData = new FormData();
    formData.append('titulo', this.articuloForm.get('titulo')?.value);
    formData.append('parrafos', this.articuloForm.get('parrafos')?.value);

    const tematicas = this.articuloForm.get('tematicas')?.value;
    tematicas.forEach((tematica: number) =>
      formData.append('tematicas', tematica.toString())
    );

    const tipos = this.articuloForm.get('tipos')?.value;
    tipos.forEach((tipo: number) => formData.append('tipos', tipo.toString()));

    const fileInput = this.articuloForm.get('archivos')?.value;
    if (fileInput) {
      formData.append('archivos', fileInput);
    } else {
      formData.append('archivos', ''); // Send an empty string if no file is selected
    }

    if (this.editMode) {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.articuloService.updateArticulo(+id, formData).subscribe(
          (response) => {
            this._snackBar.open('Artículo actualizado con éxito', 'Cerrar', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
            this.router.navigate(['/index']);
          },
          (error) => {
            console.error('Error al actualizar el artículo', error);
          }
        );
      }
    } else {
      this.articuloService.addArticulo(formData).subscribe(
        (response) => {
          this._snackBar.open('Artículo creado con éxito', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
          this.router.navigate(['/index']);
        },
        (error) => {
          console.error('Error al crear el artículo', error);
        }
      );
    }
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.articuloForm.patchValue({
        archivos: file,
      });

      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
