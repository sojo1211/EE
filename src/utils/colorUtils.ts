export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

function getRelativeLuminance(color: { r: number; g: number; b: number }): number {
  const rs = color.r / 255;
  const gs = color.g / 255;
  const bs = color.b / 255;

  const r = rs <= 0.03928 ? rs / 12.92 : Math.pow((rs + 0.055) / 1.055, 2.4);
  const g = gs <= 0.03928 ? gs / 12.92 : Math.pow((gs + 0.055) / 1.055, 2.4);
  const b = bs <= 0.03928 ? bs / 12.92 : Math.pow((bs + 0.055) / 1.055, 2.4);

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function getContrastRatio(hex1: string, hex2: string): number {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);

  if (!rgb1 || !rgb2) return 1;

  const l1 = getRelativeLuminance(rgb1);
  const l2 = getRelativeLuminance(rgb2);

  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  // Return formatted to 1 decimal place
  return parseFloat(((lighter + 0.05) / (darker + 0.05)).toFixed(2));
}

export function getWCAGRating(ratio: number): { normal: string; large: string } {
  return {
    normal: ratio >= 7 ? 'AAA (PASS)' : ratio >= 4.5 ? 'AA (PASS)' : 'FAIL',
    large: ratio >= 4.5 ? 'AAA (PASS)' : ratio >= 3 ? 'AA (PASS)' : 'FAIL',
  };
}
