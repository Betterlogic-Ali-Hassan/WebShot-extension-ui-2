"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  className?: string;
  buttonClassName?: string;
  showAlpha?: boolean;
  recentColors?: string[];
}

export function ColorPicker({
  color,
  onChange,
  className,
  buttonClassName,
  showAlpha = true,
  recentColors = [
    "#FF3B30",
    "#FF9500",
    "#FFCC00",
    "#34C759",
    "#007AFF",
    "#5856D6",
  ],
}: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hue, setHue] = useState(0);
  const [saturation, setSaturation] = useState(100);
  const [brightness, setBrightness] = useState(100);
  const [alpha, setAlpha] = useState(100);
  const [hexValue, setHexValue] = useState(color.replace("#", ""));
  const [rgbValues, setRgbValues] = useState({ r: 255, g: 48, b: 48 });

  // Track if the color change is internal (from HSV controls) or external (from color prop)
  const isInternalColorChange = useRef(false);

  // Refs for DOM elements
  const buttonRef = useRef<HTMLButtonElement>(null);
  const pickerRef = useRef<HTMLDivElement>(null);
  const saturationBoxRef = useRef<HTMLDivElement>(null);
  const hueSliderRef = useRef<HTMLDivElement>(null);
  const alphaSliderRef = useRef<HTMLDivElement>(null);

  // Initialize color values from color prop when it changes externally
  useEffect(() => {
    if (isInternalColorChange.current) {
      isInternalColorChange.current = false;
      return;
    }

    if (color && color !== "transparent") {
      const { h, s, v, r, g, b, a } = parseColor(color);
      setHue(h);
      setSaturation(s);
      setBrightness(v);
      setRgbValues({ r, g, b });
      setHexValue(rgbToHex(r, g, b).replace("#", ""));
      setAlpha(a);
    }
  }, [color]);

  // Update RGB values when HSV values change
  useEffect(() => {
    const rgb = hsvToRgb(hue, saturation, brightness);
    setRgbValues(rgb);
    const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
    setHexValue(hex.replace("#", ""));
  }, [hue, saturation, brightness]);

  // Update color when RGB or alpha values change
  useEffect(() => {
    isInternalColorChange.current = true;
    const hex = rgbToHex(rgbValues.r, rgbValues.g, rgbValues.b);

    if (showAlpha && alpha < 100) {
      onChange(
        `rgba(${rgbValues.r}, ${rgbValues.g}, ${rgbValues.b}, ${alpha / 100})`
      );
    } else {
      onChange(hex);
    }
  }, [rgbValues, alpha, onChange, showAlpha]);

  // Close color picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Event handlers for saturation box
  const handleSaturationMove = (e: MouseEvent) => {
    if (!saturationBoxRef.current) return;

    const rect = saturationBoxRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    setSaturation(x * 100);
    setBrightness(100 - y * 100);
  };

  const handleSaturationTouchMove = (e: TouchEvent) => {
    e.preventDefault();
    if (!saturationBoxRef.current) return;

    const rect = saturationBoxRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const x = Math.max(
      0,
      Math.min(1, (touch.clientX - rect.left) / rect.width)
    );
    const y = Math.max(
      0,
      Math.min(1, (touch.clientY - rect.top) / rect.height)
    );
    setSaturation(x * 100);
    setBrightness(100 - y * 100);
  };

  const handleSaturationEnd = () => {
    document.removeEventListener("mousemove", handleSaturationMove);
    document.removeEventListener("mouseup", handleSaturationEnd);
    document.removeEventListener("touchmove", handleSaturationTouchMove);
    document.removeEventListener("touchend", handleSaturationEnd);
  };

  // Event handlers for hue slider
  const handleHueMove = (e: MouseEvent) => {
    if (!hueSliderRef.current) return;

    const rect = hueSliderRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    setHue(x * 360);
  };

  const handleHueTouchMove = (e: TouchEvent) => {
    e.preventDefault();
    if (!hueSliderRef.current) return;

    const rect = hueSliderRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const x = Math.max(
      0,
      Math.min(1, (touch.clientX - rect.left) / rect.width)
    );
    setHue(x * 360);
  };

  const handleHueEnd = () => {
    document.removeEventListener("mousemove", handleHueMove);
    document.removeEventListener("mouseup", handleHueEnd);
    document.removeEventListener("touchmove", handleHueTouchMove);
    document.removeEventListener("touchend", handleHueEnd);
  };

  // Event handlers for alpha slider
  const handleAlphaMove = (e: MouseEvent) => {
    if (!alphaSliderRef.current) return;

    const rect = alphaSliderRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    setAlpha(x * 100);
  };

  const handleAlphaTouchMove = (e: TouchEvent) => {
    e.preventDefault();
    if (!alphaSliderRef.current) return;

    const rect = alphaSliderRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const x = Math.max(
      0,
      Math.min(1, (touch.clientX - rect.left) / rect.width)
    );
    setAlpha(x * 100);
  };

  const handleAlphaEnd = () => {
    document.removeEventListener("mousemove", handleAlphaMove);
    document.removeEventListener("mouseup", handleAlphaEnd);
    document.removeEventListener("touchmove", handleAlphaTouchMove);
    document.removeEventListener("touchend", handleAlphaEnd);
  };

  return (
    <div className={cn("relative", className)}>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-8 h-8 rounded-md flex items-center justify-center border cursor-pointer border-border shadow-sm relative transition-colors duration-200 hover:border-text/60",
          buttonClassName
        )}
        style={{ backgroundColor: color }}
        aria-label='Select color'
      >
        <ChevronDown className='h-3 w-3 absolute right-0 bottom-0 text-white bg-black bg-opacity-30 rounded-full p-0.5' />
      </button>

      {isOpen && (
        <div ref={pickerRef} className='absolute top-full left-0 mt-2 z-50'>
          <div className='p-3 rounded-2xl shadow-lg border w-[300px] transition-all duration-200 bg-background border-border text-text'>
            {/* Saturation/Value box */}
            <div
              ref={saturationBoxRef}
              className='w-full h-[180px] rounded-xl mb-3 relative cursor-crosshair touch-none'
              style={{ backgroundColor: `hsl(${hue}, 100%, 50%)` }}
              onMouseDown={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = Math.max(
                  0,
                  Math.min(1, (e.clientX - rect.left) / rect.width)
                );
                const y = Math.max(
                  0,
                  Math.min(1, (e.clientY - rect.top) / rect.height)
                );
                setSaturation(x * 100);
                setBrightness(100 - y * 100);
                document.addEventListener("mousemove", handleSaturationMove);
                document.addEventListener("mouseup", handleSaturationEnd);
              }}
              onTouchStart={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const touch = e.touches[0];
                const x = Math.max(
                  0,
                  Math.min(1, (touch.clientX - rect.left) / rect.width)
                );
                const y = Math.max(
                  0,
                  Math.min(1, (touch.clientY - rect.top) / rect.height)
                );
                setSaturation(x * 100);
                setBrightness(100 - y * 100);
                document.addEventListener(
                  "touchmove",
                  handleSaturationTouchMove
                );
                document.addEventListener("touchend", handleSaturationEnd);
              }}
            >
              <div className='absolute inset-0 bg-gradient-to-r from-white to-transparent rounded-xl'></div>
              <div className='absolute inset-0 bg-gradient-to-b from-transparent to-black rounded-xl'></div>
              <div
                className='absolute w-5 h-5 rounded-full border-2 border-white shadow-md transform -translate-x-1/2 -translate-y-1/2'
                style={{
                  left: `${saturation}%`,
                  top: `${100 - brightness}%`,
                }}
              ></div>
            </div>

            {/* Hue slider */}
            <div
              ref={hueSliderRef}
              className='w-full h-4 rounded-full mb-3 relative cursor-pointer touch-none'
              style={{
                background:
                  "linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)",
              }}
              onMouseDown={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = Math.max(
                  0,
                  Math.min(1, (e.clientX - rect.left) / rect.width)
                );
                setHue(x * 360);
                document.addEventListener("mousemove", handleHueMove);
                document.addEventListener("mouseup", handleHueEnd);
              }}
              onTouchStart={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const touch = e.touches[0];
                const x = Math.max(
                  0,
                  Math.min(1, (touch.clientX - rect.left) / rect.width)
                );
                setHue(x * 360);
                document.addEventListener("touchmove", handleHueTouchMove);
                document.addEventListener("touchend", handleHueEnd);
              }}
            >
              <div
                className='absolute w-4 h-4 rounded-full border-2 border-white shadow-md transform -translate-x-1/2 -translate-y-1/2 top-1/2'
                style={{ left: `${(hue / 360) * 100}%` }}
              ></div>
            </div>

            {/* Alpha slider */}
            {showAlpha && (
              <div
                ref={alphaSliderRef}
                className='w-full h-4 rounded-full mb-4 relative cursor-pointer touch-none bg-checkered'
                onMouseDown={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = Math.max(
                    0,
                    Math.min(1, (e.clientX - rect.left) / rect.width)
                  );
                  setAlpha(x * 100);
                  document.addEventListener("mousemove", handleAlphaMove);
                  document.addEventListener("mouseup", handleAlphaEnd);
                }}
                onTouchStart={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const touch = e.touches[0];
                  const x = Math.max(
                    0,
                    Math.min(1, (touch.clientX - rect.left) / rect.width)
                  );
                  setAlpha(x * 100);
                  document.addEventListener("touchmove", handleAlphaTouchMove);
                  document.addEventListener("touchend", handleAlphaEnd);
                }}
              >
                <div
                  className='absolute inset-0 rounded-full'
                  style={{
                    background: `linear-gradient(to right, transparent, hsl(${hue}, 100%, 50%))`,
                  }}
                ></div>
                <div
                  className='absolute w-4 h-4 rounded-full border-2 border-white shadow-md transform -translate-x-1/2 -translate-y-1/2 top-1/2'
                  style={{ left: `${alpha}%` }}
                ></div>
              </div>
            )}

            {/* Color preview and hex input */}
            <div className='flex items-center gap-3 mb-4'>
              <div className='w-8 h-8 rounded-lg shadow-sm border border-border bg-checkered flex-shrink-0'>
                <div
                  className='w-full h-full rounded-lg'
                  style={{
                    backgroundColor: `rgba(${rgbValues.r}, ${rgbValues.g}, ${
                      rgbValues.b
                    }, ${alpha / 100})`,
                  }}
                ></div>
              </div>

              <div className='flex-1'>
                <div className='flex items-center'>
                  <span className='text-xs mr-1'>#</span>
                  <input
                    type='text'
                    value={hexValue}
                    onChange={(e) => {
                      const value = e.target.value
                        .replace(/[^0-9A-Fa-f]/g, "")
                        .substring(0, 6);
                      setHexValue(value);
                      if (value.length === 6) {
                        try {
                          const r = Number.parseInt(value.substring(0, 2), 16);
                          const g = Number.parseInt(value.substring(2, 4), 16);
                          const b = Number.parseInt(value.substring(4, 6), 16);
                          setRgbValues({ r, g, b });
                          const hsv = rgbToHsv(r, g, b);
                          setHue(hsv.h);
                          setSaturation(hsv.s);
                          setBrightness(hsv.v);
                        } catch (error) {
                          console.error("Invalid hex color", error);
                        }
                      }
                    }}
                    className='w-full text-sm py-1.5 px-2 rounded-md focus:outline-none transition-all bg-searchbar text-text'
                  />
                </div>
              </div>
            </div>

            {/* RGB and Alpha inputs */}
            <div className='grid grid-cols-4 gap-1.5 mb-4'>
              <div>
                <label className='block text-xs mb-1 opacity-70'>R</label>
                <input
                  type='number'
                  min='0'
                  max='255'
                  value={rgbValues.r}
                  onChange={(e) => {
                    const value = Math.max(
                      0,
                      Math.min(255, Number.parseInt(e.target.value) || 0)
                    );
                    const newRgb = { ...rgbValues, r: value };
                    setRgbValues(newRgb);
                    const hsv = rgbToHsv(newRgb.r, newRgb.g, newRgb.b);
                    setHue(hsv.h);
                    setSaturation(hsv.s);
                    setBrightness(hsv.v);
                  }}
                  className='w-full h-8 text-sm py-1 px-1.5 rounded-md focus:outline-none transition-all bg-searchbar text-text'
                />
              </div>
              <div>
                <label className='block text-xs mb-1 opacity-70'>G</label>
                <input
                  type='number'
                  min='0'
                  max='255'
                  value={rgbValues.g}
                  onChange={(e) => {
                    const value = Math.max(
                      0,
                      Math.min(255, Number.parseInt(e.target.value) || 0)
                    );
                    const newRgb = { ...rgbValues, g: value };
                    setRgbValues(newRgb);
                    const hsv = rgbToHsv(newRgb.r, newRgb.g, newRgb.b);
                    setHue(hsv.h);
                    setSaturation(hsv.s);
                    setBrightness(hsv.v);
                  }}
                  className='w-full h-8 text-sm py-1 px-1.5 rounded-md focus:outline-none transition-all bg-searchbar text-text'
                />
              </div>
              <div>
                <label className='block text-xs mb-1 opacity-70'>B</label>
                <input
                  type='number'
                  min='0'
                  max='255'
                  value={rgbValues.b}
                  onChange={(e) => {
                    const value = Math.max(
                      0,
                      Math.min(255, Number.parseInt(e.target.value) || 0)
                    );
                    const newRgb = { ...rgbValues, b: value };
                    setRgbValues(newRgb);
                    const hsv = rgbToHsv(newRgb.r, newRgb.g, newRgb.b);
                    setHue(hsv.h);
                    setSaturation(hsv.s);
                    setBrightness(hsv.v);
                  }}
                  className='w-full h-8 text-sm py-1 px-1.5 rounded-md focus:outline-none transition-all bg-searchbar text-text'
                />
              </div>
              {showAlpha && (
                <div>
                  <label className='block text-xs mb-1 opacity-70'>A</label>
                  <input
                    type='number'
                    min='0'
                    max='100'
                    value={Math.round(alpha)}
                    onChange={(e) => {
                      setAlpha(
                        Math.max(
                          0,
                          Math.min(100, Number.parseInt(e.target.value) || 0)
                        )
                      );
                    }}
                    className='w-full h-8 text-sm py-1 px-1.5 rounded-md focus:outline-none transition-all bg-searchbar text-text'
                  />
                </div>
              )}
            </div>

            {/* Recent Colors */}
            <div>
              <label className='block text-xs mb-2 opacity-70'>
                Recent Colors
              </label>
              <div className='flex flex-wrap gap-2'>
                {recentColors.map((recentColor) => (
                  <button
                    key={recentColor}
                    className='w-7 h-7 rounded-full border border-border shadow-sm transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white'
                    style={{ backgroundColor: recentColor }}
                    onClick={() => {
                      const { h, s, v, r, g, b } = parseColor(recentColor);
                      setHue(h);
                      setSaturation(s);
                      setBrightness(v);
                      setRgbValues({ r, g, b });
                      setHexValue(recentColor.replace("#", ""));
                      setAlpha(100);
                    }}
                    aria-label={`Select color ${recentColor}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Color conversion utilities
export function parseColor(color: string) {
  // Handle rgba format
  if (color.startsWith("rgba")) {
    const match = color.match(/rgba$$(\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)$$/);
    if (match) {
      const r = Number.parseInt(match[1], 10);
      const g = Number.parseInt(match[2], 10);
      const b = Number.parseInt(match[3], 10);
      const a = Number.parseFloat(match[4]) * 100;
      const hsv = rgbToHsv(r, g, b);
      return { ...hsv, r, g, b, a };
    }
  }

  // Handle transparent
  if (color === "transparent") {
    return { h: 0, s: 0, v: 100, r: 255, g: 255, b: 255, a: 0 };
  }

  // Handle hex format
  color = color.replace(/^#/, "");
  let r, g, b;
  if (color.length === 3) {
    r = Number.parseInt(color[0] + color[0], 16);
    g = Number.parseInt(color[1] + color[1], 16);
    b = Number.parseInt(color[2] + color[2], 16);
  } else {
    r = Number.parseInt(color.substring(0, 2), 16);
    g = Number.parseInt(color.substring(2, 4), 16);
    b = Number.parseInt(color.substring(4, 6), 16);
  }

  // Convert RGB to HSV
  const hsv = rgbToHsv(r, g, b);
  return { ...hsv, r, g, b, a: 100 };
}

export function rgbToHsv(r: number, g: number, b: number) {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;

  let h = 0;
  const s = max === 0 ? 0 : d / max;
  const v = max;

  if (max !== min) {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return { h: h * 360, s: s * 100, v: v * 100 };
}

export function hsvToRgb(h: number, s: number, v: number) {
  h /= 360;
  s /= 100;
  v /= 100;

  let r, g, b;
  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0:
      r = v;
      g = t;
      b = p;
      break;
    case 1:
      r = q;
      g = v;
      b = p;
      break;
    case 2:
      r = p;
      g = v;
      b = t;
      break;
    case 3:
      r = p;
      g = q;
      b = v;
      break;
    case 4:
      r = t;
      g = p;
      b = v;
      break;
    case 5:
      r = v;
      g = p;
      b = q;
      break;
    default:
      r = v;
      g = t;
      b = p;
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

export function rgbToHex(r: number, g: number, b: number) {
  return `#${[r, g, b]
    .map((x) => {
      const hex = x.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    })
    .join("")}`;
}
