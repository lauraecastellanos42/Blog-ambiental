import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { IndexComponent } from './components/index/index.component';
import { UnderConstructionComponent } from './components/under-construction/under-construction.component';
import { CrearArticuloComponent } from './components/dashboard/crear-articulo/crear-articulo.component';
import { ArticuloDetallesComponent } from './components/articulo-detalles/articulo-detalles.component';

const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'under-construction', component: UnderConstructionComponent },
  { path: 'crear-articulo', component: CrearArticuloComponent },
  { path: 'articulo/:id', component: ArticuloDetallesComponent },
  { path: 'editar-articulo/:id', component: CrearArticuloComponent },
  { path: 'index', component: IndexComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./components/dashboard/dashboard.module').then(
        (x) => x.DashboardModule
      ),
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
