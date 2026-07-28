import { TestBed } from '@angular/core/testing';

import { Palette } from './palette';

describe('Palette', () => {
  let service: Palette;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Palette);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
