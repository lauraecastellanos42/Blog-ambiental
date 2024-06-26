import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { InicioComponent } from './inicio/inicio.component';
import { TiposComponent } from './tipos/tipos.component';
import { TematicasComponent } from './tematicas/tematicas.component';
import { ArticulosComponent } from './articulos/articulos.component';
import { UnderConstructionComponent } from '../under-construction/under-construction.component';
import { CrearArticuloComponent } from './crear-articulo/crear-articulo.component';
import { ArticuloDetallesComponent } from '../articulo-detalles/articulo-detalles.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', component: InicioComponent },
      { path: 'tipos', component: TiposComponent },
      { path: 'tematicas', component: TematicasComponent },
      { path: 'articulos', component: ArticulosComponent },
      { path: 'crear-articulo', component: CrearArticuloComponent },
      { path: 'articulo/:id', component: ArticuloDetallesComponent },
      { path: 'under-construction', component: UnderConstructionComponent },
      //TODO: Agregar rutas para los componentes de tipos, tematicas y articulos
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
