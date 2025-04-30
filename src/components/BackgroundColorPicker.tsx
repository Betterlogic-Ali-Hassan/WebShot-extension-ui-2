"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

// Helper functions for color conversion
const rgbToHsv = (r: number, g: number, b: number) => {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const v = max;

  const d = max - min;
  s = max === 0 ? 0 : d / max;

  if (max === min) {
    h = 0; // achromatic
  } else {
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
};

const hsvToRgb = (h: number, s: number, v: number) => {
  h /= 360;
  s /= 100;
  v /= 100;

  let r = 0;
  let g = 0;
  let b = 0;

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
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
};

const rgbToHex = (r: number, g: number, b: number) => {
  return (
    (r < 16 ? "0" : "") +
    r.toString(16).toUpperCase() +
    (g < 16 ? "0" : "") +
    g.toString(16).toUpperCase() +
    (b < 16 ? "0" : "") +
    b.toString(16).toUpperCase()
  );
};

const hexToRgb = (hex: string) => {
  const r = Number.parseInt(hex.substring(0, 2), 16);
  const g = Number.parseInt(hex.substring(2, 4), 16);
  const b = Number.parseInt(hex.substring(4, 6), 16);
  return { r, g, b };
};

const hexToHsv = (hex: string) => {
  // Remove # if present
  hex = hex.replace("#", "");
  const { r, g, b } = hexToRgb(hex);
  const hsv = rgbToHsv(r, g, b);
  return { ...hsv, r, g, b };
};

const BackgroundColorPicker = () => {
  const bgColorButtonRef = useRef<HTMLButtonElement>(null);
  const bgHueSliderRef = useRef<HTMLDivElement>(null);
  const bgAlphaSliderRef = useRef<HTMLDivElement>(null);
  const bgColorPickerRef = useRef<HTMLDivElement>(null);
  const [isBackgroundColorPickerOpen, setIsBackgroundColorPickerOpen] =
    useState(false);
  const [backgroundColor, setBackgroundColor] = useState("transparent");
  const [bgHue, setBgHue] = useState(0);
  const [bgSaturation, setBgSaturation] = useState(100);
  const [bgBrightness, setBgBrightness] = useState(100);
  const [bgAlpha, setBgAlpha] = useState(0); // Start with transparent
  const [bgHexValue, setBgHexValue] = useState("FFFFFF");
  const [bgRgbValues, setBgRgbValues] = useState({ r: 255, g: 255, b: 255 });
  const bgSaturationBoxRef = useRef<HTMLDivElement>(null);

  // Update the background color whenever HSV or alpha changes
  useEffect(() => {
    const rgb = hsvToRgb(bgHue, bgSaturation, bgBrightness);
    setBgRgbValues(rgb);
    setBgHexValue(rgbToHex(rgb.r, rgb.g, rgb.b));

    if (bgAlpha === 0) {
      setBackgroundColor("transparent");
    } else {
      setBackgroundColor(
        `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${bgAlpha / 100})`
      );
    }
  }, [bgHue, bgSaturation, bgBrightness, bgAlpha]);

  // Close color picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        bgColorPickerRef.current &&
        !bgColorPickerRef.current.contains(event.target as Node) &&
        bgColorButtonRef.current &&
        !bgColorButtonRef.current.contains(event.target as Node)
      ) {
        setIsBackgroundColorPickerOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleBgSaturationMove = (e: MouseEvent) => {
    if (!bgSaturationBoxRef.current) return;

    const rect = bgSaturationBoxRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    setBgSaturation(x * 100);
    setBgBrightness(100 - y * 100);
  };

  const handleBgSaturationTouchMove = (e: TouchEvent) => {
    e.preventDefault();
    if (!bgSaturationBoxRef.current) return;

    const rect = bgSaturationBoxRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const x = Math.max(
      0,
      Math.min(1, (touch.clientX - rect.left) / rect.width)
    );
    const y = Math.max(
      0,
      Math.min(1, (touch.clientY - rect.top) / rect.height)
    );
    setBgSaturation(x * 100);
    setBgBrightness(100 - y * 100);
  };

  const handleBgSaturationEnd = () => {
    document.removeEventListener("mousemove", handleBgSaturationMove);
    document.removeEventListener("mouseup", handleBgSaturationEnd);
    document.removeEventListener("touchmove", handleBgSaturationTouchMove);
    document.removeEventListener("touchend", handleBgSaturationEnd);
  };

  // Event handlers for background color hue slider
  const handleBgHueMove = (e: MouseEvent) => {
    if (!bgHueSliderRef.current) return;

    const rect = bgHueSliderRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    setBgHue(x * 360);
  };

  const handleBgHueTouchMove = (e: TouchEvent) => {
    e.preventDefault();
    if (!bgHueSliderRef.current) return;

    const rect = bgHueSliderRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const x = Math.max(
      0,
      Math.min(1, (touch.clientX - rect.left) / rect.width)
    );
    setBgHue(x * 360);
  };

  const handleBgHueEnd = () => {
    document.removeEventListener("mousemove", handleBgHueMove);
    document.removeEventListener("mouseup", handleBgHueEnd);
    document.removeEventListener("touchmove", handleBgHueTouchMove);
    document.removeEventListener("touchend", handleBgHueEnd);
  };

  // Event handlers for background color alpha slider
  const handleBgAlphaMove = (e: MouseEvent) => {
    if (!bgAlphaSliderRef.current) return;

    const rect = bgAlphaSliderRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    setBgAlpha(x * 100);
  };

  const handleBgAlphaTouchMove = (e: TouchEvent) => {
    e.preventDefault();
    if (!bgAlphaSliderRef.current) return;

    const rect = bgAlphaSliderRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const x = Math.max(
      0,
      Math.min(1, (touch.clientX - rect.left) / rect.width)
    );
    setBgAlpha(x * 100);
  };

  const handleBgAlphaEnd = () => {
    document.removeEventListener("mousemove", handleBgAlphaMove);
    document.removeEventListener("mouseup", handleBgAlphaEnd);
    document.removeEventListener("touchmove", handleBgAlphaTouchMove);
    document.removeEventListener("touchend", handleBgAlphaEnd);
  };

  return (
    <div className='relative'>
      <button
        ref={bgColorButtonRef}
        onClick={() =>
          setIsBackgroundColorPickerOpen(!isBackgroundColorPickerOpen)
        }
        className='flex items-center gap-2 px-3 py-1.5 rounded-md border transition-all duration-200 bg-border border-tool-selected-color hover:bg-hover'
      >
        <div
          className='w-5 h-5 rounded-sm border border-text flex-shrink-0 bg-checkered'
          style={{ backgroundColor: backgroundColor }}
        >
          <div
            className='w-full h-full rounded-sm'
            style={{ backgroundColor: backgroundColor }}
          ></div>
        </div>
        <span className='text-sm'>
          {backgroundColor === "transparent"
            ? "Transparent"
            : bgHexValue
            ? `#${bgHexValue}`
            : backgroundColor.length > 7
            ? backgroundColor.substring(0, 7) + "..."
            : backgroundColor}
        </span>
        <ChevronDown className='h-3.5 w-3.5 opacity-70' />
      </button>

      {isBackgroundColorPickerOpen && (
        <div
          ref={bgColorPickerRef}
          className='absolute top-full right-0 mt-2 z-50'
        >
          <div className='p-3 rounded-2xl shadow-lg border w-[300px] transition-all duration-200 bg-background border-border'>
            {/* Saturation/Value box */}
            <div
              ref={bgSaturationBoxRef}
              className='w-full h-[180px] rounded-xl mb-3 relative cursor-crosshair touch-none'
              style={{ backgroundColor: `hsl(${bgHue}, 100%, 50%)` }}
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
                setBgSaturation(x * 100);
                setBgBrightness(100 - y * 100);
                document.addEventListener("mousemove", handleBgSaturationMove);
                document.addEventListener("mouseup", handleBgSaturationEnd);
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
                setBgSaturation(x * 100);
                setBgBrightness(100 - y * 100);
                document.addEventListener(
                  "touchmove",
                  handleBgSaturationTouchMove
                );
                document.addEventListener("touchend", handleBgSaturationEnd);
              }}
            >
              <div className='absolute inset-0 bg-gradient-to-r from-white to-transparent rounded-xl'></div>
              <div className='absolute inset-0 bg-gradient-to-b from-transparent to-black rounded-xl'></div>
              <div
                className='absolute w-5 h-5 rounded-full border-2 border-white shadow-md transform -translate-x-1/2 -translate-y-1/2'
                style={{
                  left: `${bgSaturation}%`,
                  top: `${100 - bgBrightness}%`,
                }}
              ></div>
            </div>

            {/* Hue slider */}
            <div
              ref={bgHueSliderRef}
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
                setBgHue(x * 360);
                document.addEventListener("mousemove", handleBgHueMove);
                document.addEventListener("mouseup", handleBgHueEnd);
              }}
              onTouchStart={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const touch = e.touches[0];
                const x = Math.max(
                  0,
                  Math.min(1, (touch.clientX - rect.left) / rect.width)
                );
                setBgHue(x * 360);
                document.addEventListener("touchmove", handleBgHueTouchMove);
                document.addEventListener("touchend", handleBgHueEnd);
              }}
            >
              <div
                className='absolute w-4 h-4 rounded-full border-2 border-border shadow-md transform -translate-x-1/2 -translate-y-1/2 top-1/2 bg-white'
                style={{ left: `${(bgHue / 360) * 100}%` }}
              ></div>
            </div>

            {/* Alpha slider */}
            <div
              ref={bgAlphaSliderRef}
              className='w-full h-4 rounded-full mb-4 relative cursor-pointer touch-none bg-checkered'
              onMouseDown={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = Math.max(
                  0,
                  Math.min(1, (e.clientX - rect.left) / rect.width)
                );
                setBgAlpha(x * 100);
                document.addEventListener("mousemove", handleBgAlphaMove);
                document.addEventListener("mouseup", handleBgAlphaEnd);
              }}
              onTouchStart={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const touch = e.touches[0];
                const x = Math.max(
                  0,
                  Math.min(1, (touch.clientX - rect.left) / rect.width)
                );
                setBgAlpha(x * 100);
                document.addEventListener("touchmove", handleBgAlphaTouchMove);
                document.addEventListener("touchend", handleBgAlphaEnd);
              }}
            >
              <div
                className='absolute inset-0 rounded-full'
                style={{
                  background: `linear-gradient(to right, transparent, hsl(${bgHue}, ${bgSaturation}%, ${bgBrightness}%))`,
                }}
              ></div>
              <div
                className='absolute w-4 h-4 rounded-full border-2 border-white shadow-md transform -translate-x-1/2 -translate-y-1/2 top-1/2 bg-white'
                style={{ left: `${bgAlpha}%` }}
              ></div>
            </div>

            {/* Color preview and hex input */}
            <div className='flex items-center gap-3 mb-4'>
              <div className='w-8 h-8 rounded-lg shadow-sm border border-gray-600 bg-checkered flex-shrink-0'>
                <div
                  className='w-full h-full rounded-lg'
                  style={{
                    backgroundColor: `rgba(${bgRgbValues.r}, ${
                      bgRgbValues.g
                    }, ${bgRgbValues.b}, ${bgAlpha / 100})`,
                  }}
                ></div>
              </div>

              <div className='flex-1'>
                <div className='flex items-center'>
                  <span className='text-xs mr-1'>#</span>
                  <input
                    type='text'
                    value={bgHexValue}
                    onChange={(e) => {
                      const value = e.target.value
                        .replace(/[^0-9A-Fa-f]/g, "")
                        .substring(0, 6)
                        .toUpperCase();
                      setBgHexValue(value);
                      if (value.length === 6) {
                        try {
                          const { r, g, b } = hexToRgb(value);
                          setBgRgbValues({ r, g, b });
                          const hsv = rgbToHsv(r, g, b);
                          setBgHue(hsv.h);
                          setBgSaturation(hsv.s);
                          setBgBrightness(hsv.v);
                        } catch (error) {
                          console.error(error);
                        }
                      }
                    }}
                    className='w-full text-sm py-1.5 px-2 rounded-md focus:outline-none transition-all bg-card text-text'
                  />
                </div>
              </div>
            </div>

            {/* Transparency option */}
            <div className='flex items-center mb-4'>
              <button
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 rounded-md border transition-all duration-200 w-full bg-border hover:bg-hover",
                  bgAlpha === 0 && "bg-tool-selected-color"
                )}
                onClick={() => setBgAlpha(bgAlpha === 0 ? 100 : 0)}
              >
                <div className='w-4 h-4 rounded-sm border border-text bg-checkered relative'>
                  <div className='w-full h-full rounded-sm'></div>
                  {bgAlpha === 0 && (
                    <div className='absolute inset-0 flex items-center justify-center'>
                      <div className='w-2.5 h-2.5 bg-info rounded-sm'></div>
                    </div>
                  )}
                </div>
                <span className='text-sm'>Transparent background</span>
              </button>
            </div>

            {/* Recent Colors */}
            <div>
              <label className='block text-xs mb-2 opacity-70'>
                Recent Colors
              </label>
              <div className='flex flex-wrap gap-2'>
                {[
                  "#FFFFFF",
                  "#F2F2F7",
                  "#E5E5EA",
                  "#C7C7CC",
                  "#8E8E93",
                  "#636366",
                  "#3A3A3C",
                ].map((color) => (
                  <button
                    key={color}
                    className='w-7 h-7 rounded-full border border-gray-600 shadow-sm transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-text'
                    style={{ backgroundColor: color }}
                    onClick={() => {
                      const { h, s, v, r, g, b } = hexToHsv(color);
                      setBgHue(h);
                      setBgSaturation(s);
                      setBgBrightness(v);
                      setBgRgbValues({ r, g, b });
                      setBgHexValue(color.replace("#", ""));
                      setBgAlpha(100);
                    }}
                    aria-label={`Select color ${color}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BackgroundColorPicker;
