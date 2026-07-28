import { Injectable, signal } from '@angular/core';

export interface ColorShade {
  name: string;   // e.g. '500'
  hex: string;
  rgb: string;
}

export interface Theme {
  baseColor: string;
  shades: ColorShade[];
}

@Injectable({ providedIn: 'root' })
export class Palette {
  theme = signal<Theme | null>(null);
  palette = signal<string[]>([]);

  // ---- Random palette (simple swatches) ----
  generateRandomPalette(count: number = 6): void {
    const colors: string[] = [];
    for (let i = 0; i < count; i++) {
      colors.push(this.randomHex());
    }
    this.palette.set(colors);
  }

  private randomHex(): string {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return this.rgbToHex(r, g, b);
  }

  // ---- Theme generation from a single base color (Tailwind-style shades) ----
  generateTheme(baseHex: string): void {
    const hsl = this.hexToHsl(baseHex);
    const shadeSteps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

    const shades: ColorShade[] = shadeSteps.map(step => {
      const lightness = this.lightnessForStep(step, hsl.l);
      const hex = this.hslToHex(hsl.h, hsl.s, lightness);
      const rgb = this.hexToRgbString(hex);
      return { name: step.toString(), hex, rgb };
    });

    this.theme.set({ baseColor: baseHex, shades });
  }

  private lightnessForStep(step: number, baseLightness: number): number {
    const map: Record<number, number> = {
      50: 95, 100: 90, 200: 80, 300: 70, 400: 60,
      500: baseLightness, 600: 45, 700: 35, 800: 25, 900: 15
    };
    return map[step];
  }

  // ---- Color conversion helpers ----
  hexToHsl(hex: string): { h: number; s: number; l: number } {
    const { r, g, b } = this.hexToRgb(hex);
    const rN = r / 255, gN = g / 255, bN = b / 255;
    const max = Math.max(rN, gN, bN), min = Math.min(rN, gN, bN);
    let h = 0, s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case rN: h = (gN - bN) / d + (gN < bN ? 6 : 0); break;
        case gN: h = (bN - rN) / d + 2; break;
        case bN: h = (rN - gN) / d + 4; break;
      }
      h *= 60;
    }
    return { h, s: s * 100, l: l * 100 };
  }

  hslToHex(h: number, s: number, l: number): string {
    s /= 100; l /= 100;
    const k = (n: number) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n: number) =>
      l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    const r = Math.round(f(0) * 255);
    const g = Math.round(f(8) * 255);
    const b = Math.round(f(4) * 255);
    return this.rgbToHex(r, g, b);
  }

  hexToRgb(hex: string): { r: number; g: number; b: number } {
    const clean = hex.replace('#', '');
    const bigint = parseInt(clean, 16);
    return { r: (bigint >> 16) & 255, g: (bigint >> 8) & 255, b: bigint & 255 };
  }

  hexToRgbString(hex: string): string {
    const { r, g, b } = this.hexToRgb(hex);
    return `rgb(${r}, ${g}, ${b})`;
  }

  rgbToHex(r: number, g: number, b: number): string {
    return '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('');
  }
}