import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Palette } from '../../services/palette';
import { Export } from '../../services/export';

@Component({
  selector: 'app-palette-generator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './palette-generator.html',
  styleUrl: './palette-generator.scss'
})
export class PaletteGenerator {
  baseColor = '#3b82f6';

  constructor(
    public paletteService: Palette,
    private exportService: Export
  ) {}

  generateTheme(): void {
    this.paletteService.generateTheme(this.baseColor);
  }

  generateRandomPalette(): void {
    this.paletteService.generateRandomPalette(6);
  }

  exportThemeCss(): void {
    const theme = this.paletteService.theme();
    if (theme) this.exportService.exportThemeAsCss(theme);
  }

  exportPaletteCss(): void {
    const palette = this.paletteService.palette();
    if (palette.length) this.exportService.exportPaletteAsCss(palette);
  }

  copyToClipboard(hex: string): void {
    navigator.clipboard.writeText(hex);
  }
}