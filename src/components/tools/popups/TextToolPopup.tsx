"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import {
  ChevronDown,
  X,
  Minus,
  Plus,
  Bold,
  Italic,
  Underline,
  StrikethroughIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from "lucide-react";
import Button from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TextToolPopupProps {
  position: { top: number; left: number; width: number };
  isDarkMode: boolean;
  onClose: () => void;
  toolbarPosition: "top" | "left" | "bottom";
}

export function TextToolPopup({
  position,
  isDarkMode,
  onClose,
  toolbarPosition,
}: TextToolPopupProps) {
  // Text formatting state
  const [selectedFont, setSelectedFont] = useState("Calibri");
  const [fontSize, setFontSize] = useState(8);
  const [textColor, setTextColor] = useState("#FF3B30");
  const [backgroundColor, setBackgroundColor] = useState("transparent");
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [textAlignment, setTextAlignment] = useState("left");

  // Dropdown states
  const [isFontDropdownOpen, setIsFontDropdownOpen] = useState(false);
  const [isFontSizeDropdownOpen, setIsFontSizeDropdownOpen] = useState(false);
  const [isTextColorPickerOpen, setIsTextColorPickerOpen] = useState(false);
  const [isBackgroundColorPickerOpen, setIsBackgroundColorPickerOpen] =
    useState(false);

  // Color picker state for text color
  const [textHue, setTextHue] = useState(0);
  const [textSaturation, setTextSaturation] = useState(100);
  const [textBrightness, setTextBrightness] = useState(100);
  const [textAlpha, setTextAlpha] = useState(100);
  const [textHexValue, setTextHexValue] = useState(textColor.replace("#", ""));
  const [textRgbValues, setTextRgbValues] = useState({ r: 255, g: 59, b: 48 });

  // Color picker state for background color
  const [bgHue, setBgHue] = useState(0);
  const [bgSaturation, setBgSaturation] = useState(100);
  const [bgBrightness, setBgBrightness] = useState(100);
  const [bgAlpha, setBgAlpha] = useState(0); // Start with transparent
  const [bgHexValue, setBgHexValue] = useState("FFFFFF");
  const [bgRgbValues, setBgRgbValues] = useState({ r: 255, g: 255, b: 255 });

  // Track if the color change is internal
  const isInternalTextColorChange = useRef(false);
  const isInternalBgColorChange = useRef(false);

  // Refs for DOM elements
  const popupRef = useRef<HTMLDivElement>(null);
  const fontDropdownRef = useRef<HTMLDivElement>(null);
  const fontSizeDropdownRef = useRef<HTMLDivElement>(null);
  const textColorPickerRef = useRef<HTMLDivElement>(null);
  const textColorButtonRef = useRef<HTMLButtonElement>(null);
  const bgColorPickerRef = useRef<HTMLDivElement>(null);
  const bgColorButtonRef = useRef<HTMLButtonElement>(null);

  // Refs for color picker elements
  const textSaturationBoxRef = useRef<HTMLDivElement>(null);
  const textHueSliderRef = useRef<HTMLDivElement>(null);
  const textAlphaSliderRef = useRef<HTMLDivElement>(null);
  const bgSaturationBoxRef = useRef<HTMLDivElement>(null);
  const bgHueSliderRef = useRef<HTMLDivElement>(null);
  const bgAlphaSliderRef = useRef<HTMLDivElement>(null);
  const isToolbarLeft = toolbarPosition === "left";
  const isToolbarBottom = toolbarPosition === "bottom";
  // Available fonts
  const fonts = [
    "Calibri",
    "Arial",
    "Helvetica",
    "Times New Roman",
    "Georgia",
    "Verdana",
    "SF Pro",
    "Roboto",
    "Open Sans",
  ];

  // Initialize text color values
  useEffect(() => {
    if (isInternalTextColorChange.current) {
      isInternalTextColorChange.current = false;
      return;
    }

    if (textColor && textColor !== "transparent") {
      const { h, s, v, r, g, b } = hexToHsv(textColor);
      setTextHue(h);
      setTextSaturation(s);
      setTextBrightness(v);
      setTextRgbValues({ r, g, b });
      setTextHexValue(textColor.replace("#", ""));
    }
  }, [textColor]);

  // Initialize background color values
  useEffect(() => {
    if (isInternalBgColorChange.current) {
      isInternalBgColorChange.current = false;
      return;
    }

    if (backgroundColor && backgroundColor !== "transparent") {
      const { h, s, v, r, g, b } = hexToHsv(backgroundColor);
      setBgHue(h);
      setBgSaturation(s);
      setBgBrightness(v);
      setBgRgbValues({ r, g, b });
      setBgHexValue(backgroundColor.replace("#", ""));
      setBgAlpha(100);
    } else {
      // For transparent background
      setBgAlpha(0);
    }
  }, [backgroundColor]);

  // Update RGB values when HSV values change for text color
  useEffect(() => {
    const rgb = hsvToRgb(textHue, textSaturation, textBrightness);
    setTextRgbValues(rgb);
    const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
    setTextHexValue(hex.replace("#", ""));
  }, [textHue, textSaturation, textBrightness]);

  // Update RGB values when HSV values change for background color
  useEffect(() => {
    const rgb = hsvToRgb(bgHue, bgSaturation, bgBrightness);
    setBgRgbValues(rgb);
    const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
    setBgHexValue(hex.replace("#", ""));
  }, [bgHue, bgSaturation, bgBrightness]);

  // Update textColor when RGB or alpha values change
  useEffect(() => {
    isInternalTextColorChange.current = true;
    const hex = rgbToHex(textRgbValues.r, textRgbValues.g, textRgbValues.b);

    if (textAlpha < 100) {
      setTextColor(
        `rgba(${textRgbValues.r}, ${textRgbValues.g}, ${textRgbValues.b}, ${
          textAlpha / 100
        })`
      );
    } else {
      setTextColor(hex);
    }
  }, [textRgbValues, textAlpha]);

  // Update backgroundColor when RGB or alpha values change
  useEffect(() => {
    isInternalBgColorChange.current = true;

    if (bgAlpha <= 0) {
      setBackgroundColor("transparent");
    } else {
      const hex = rgbToHex(bgRgbValues.r, bgRgbValues.g, bgRgbValues.b);
      if (bgAlpha < 100) {
        setBackgroundColor(
          `rgba(${bgRgbValues.r}, ${bgRgbValues.g}, ${bgRgbValues.b}, ${
            bgAlpha / 100
          })`
        );
      } else {
        setBackgroundColor(hex);
      }
    }
  }, [bgRgbValues, bgAlpha]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Font dropdown
      if (
        fontDropdownRef.current &&
        !fontDropdownRef.current.contains(event.target as Node)
      ) {
        setIsFontDropdownOpen(false);
      }

      // Font size dropdown
      if (
        fontSizeDropdownRef.current &&
        !fontSizeDropdownRef.current.contains(event.target as Node)
      ) {
        setIsFontSizeDropdownOpen(false);
      }

      // Text color picker
      if (
        textColorPickerRef.current &&
        !textColorPickerRef.current.contains(event.target as Node) &&
        textColorButtonRef.current &&
        !textColorButtonRef.current.contains(event.target as Node)
      ) {
        setIsTextColorPickerOpen(false);
      }

      // Background color picker
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

  // Adjust position to stay within container bounds
  useEffect(() => {
    const adjustPosition = () => {
      if (!popupRef.current) return;

      popupRef.current.style.left = `${isToolbarLeft ? "0" : "50%"}`;
    };

    // Adjust position on initial render and window resize
    adjustPosition();
    window.addEventListener("resize", adjustPosition);

    return () => {
      window.removeEventListener("resize", adjustPosition);
    };
  }, [position]);

  // Font size handlers
  const decreaseFontSize = () => {
    setFontSize((prev) => Math.max(8, prev - 1));
  };

  const increaseFontSize = () => {
    setFontSize((prev) => Math.min(72, prev + 1));
  };

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      setFontSize(Math.min(Math.max(value, 8), 72));
    }
  };

  // Color conversion utilities
  function hexToHsv(hex: string) {
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

  function rgbToHsv(r: number, g: number, b: number) {
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

  function hsvToRgb(h: number, s: number, v: number) {
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

  function rgbToHex(r: number, g: number, b: number) {
    return `#${[r, g, b]
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")}`;
  }

  // Event handlers for text color saturation box
  const handleTextSaturationMove = (e: MouseEvent) => {
    if (!textSaturationBoxRef.current) return;

    const rect = textSaturationBoxRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    setTextSaturation(x * 100);
    setTextBrightness(100 - y * 100);
  };

  const handleTextSaturationTouchMove = (e: TouchEvent) => {
    e.preventDefault();
    if (!textSaturationBoxRef.current) return;

    const rect = textSaturationBoxRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const x = Math.max(
      0,
      Math.min(1, (touch.clientX - rect.left) / rect.width)
    );
    const y = Math.max(
      0,
      Math.min(1, (touch.clientY - rect.top) / rect.height)
    );
    setTextSaturation(x * 100);
    setTextBrightness(100 - y * 100);
  };

  const handleTextSaturationEnd = () => {
    document.removeEventListener("mousemove", handleTextSaturationMove);
    document.removeEventListener("mouseup", handleTextSaturationEnd);
    document.removeEventListener("touchmove", handleTextSaturationTouchMove);
    document.removeEventListener("touchend", handleTextSaturationEnd);
  };

  // Event handlers for text color hue slider
  const handleTextHueMove = (e: MouseEvent) => {
    if (!textHueSliderRef.current) return;

    const rect = textHueSliderRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    setTextHue(x * 360);
  };

  const handleTextHueTouchMove = (e: TouchEvent) => {
    e.preventDefault();
    if (!textHueSliderRef.current) return;

    const rect = textHueSliderRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const x = Math.max(
      0,
      Math.min(1, (touch.clientX - rect.left) / rect.width)
    );
    setTextHue(x * 360);
  };

  const handleTextHueEnd = () => {
    document.removeEventListener("mousemove", handleTextHueMove);
    document.removeEventListener("mouseup", handleTextHueEnd);
    document.removeEventListener("touchmove", handleTextHueTouchMove);
    document.removeEventListener("touchend", handleTextHueEnd);
  };

  // Event handlers for text color alpha slider
  const handleTextAlphaMove = (e: MouseEvent) => {
    if (!textAlphaSliderRef.current) return;

    const rect = textAlphaSliderRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    setTextAlpha(x * 100);
  };

  const handleTextAlphaTouchMove = (e: TouchEvent) => {
    e.preventDefault();
    if (!textAlphaSliderRef.current) return;

    const rect = textAlphaSliderRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const x = Math.max(
      0,
      Math.min(1, (touch.clientX - rect.left) / rect.width)
    );
    setTextAlpha(x * 100);
  };

  const handleTextAlphaEnd = () => {
    document.removeEventListener("mousemove", handleTextAlphaMove);
    document.removeEventListener("mouseup", handleTextAlphaEnd);
    document.removeEventListener("touchmove", handleTextAlphaTouchMove);
    document.removeEventListener("touchend", handleTextAlphaEnd);
  };

  // Event handlers for background color saturation box
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

  // Render color picker for text color
  const renderTextColorPicker = () => {
    return (
      <div
        className={cn(
          "p-3 rounded-2xl shadow-lg border w-[300px] transition-all duration-200",
          isDarkMode
            ? "bg-[#1C1C1E] border-[#3A3A3C] text-white"
            : "bg-white border-gray-200 text-gray-900"
        )}
      >
        {/* Saturation/Value box */}
        <div
          ref={textSaturationBoxRef}
          className='w-full h-[180px] rounded-xl mb-3 relative cursor-crosshair touch-none'
          style={{ backgroundColor: `hsl(${textHue}, 100%, 50%)` }}
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
            setTextSaturation(x * 100);
            setTextBrightness(100 - y * 100);
            document.addEventListener("mousemove", handleTextSaturationMove);
            document.addEventListener("mouseup", handleTextSaturationEnd);
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
            setTextSaturation(x * 100);
            setTextBrightness(100 - y * 100);
            document.addEventListener(
              "touchmove",
              handleTextSaturationTouchMove
            );
            document.addEventListener("touchend", handleTextSaturationEnd);
          }}
        >
          <div className='absolute inset-0 bg-gradient-to-r from-white to-transparent rounded-xl'></div>
          <div className='absolute inset-0 bg-gradient-to-b from-transparent to-black rounded-xl'></div>
          <div
            className='absolute w-5 h-5 rounded-full border-2 border-white shadow-md transform -translate-x-1/2 -translate-y-1/2'
            style={{
              left: `${textSaturation}%`,
              top: `${100 - textBrightness}%`,
            }}
          ></div>
        </div>

        {/* Hue slider */}
        <div
          ref={textHueSliderRef}
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
            setTextHue(x * 360);
            document.addEventListener("mousemove", handleTextHueMove);
            document.addEventListener("mouseup", handleTextHueEnd);
          }}
          onTouchStart={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const touch = e.touches[0];
            const x = Math.max(
              0,
              Math.min(1, (touch.clientX - rect.left) / rect.width)
            );
            setTextHue(x * 360);
            document.addEventListener("touchmove", handleTextHueTouchMove);
            document.addEventListener("touchend", handleTextHueEnd);
          }}
        >
          <div
            className='absolute w-4 h-4 rounded-full border-2 border-white shadow-md transform -translate-x-1/2 -translate-y-1/2 top-1/2'
            style={{ left: `${(textHue / 360) * 100}%` }}
          ></div>
        </div>

        {/* Alpha slider */}
        <div
          ref={textAlphaSliderRef}
          className='w-full h-4 rounded-full mb-4 relative cursor-pointer touch-none bg-checkered'
          onMouseDown={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = Math.max(
              0,
              Math.min(1, (e.clientX - rect.left) / rect.width)
            );
            setTextAlpha(x * 100);
            document.addEventListener("mousemove", handleTextAlphaMove);
            document.addEventListener("mouseup", handleTextAlphaEnd);
          }}
          onTouchStart={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const touch = e.touches[0];
            const x = Math.max(
              0,
              Math.min(1, (touch.clientX - rect.left) / rect.width)
            );
            setTextAlpha(x * 100);
            document.addEventListener("touchmove", handleTextAlphaTouchMove);
            document.addEventListener("touchend", handleTextAlphaEnd);
          }}
        >
          <div
            className='absolute inset-0 rounded-full'
            style={{
              background: `linear-gradient(to right, transparent, hsl(${textHue}, 100%, 50%))`,
            }}
          ></div>
          <div
            className='absolute w-4 h-4 rounded-full border-2 border-white shadow-md transform -translate-x-1/2 -translate-y-1/2 top-1/2'
            style={{ left: `${textAlpha}%` }}
          ></div>
        </div>

        {/* Color preview and hex input */}
        <div className='flex items-center gap-3 mb-4'>
          <div className='w-8 h-8 rounded-lg shadow-sm border border-gray-600 bg-checkered flex-shrink-0'>
            <div
              className='w-full h-full rounded-lg'
              style={{
                backgroundColor: `rgba(${textRgbValues.r}, ${
                  textRgbValues.g
                }, ${textRgbValues.b}, ${textAlpha / 100})`,
              }}
            ></div>
          </div>

          <div className='flex-1'>
            <div className='flex items-center'>
              <span className='text-xs mr-1'>#</span>
              <input
                type='text'
                value={textHexValue}
                onChange={(e) => {
                  const value = e.target.value
                    .replace(/[^0-9A-Fa-f]/g, "")
                    .substring(0, 6);
                  setTextHexValue(value);
                  if (value.length === 6) {
                    try {
                      const r = Number.parseInt(value.substring(0, 2), 16);
                      const g = Number.parseInt(value.substring(2, 4), 16);
                      const b = Number.parseInt(value.substring(4, 6), 16);
                      setTextRgbValues({ r, g, b });
                      const hsv = rgbToHsv(r, g, b);
                      setTextHue(hsv.h);
                      setTextSaturation(hsv.s);
                      setTextBrightness(hsv.v);
                    } catch (error) {
                      console.error("Invalid hex color", error);
                    }
                  }
                }}
                className={cn(
                  "w-full text-sm py-1.5 px-2 rounded-md focus:outline-none transition-all",
                  isDarkMode
                    ? "bg-[#2C2C2E] text-white"
                    : "bg-gray-50 text-gray-700"
                )}
              />
            </div>
          </div>
        </div>

        {/* Recent Colors */}
        <div>
          <label className='block text-xs mb-2 opacity-70'>Recent Colors</label>
          <div className='flex flex-wrap gap-2'>
            {[
              "#000000",
              "#FF3B30",
              "#FF9500",
              "#FFCC00",
              "#34C759",
              "#007AFF",
              "#5856D6",
            ].map((color) => (
              <button
                key={color}
                className='w-7 h-7 rounded-full border border-gray-600 shadow-sm transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white'
                style={{ backgroundColor: color }}
                onClick={() => {
                  const { h, s, v, r, g, b } = hexToHsv(color);
                  setTextHue(h);
                  setTextSaturation(s);
                  setTextBrightness(v);
                  setTextRgbValues({ r, g, b });
                  setTextHexValue(color.replace("#", ""));
                  setTextAlpha(100);
                }}
                aria-label={`Select color ${color}`}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Render color picker for background color
  const renderBgColorPicker = () => {
    return (
      <div
        className={cn(
          "p-3 rounded-2xl shadow-lg border w-[300px] transition-all duration-200",
          isDarkMode
            ? "bg-[#1C1C1E] border-[#3A3A3C] text-white"
            : "bg-white border-gray-200 text-gray-900"
        )}
      >
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
            document.addEventListener("touchmove", handleBgSaturationTouchMove);
            document.addEventListener("touchend", handleBgSaturationEnd);
          }}
        >
          <div className='absolute inset-0 bg-gradient-to-r from-white to-transparent rounded-xl'></div>
          <div className='absolute inset-0 bg-gradient-to-b from-transparent to-black rounded-xl'></div>
          <div
            className='absolute w-5 h-5 rounded-full border-2 border-white shadow-md transform -translate-x-1/2 -translate-y-1/2'
            style={{ left: `${bgSaturation}%`, top: `${100 - bgBrightness}%` }}
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
            className='absolute w-4 h-4 rounded-full border-2 border-white shadow-md transform -translate-x-1/2 -translate-y-1/2 top-1/2'
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
              background: `linear-gradient(to right, transparent, hsl(${bgHue}, 100%, 50%))`,
            }}
          ></div>
          <div
            className='absolute w-4 h-4 rounded-full border-2 border-white shadow-md transform -translate-x-1/2 -translate-y-1/2 top-1/2'
            style={{ left: `${bgAlpha}%` }}
          ></div>
        </div>

        {/* Color preview and hex input */}
        <div className='flex items-center gap-3 mb-4'>
          <div className='w-8 h-8 rounded-lg shadow-sm border border-gray-600 bg-checkered flex-shrink-0'>
            <div
              className='w-full h-full rounded-lg'
              style={{
                backgroundColor: `rgba(${bgRgbValues.r}, ${bgRgbValues.g}, ${
                  bgRgbValues.b
                }, ${bgAlpha / 100})`,
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
                    .substring(0, 6);
                  setBgHexValue(value);
                  if (value.length === 6) {
                    try {
                      const r = Number.parseInt(value.substring(0, 2), 16);
                      const g = Number.parseInt(value.substring(2, 4), 16);
                      const b = Number.parseInt(value.substring(4, 6), 16);
                      setBgRgbValues({ r, g, b });
                      const hsv = rgbToHsv(r, g, b);
                      setBgHue(hsv.h);
                      setBgSaturation(hsv.s);
                      setBgBrightness(hsv.v);
                    } catch (error) {
                      console.error("Invalid hex color", error);
                    }
                  }
                }}
                className={cn(
                  "w-full text-sm py-1.5 px-2 rounded-md focus:outline-none transition-all",
                  isDarkMode
                    ? "bg-[#2C2C2E] text-white"
                    : "bg-gray-50 text-gray-700"
                )}
              />
            </div>
          </div>
        </div>

        {/* Transparency option */}
        <div className='flex items-center mb-4'>
          <button
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-md border transition-all duration-200 w-full cursor-pointer",
              isDarkMode
                ? "bg-[#3A3A3C] border-[#4A4A4C] text-white hover:bg-[#4A4A4C]"
                : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100",
              bgAlpha === 0 &&
                (isDarkMode
                  ? "bg-[#4A4A4C] border-[#5A5A5C]"
                  : "bg-gray-100 border-gray-300")
            )}
            onClick={() => setBgAlpha(bgAlpha === 0 ? 100 : 0)}
          >
            <div className='w-4 h-4 rounded-sm border border-gray-400 bg-checkered relative'>
              <div className='w-full h-full rounded-sm'></div>
              {bgAlpha === 0 && (
                <div className='absolute inset-0 flex items-center justify-center'>
                  <div className='w-2.5 h-2.5 bg-blue-500 rounded-sm'></div>
                </div>
              )}
            </div>
            <span className='text-sm'>Transparent background</span>
          </button>
        </div>

        {/* Recent Colors */}
        <div>
          <label className='block text-xs mb-2 opacity-70'>Recent Colors</label>
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
                className='w-7 h-7 rounded-full border border-gray-600 shadow-sm transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white'
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
    );
  };

  return (
    <div
      ref={popupRef}
      className={cn(
        "fixed z-40 rounded-xl shadow-lg transition-all duration-200",
        isDarkMode
          ? "bg-[#2C2C2E] border border-[#3A3A3C]"
          : "bg-white border border-gray-200",
        isToolbarBottom && "-mt-6",
        isToolbarLeft && "ml-[100px]"
      )}
      style={{
        top: `${isToolbarLeft ? "50%" : position.top + "px"}`,
        transform: `${
          isToolbarLeft ? "translate(0,-50%)" : "translateX(-50%)"
        }`,
        left: `${isToolbarLeft ? "0" : "50%"}`,
        minWidth: `${isToolbarLeft ? "66px" : "600px"}`,
        maxWidth: `${isToolbarLeft ? "" : "calc(100% - 32px)"}`,
      }}
    >
      <div className='p-3'>
        <div
          className={cn(
            "flex items-center gap-4 ",
            isToolbarLeft && "flex-col items-start"
          )}
        >
          {/* Font Selector */}
          <div className='relative' ref={fontDropdownRef}>
            <button
              onClick={() => setIsFontDropdownOpen(!isFontDropdownOpen)}
              className={cn(
                "flex items-center justify-between gap-2 px-3 py-1.5 rounded-md cursor-pointer border transition-all duration-200 w-[155px]",
                isDarkMode
                  ? "bg-[#3A3A3C] border-[#4A4A4C] text-white hover:bg-[#4A4A4C] hover:border-[#555] hover:text-[#F5F5F5]"
                  : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100",
                isToolbarLeft && "w-[120px]"
              )}
            >
              <span
                className='text-sm truncate'
                style={{ fontFamily: selectedFont }}
              >
                {selectedFont}
              </span>
              <ChevronDown className='h-3.5 w-3.5 opacity-70 flex-shrink-0' />
            </button>

            {isFontDropdownOpen && (
              <div
                className={cn(
                  "absolute top-full left-0 mt-1 w-[155px] rounded-md  shadow-lg z-50 py-1 max-h-60 overflow-y-auto scrollbar-none",
                  isDarkMode
                    ? "bg-[#3A3A3C] border border-[#4A4A4C]"
                    : "bg-white border border-gray-200"
                )}
                style={{
                  scrollbarWidth: "none" /* Firefox */,
                  msOverflowStyle: "none" /* IE and Edge */,
                }}
              >
                {fonts.map((font) => (
                  <div
                    key={font}
                    onClick={() => {
                      setSelectedFont(font);
                      setIsFontDropdownOpen(false);
                    }}
                    className={cn(
                      "px-3 py-2 cursor-pointer transition-all duration-200",
                      isDarkMode
                        ? "hover:bg-[#4A4A4C] hover:text-[#F5F5F5]"
                        : "hover:bg-gray-100",
                      selectedFont === font &&
                        (isDarkMode ? "bg-[#4A4A4C]" : "bg-gray-100")
                    )}
                    style={{ fontFamily: font }}
                  >
                    <span className='text-sm'>{font}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Font Size Controller */}
          <div className='flex items-center'>
            <Button
              onClick={decreaseFontSize}
              className={cn(
                "h-8 w-8 rounded-l-md rounded-r-none border-r-0 transition-colors duration-200",
                isDarkMode
                  ? "bg-[#3A3A3C] border-[#4A4A4C] text-white hover:bg-[#4A4A4C] hover:border-[#555] hover:text-[#F5F5F5]"
                  : "bg-gray-50 border-gray-200 text-gray-700"
              )}
            >
              <Minus className='h-3 w-3' />
              <span className='sr-only'>Decrease font size</span>
            </Button>
            <div className='relative'>
              <input
                type='text'
                value={fontSize}
                onChange={handleFontSizeChange}
                onClick={() =>
                  setIsFontSizeDropdownOpen(!isFontSizeDropdownOpen)
                }
                className={cn(
                  "h-8 w-12 text-center border-x focus:outline-none focus:ring-0 cursor-pointer",
                  isDarkMode
                    ? "bg-[#3A3A3C] border-[#4A4A4C] text-white"
                    : "bg-gray-50 border-gray-200 text-gray-700"
                )}
              />

              {isFontSizeDropdownOpen && (
                <div
                  ref={fontSizeDropdownRef}
                  className={cn(
                    "absolute top-full mt-1 w-24 rounded-md shadow-lg z-50 py-1 max-h-60 overflow-y-auto scrollbar-none",
                    isDarkMode
                      ? "bg-[#3A3A3C] border border-[#4A4A4C]"
                      : "bg-white border border-gray-200"
                  )}
                  style={{
                    scrollbarWidth: "none" /* Firefox */,
                    msOverflowStyle: "none" /* IE and Edge */,
                    left: "50%",
                    transform: "translateX(-50%)",
                  }}
                >
                  {[
                    8, 9, 10, 11, 12, 14, 16, 18, 20, 24, 28, 32, 36, 40, 48,
                    56, 64, 72,
                  ].map((size) => (
                    <div
                      key={size}
                      onClick={() => {
                        setFontSize(size);
                        setIsFontSizeDropdownOpen(false);
                      }}
                      className={cn(
                        "px-3 py-1 cursor-pointer transition-all duration-200 text-center",
                        isDarkMode
                          ? "hover:bg-[#4A4A4C] hover:text-[#F5F5F5]"
                          : "hover:bg-gray-100",
                        fontSize === size &&
                          (isDarkMode ? "bg-[#4A4A4C]" : "bg-gray-100")
                      )}
                    >
                      <span className='text-sm'>{size}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <Button
              onClick={increaseFontSize}
              className={cn(
                "h-8 w-8 rounded-r-md rounded-l-none border-l-0",
                isDarkMode
                  ? "bg-[#3A3A3C] border-[#4A4A4C] text-white hover:bg-[#4A4A4C] hover:border-[#555] hover:text-[#F5F5F5]"
                  : "bg-gray-50 border-gray-200 text-gray-700"
              )}
            >
              <Plus className='h-3 w-3' />
              <span className='sr-only'>Increase font size</span>
            </Button>
          </div>

          {/* Text Color Picker */}
          <div className='relative'>
            <button
              ref={textColorButtonRef}
              onClick={() => setIsTextColorPickerOpen(!isTextColorPickerOpen)}
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 cursor-pointer rounded-md border transition-all duration-200",
                isDarkMode
                  ? "bg-[#3A3A3C] border-[#4A4A4C] text-white hover:bg-[#4A4A4C] hover:border-[#555] hover:text-[#F5F5F5]"
                  : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
              )}
            >
              <div className='w-4 h-4 rounded-sm border border-gray-400 bg-checkered'>
                <div
                  className='w-full h-full rounded-sm'
                  style={{ backgroundColor: textColor }}
                ></div>
              </div>
              <ChevronDown className='h-3.5 w-3.5 opacity-70' />
            </button>

            {isTextColorPickerOpen && (
              <div
                ref={textColorPickerRef}
                className='absolute top-full left-0 mt-2 z-50'
              >
                {renderTextColorPicker()}
              </div>
            )}
          </div>

          {/* Text Style Buttons */}
          <div
            className={cn(
              "flex items-center border rounded-md overflow-hidden",
              isDarkMode ? "border-[#3A3A3C]" : "border-gray-200"
            )}
          >
            <Button
              onClick={() => setIsBold(!isBold)}
              className={cn(
                "h-8 px-3 rounded-none border-r transition-colors duration-200",
                isDarkMode
                  ? "border-[#4A4A4C] hover:bg-[#4A4A4C] hover:text-[#F5F5F5]"
                  : "border-gray-200 hover:bg-gray-100",
                isBold && (isDarkMode ? "bg-[#4A4A4C]" : "bg-gray-200")
              )}
            >
              <Bold className='h-4 w-4' />
              <span className='sr-only'>Bold</span>
            </Button>
            <Button
              onClick={() => setIsItalic(!isItalic)}
              className={cn(
                "h-8 px-3 rounded-none border-r transition-colors duration-200",
                isDarkMode
                  ? "border-[#4A4A4C] hover:bg-[#4A4A4C] hover:text-[#F5F5F5]"
                  : "border-gray-200 hover:bg-gray-100",
                isItalic && (isDarkMode ? "bg-[#4A4A4C]" : "bg-gray-200")
              )}
            >
              <Italic className='h-4 w-4' />
              <span className='sr-only'>Italic</span>
            </Button>
            <Button
              onClick={() => setIsUnderline(!isUnderline)}
              className={cn(
                "h-8 px-3 rounded-none border-r transition-colors duration-200",
                isDarkMode
                  ? "border-[#4A4A4C] hover:bg-[#4A4A4C] hover:text-[#F5F5F5]"
                  : "border-gray-200 hover:bg-gray-100",
                isUnderline && (isDarkMode ? "bg-[#4A4A4C]" : "bg-gray-200")
              )}
            >
              <Underline className='h-4 w-4' />
              <span className='sr-only'>Underline</span>
            </Button>
            <Button
              onClick={() => setIsStrikethrough(!isStrikethrough)}
              className={cn(
                "h-8 px-3 rounded-none transition-colors duration-200",
                isDarkMode
                  ? "hover:bg-[#4A4A4C] hover:text-[#F5F5F5]"
                  : "hover:bg-gray-100",
                isStrikethrough && (isDarkMode ? "bg-[#4A4A4C]" : "bg-gray-200")
              )}
            >
              <StrikethroughIcon className='h-4 w-4' />
              <span className='sr-only'>Strikethrough</span>
            </Button>
          </div>

          {/* Text Alignment Options */}
          <div
            className={cn(
              "flex items-center border rounded-md overflow-hidden",
              isDarkMode ? "border-[#3A3A3C]" : "border-gray-200"
            )}
          >
            <Button
              onClick={() => setTextAlignment("left")}
              className={cn(
                "h-8 px-3 rounded-none border-r",
                isDarkMode
                  ? "border-[#4A4A4C] hover:bg-[#4B4B4D]"
                  : "border-gray-200 hover:bg-gray-100",
                textAlignment === "left" &&
                  (isDarkMode ? "bg-[#4A4A4C]" : "bg-gray-200")
              )}
            >
              <AlignLeft className='h-4 w-4' />
              <span className='sr-only'>Align Left</span>
            </Button>
            <Button
              onClick={() => setTextAlignment("center")}
              className={cn(
                "h-8 px-3 rounded-none border-r",
                isDarkMode
                  ? "border-[#4A4A4C] hover:bg-[#4B4B4D]"
                  : "border-gray-200 hover:bg-gray-100",
                textAlignment === "center" &&
                  (isDarkMode ? "bg-[#4A4A4C]" : "bg-gray-200")
              )}
            >
              <AlignCenter className='h-4 w-4' />
              <span className='sr-only'>Align Center</span>
            </Button>
            <Button
              onClick={() => setTextAlignment("right")}
              className={cn(
                "h-8 px-3 rounded-none",
                isDarkMode ? "hover:bg-[#4B4B4D]" : "hover:bg-gray-100",
                textAlignment === "right" &&
                  (isDarkMode ? "bg-[#4A4A4C]" : "bg-gray-200")
              )}
            >
              <AlignRight className='h-4 w-4' />
              <span className='sr-only'>Align Right</span>
            </Button>
          </div>

          {/* Background Fill Color */}
          <div className='relative'>
            <button
              ref={bgColorButtonRef}
              onClick={() =>
                setIsBackgroundColorPickerOpen(!isBackgroundColorPickerOpen)
              }
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 min-w-[152.17px] max-w-[153px] justify-between rounded-md border cursor-pointer transition-all duration-200",
                isDarkMode
                  ? "bg-[#3A3A3C] border-[#4A4A4C] text-white hover:bg-[#4A4A4C] hover:border-[#555] hover:text-[#F5F5F5]"
                  : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
              )}
            >
              <div className='flex items-center gap-2'>
                <div className='w-5 h-5 rounded-sm border border-gray-400 bg-checkered flex-shrink-0'>
                  <div
                    className='w-full h-full rounded-sm'
                    style={{ backgroundColor: backgroundColor }}
                  ></div>
                </div>
                <span className='text-sm'>
                  {backgroundColor === "transparent"
                    ? "Transparent"
                    : backgroundColor.startsWith("rgba")
                    ? "RGBA Color"
                    : backgroundColor.length > 7
                    ? backgroundColor.substring(0, 7) + "..."
                    : backgroundColor}
                </span>
              </div>
              <ChevronDown className='h-3.5 w-3.5 opacity-70' />
            </button>

            {isBackgroundColorPickerOpen && (
              <div
                ref={bgColorPickerRef}
                className='absolute top-full right-0 mt-2 z-50'
              >
                {renderBgColorPicker()}
              </div>
            )}
          </div>

          {/* Close Button */}
          <Button
            className={cn(
              "h-8 w-8 rounded-full ml-auto transition-colors duration-200 justify-center ",
              isDarkMode
                ? "hover:bg-[#4A4A4C] hover:text-[#F5F5F5]"
                : "hover:bg-gray-100",
              isToolbarLeft && "absolute top-0 right-0.5"
            )}
            onClick={onClose}
          >
            <X className='h-4 w-4 flex-shrink-0' />
            <span className='sr-only'>Close</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
