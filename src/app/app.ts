import { Component } from '@angular/core';
import { PaletteGenerator } from './components/palette-generator/palette-generator';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PaletteGenerator],
  template: `<app-palette-generator></app-palette-generator>`
})
export class App {}