import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TituloDaPaginaComponent } from './titulo-da-pagina.component';

describe('TituloDaPaginaComponent', () => {
  let component: TituloDaPaginaComponent;
  let fixture: ComponentFixture<TituloDaPaginaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TituloDaPaginaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TituloDaPaginaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
