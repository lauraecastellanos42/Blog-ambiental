import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { InicioComponent } from './inicio/inicio.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TiposComponent } from './tipos/tipos.component';
import { TematicasComponent } from './tematicas/tematicas.component';
import { ArticulosComponent } from './articulos/articulos.component';
import { AgregarEditarTipoComponent } from './agregar-editar-tipo/agregar-editar-tipo.component';
import { AgregarEditarTematicaComponent } from './agregar-editar-tematica/agregar-editar-tematica.component';
import { CrearArticuloComponent } from './crear-articulo/crear-articulo.component';

@NgModule({
  declarations: [
    DashboardComponent,
    InicioComponent,
    NavbarComponent,
    TiposComponent,
    TematicasComponent,
    ArticulosComponent,
    AgregarEditarTipoComponent,
    AgregarEditarTematicaComponent,
    CrearArticuloComponent,
  ],
  imports: [CommonModule, DashboardRoutingModule, SharedModule],
})
export class DashboardModule {}
