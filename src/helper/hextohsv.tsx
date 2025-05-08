import { rgbToHsv } from "@/components/common/ColorPicker";

export function hexToHsv(hex: string) {
  // Remove # if present
  hex = hex.replace(/^#/, "");

  // Parse the hex string
  let r, g, b;
  if (hex.length === 3) {
    r = Number.parseInt(hex[0] + hex[0], 16);
    g = Number.parseInt(hex[1] + hex[1], 16);
    b = Number.parseInt(hex[2] + hex[2], 16);
  } else {
    r = Number.parseInt(hex.substring(0, 2), 16);
    g = Number.parseInt(hex.substring(2, 4), 16);
    b = Number.parseInt(hex.substring(4, 6), 16);
  }

  // Convert RGB to HSV
  const hsv = rgbToHsv(r, g, b);
  return { ...hsv, r, g, b };
}
