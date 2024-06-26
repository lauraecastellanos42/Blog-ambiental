import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEditarTematicaComponent } from './agregar-editar-tematica.component';

describe('AgregarEditarTematicaComponent', () => {
  let component: AgregarEditarTematicaComponent;
  let fixture: ComponentFixture<AgregarEditarTematicaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarEditarTematicaComponent]
    });
    fixture = TestBed.createComponent(AgregarEditarTematicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
