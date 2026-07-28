import { Injectable } from '@angular/core';
import { Theme } from './palette';

@Injectable({ providedIn: 'root' })
export class Export {

  exportThemeAsCss(theme: Theme, filename = 'theme.css'): void {
    const cssContent = this.buildCssVariables(theme);
    this.downloadFile(cssContent, filename, 'text/css');
  }

  exportPaletteAsCss(palette: string[], filename = 'palette.css'): void {
    let css = ':root {\n';
    palette.forEach((color, i) => {
      css += `  --color-${i + 1}: ${color};\n`;
    });
    css += '}\n';
    this.downloadFile(css, filename, 'text/css');
  }

  private buildCssVariables(theme: Theme): string {
    let css = ':root {\n';
    theme.shades.forEach(shade => {
      css += `  --color-${shade.name}: ${shade.hex};\n`;
    });
    css += '}\n';
    return css;
  }

  private downloadFile(content: string, filename: string, mimeType: string): void {
    const blob = new Blob([content], { type: mimeType });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    window.URL.revokeObjectURL(url);
  }
}