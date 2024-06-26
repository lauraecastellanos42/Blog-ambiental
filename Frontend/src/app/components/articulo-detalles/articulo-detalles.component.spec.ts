import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticuloDetallesComponent } from './articulo-detalles.component';

describe('ArticuloDetallesComponent', () => {
  let component: ArticuloDetallesComponent;
  let fixture: ComponentFixture<ArticuloDetallesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArticuloDetallesComponent]
    });
    fixture = TestBed.createComponent(ArticuloDetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
