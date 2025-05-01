export function getContrastTextColor(hexColor: string): string {
  const color = hexColor.charAt(0) === "#" ? hexColor.substring(1) : hexColor;

  const r = parseInt(color.substr(0, 2), 16);
  const g = parseInt(color.substr(2, 2), 16);
  const b = parseInt(color.substr(4, 2), 16);

  // Calculate brightness using standard formula
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  return brightness > 128 ? "#000000" : "#FFFFFF";
}
