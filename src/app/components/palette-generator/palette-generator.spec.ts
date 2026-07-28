import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaletteGenerator } from './palette-generator';

describe('PaletteGenerator', () => {
  let component: PaletteGenerator;
  let fixture: ComponentFixture<PaletteGenerator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaletteGenerator],
    }).compileComponents();

    fixture = TestBed.createComponent(PaletteGenerator);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
