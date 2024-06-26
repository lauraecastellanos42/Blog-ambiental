import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Rutas de la aplicación
import { AppRoutingModule } from './app-routing.module';

// Componentes de la aplicación
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './components/shared/shared.module';
import { IndexComponent } from './components/index/index.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { UnderConstructionComponent } from './components/under-construction/under-construction.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { ArticuloDetallesComponent } from './components/articulo-detalles/articulo-detalles.component';

// Importaciones necesarias para funcionalidades de Angular Material y animaciones
// Ir a components/Shared/shared.module.ts

@NgModule({
  declarations: [
    // Declarar todos los componentes que serán usados dentro de este módulo
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    IndexComponent,
    NotFoundComponent,
    UnderConstructionComponent,
    ConfirmDialogComponent,
    ArticuloDetallesComponent,
  ],
  imports: [
    // Importar módulos necesarios para el funcionamiento de la app
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
  ],
  providers: [], // Aquí se pueden añadir servicios si los hubiera
  bootstrap: [AppComponent], // El componente raíz que arranca la aplicación
})
export class AppModule {}
