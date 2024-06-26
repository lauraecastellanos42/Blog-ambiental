import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEditarTipoComponent } from './agregar-editar-tipo.component';

describe('AgregarEditarTipoComponent', () => {
  let component: AgregarEditarTipoComponent;
  let fixture: ComponentFixture<AgregarEditarTipoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarEditarTipoComponent]
    });
    fixture = TestBed.createComponent(AgregarEditarTipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
