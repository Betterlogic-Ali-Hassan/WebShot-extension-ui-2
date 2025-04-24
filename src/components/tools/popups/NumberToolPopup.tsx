"use client";

import { useState, useRef, useEffect } from "react";
import { X, ChevronDown } from "lucide-react";
import Button from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NumberToolPopupProps {
  position: { top: number; left: number; width: number };
  isDarkMode: boolean;
  onClose: () => void;
  toolbarPosition: "top" | "left" | "bottom";
}

export function NumberToolPopup({
  position,
  isDarkMode,
  onClose,
  toolbarPosition,
}: NumberToolPopupProps) {
  // State for number style and color
  const [selectedStyle, setSelectedStyle] = useState<
    "circled" | "squared" | "plain"
  >("circled");
  const [selectedColor, setSelectedColor] = useState("#007AFF");
  const [currentNumber, setCurrentNumber] = useState(1);
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [isStrokeDropdownOpen, setIsStrokeDropdownOpen] = useState(false);
  const strokeDropdownRef = useRef<HTMLDivElement>(null);

  // Refs for positioning
  const popupRef = useRef<HTMLDivElement>(null);
  const colorButtonRef = useRef<HTMLButtonElement>(null);
  const colorPickerRef = useRef<HTMLDivElement>(null);

  // Add these state variables after the existing state declarations
  const [hue, setHue] = useState(0);
  const [saturation, setSaturation] = useState(100);
  const [brightness, setBrightness] = useState(100);
  //   const [alpha, setAlpha] = useState(100);
  const [hexValue, setHexValue] = useState(selectedColor.replace("#", ""));
  const [rgbValues, setRgbValues] = useState({ r: 0, g: 122, b: 255 }); // Default blue color
  const isToolbarLeft = toolbarPosition === "left";
  const isToolbarBottom = toolbarPosition === "bottom";
  // Add these refs for the color picker
  const saturationBoxRef = useRef<HTMLDivElement>(null);
  const hueSliderRef = useRef<HTMLDivElement>(null);
  //   const alphaSliderRef = useRef<HTMLDivElement>(null);
  const isInternalColorChange = useRef(false);

  // Color options
  const colorOptions = [
    "#007AFF", // Blue
    "#FF3B30", // Red
    "#34C759", // Green
    "#FF9500", // Orange
    "#5856D6", // Purple
    "#000000", // Black
  ];

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

  // Close color picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        colorPickerRef.current &&
        !colorPickerRef.current.contains(event.target as Node) &&
        colorButtonRef.current &&
        !colorButtonRef.current.contains(event.target as Node)
      ) {
        setIsColorPickerOpen(false);
      }

      // Close stroke dropdown when clicking outside
      if (
        strokeDropdownRef.current &&
        !strokeDropdownRef.current.contains(event.target as Node)
      ) {
        setIsStrokeDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Initialize color values from selectedColor when it changes externally
  useEffect(() => {
    if (isInternalColorChange.current) {
      isInternalColorChange.current = false;
      return;
    }

    if (selectedColor) {
      const { h, s, v, r, g, b } = hexToHsv(selectedColor);
      setHue(h);
      setSaturation(s);
      setBrightness(v);
      setRgbValues({ r, g, b });
      setHexValue(selectedColor.replace("#", ""));
    }
  }, [selectedColor]);

  // Update RGB values when HSV values change
  useEffect(() => {
    const rgb = hsvToRgb(hue, saturation, brightness);
    setRgbValues(rgb);
    const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
    setHexValue(hex.replace("#", ""));
  }, [hue, saturation, brightness]);

  // Update selectedColor when RGB or alpha values change
  useEffect(() => {
    isInternalColorChange.current = true;
    const hex = rgbToHex(rgbValues.r, rgbValues.g, rgbValues.b);
    setSelectedColor(hex);
  }, [rgbValues]);

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

  // Modify the renderNumberPreview function to add a visible border to the circled and squared styles
  function renderNumberPreview(
    number: number,
    style: "circled" | "squared" | "plain",
    useStandardColor = false
  ) {
    // Use neutral colors for style selection buttons instead of blue
    // For dark mode, use a darker gray instead of white for text
    const bgColor = useStandardColor
      ? isDarkMode
        ? "#3A3A3C"
        : "#E5E5EA" // Neutral gray in both modes
      : selectedColor;

    const textColor = useStandardColor
      ? isDarkMode
        ? "#CCCCCC"
        : "#333333" // Avoid white in dark mode
      : "#FFFFFF";

    // Add border color that's visible in both light and dark modes
    const borderColor = useStandardColor
      ? isDarkMode
        ? "#5A5A5C" // Slightly lighter than background in dark mode
        : "#AEAEB2" // Slightly darker than background in light mode
      : selectedColor;

    if (style === "circled") {
      return (
        <div
          className='w-7 h-7 rounded-full flex items-center justify-center text-sm font-medium'
          style={{
            backgroundColor: bgColor,
            color: textColor,
            // Add a visible border that's different from the background
            border: useStandardColor
              ? `1px solid ${borderColor}`
              : `${strokeWidth}px solid ${bgColor}`,
          }}
        >
          {number}
        </div>
      );
    } else if (style === "squared") {
      return (
        <div
          className='w-7 h-7 rounded-sm flex items-center justify-center text-sm font-medium'
          style={{
            backgroundColor: bgColor,
            color: textColor,
            // Add a visible border that's different from the background
            border: useStandardColor
              ? `1px solid ${borderColor}`
              : `${strokeWidth}px solid ${bgColor}`,
          }}
        >
          {number}
        </div>
      );
    } else {
      // Plain style - use a darker color for text in dark mode
      return (
        <div
          className='w-7 h-7 flex items-center justify-center text-lg font-bold'
          style={{
            color: useStandardColor
              ? isDarkMode
                ? "#CCCCCC"
                : "#333333"
              : bgColor,
          }}
        >
          {number}
        </div>
      );
    }
  }

  // Handle style selection
  const handleStyleSelect = (style: "circled" | "squared" | "plain") => {
    setSelectedStyle(style);
  };

  const handleIncrementNumber = () => {
    setCurrentNumber((prev) => prev + 1);
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

  // Replace the return statement's outer div with this updated version to fix overflow and z-index
  return (
    <div
      ref={popupRef}
      className={cn(
        "fixed z-40 rounded-xl shadow-lg transition-all duration-200 bg-[#2C2C2E] border border-[#3A3A3C]",
        isDarkMode ? "bg-[#2C2C2E] text-white" : "bg-white text-black",
        isToolbarBottom && "-mt-4",
        isToolbarLeft && "ml-[100px]"
      )}
      style={{
        top: `${isToolbarLeft ? "50%" : position.top + "px"}`,
        transform: `${
          isToolbarLeft ? "translate(0,-50%)" : "translateX(-50%)"
        }`,
        left: `${isToolbarLeft ? "0" : "50%"}`,
        minWidth: `${isToolbarLeft ? "66px" : "480px"}`,
        maxWidth: `${isToolbarLeft ? "" : "calc(100% - 32px)"}`,
      }}
    >
      <div className='p-3'>
        <div
          className={cn(
            "flex items-center gap-4",
            isToolbarLeft && "flex-col-reverse items-start"
          )}
        >
          {/* Style section */}
          <div className='flex items-center gap-3 px-1'>
            <span
              className={cn(
                "text-sm font-medium whitespace-nowrap",
                isDarkMode ? "text-gray-300" : "text-gray-700"
              )}
            >
              Style:
            </span>

            <div className='flex items-center gap-2'>
              <button
                onClick={() => handleStyleSelect("circled")}
                className={cn(
                  "p-1.5 rounded-md transition-all duration-200 relative",
                  selectedStyle === "circled"
                    ? isDarkMode
                      ? "bg-[#3A3A3C] ring-1 ring-[#5A5A5C] shadow-inner"
                      : "bg-gray-100 ring-1 ring-gray-300 shadow-inner"
                    : isDarkMode
                    ? "hover:bg-[#2A2A2C] hover:shadow"
                    : "hover:bg-gray-50 hover:shadow",
                  "after:absolute after:inset-0 after:rounded-md after:opacity-0 hover:after:opacity-10 after:bg-white after:transition-opacity"
                )}
              >
                {renderNumberPreview(1, "circled", selectedStyle !== "circled")}
              </button>
              <button
                onClick={() => handleStyleSelect("squared")}
                className={cn(
                  "p-1.5 rounded-md transition-all duration-200 relative",
                  selectedStyle === "squared"
                    ? isDarkMode
                      ? "bg-[#3A3A3C] ring-1 ring-[#5A5A5C] shadow-inner"
                      : "bg-gray-100 ring-1 ring-gray-300 shadow-inner"
                    : isDarkMode
                    ? "hover:bg-[#2A2A2C] hover:shadow"
                    : "hover:bg-gray-50 hover:shadow",
                  "after:absolute after:inset-0 after:rounded-md after:opacity-0 hover:after:opacity-10 after:bg-white after:transition-opacity"
                )}
              >
                {renderNumberPreview(1, "squared", selectedStyle !== "squared")}
              </button>
              <button
                onClick={() => handleStyleSelect("plain")}
                className={cn(
                  "p-1.5 rounded-md transition-all duration-200 relative",
                  selectedStyle === "plain"
                    ? isDarkMode
                      ? "bg-[#3A3A3C] ring-1 ring-[#5A5A5C] shadow-inner"
                      : "bg-gray-100 ring-1 ring-gray-300 shadow-inner"
                    : isDarkMode
                    ? "hover:bg-[#2A2A2C] hover:shadow"
                    : "hover:bg-gray-50 hover:shadow",
                  "after:absolute after:inset-0 after:rounded-md after:opacity-0 hover:after:opacity-10 after:bg-white after:transition-opacity"
                )}
              >
                {renderNumberPreview(1, "plain", selectedStyle !== "plain")}
              </button>
            </div>
          </div>

          {/* Subtle divider */}
          <div
            className={cn(
              "h-10 w-px bg-gray-300 dark:bg-gray-700",
              isToolbarLeft && "w-full h-[1px]"
            )}
          ></div>

          {/* Color picker */}
          <div className='relative'>
            <div className='flex items-center gap-3 px-1'>
              <span
                className={cn(
                  "text-sm font-medium whitespace-nowrap",
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                )}
              >
                Color:
              </span>
              <div className='relative'>
                <button
                  ref={colorButtonRef}
                  onClick={() => setIsColorPickerOpen(!isColorPickerOpen)}
                  className='w-7 h-7 rounded-md flex items-center justify-center border border-gray-300 shadow-sm relative transition-colors duration-200 hover:border-[#555]'
                  style={{ backgroundColor: selectedColor }}
                  aria-label='Select color'
                >
                  <ChevronDown className='h-3 w-3 absolute right-0 bottom-0 text-white bg-black bg-opacity-30 rounded-full p-0.5' />
                </button>

                {isColorPickerOpen && (
                  <div
                    ref={colorPickerRef}
                    className='absolute top-full -left-3 mt-2   z-50'
                  >
                    <div
                      className={cn(
                        "p-3 rounded-lg shadow-lg border w-[300px] transition-all duration-200",
                        isDarkMode
                          ? "bg-[#1C1C1E] border-[#3A3A3C] text-white"
                          : "bg-white border-gray-200 text-gray-900"
                      )}
                    >
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
                          document.addEventListener(
                            "mousemove",
                            handleSaturationMove
                          );
                          document.addEventListener(
                            "mouseup",
                            handleSaturationEnd
                          );
                        }}
                        onTouchStart={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          const touch = e.touches[0];
                          const x = Math.max(
                            0,
                            Math.min(
                              1,
                              (touch.clientX - rect.left) / rect.width
                            )
                          );
                          const y = Math.max(
                            0,
                            Math.min(
                              1,
                              (touch.clientY - rect.top) / rect.height
                            )
                          );
                          setSaturation(x * 100);
                          setBrightness(100 - y * 100);
                          document.addEventListener(
                            "touchmove",
                            handleSaturationTouchMove
                          );
                          document.addEventListener(
                            "touchend",
                            handleSaturationEnd
                          );
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
                            Math.min(
                              1,
                              (touch.clientX - rect.left) / rect.width
                            )
                          );
                          setHue(x * 360);
                          document.addEventListener(
                            "touchmove",
                            handleHueTouchMove
                          );
                          document.addEventListener("touchend", handleHueEnd);
                        }}
                      >
                        <div
                          className='absolute w-4 h-4 rounded-full border-2 border-white shadow-md transform -translate-x-1/2 -translate-y-1/2 top-1/2'
                          style={{ left: `${(hue / 360) * 100}%` }}
                        ></div>
                      </div>

                      {/* Color preview and hex input */}
                      <div className='flex items-center gap-3 mb-4'>
                        <div className='w-8 h-8 rounded-lg shadow-sm border border-gray-600 bg-checkered flex-shrink-0'>
                          <div
                            className='w-full h-full rounded-lg'
                            style={{
                              backgroundColor: selectedColor,
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
                                    const r = Number.parseInt(
                                      value.substring(0, 2),
                                      16
                                    );
                                    const g = Number.parseInt(
                                      value.substring(2, 4),
                                      16
                                    );
                                    const b = Number.parseInt(
                                      value.substring(4, 6),
                                      16
                                    );
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
                        <label className='block text-xs mb-2 opacity-70'>
                          Recent Colors
                        </label>
                        <div className='flex flex-wrap gap-2'>
                          {colorOptions.map((color) => (
                            <button
                              key={color}
                              className='w-7 h-7 rounded-full border border-gray-600 shadow-sm transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white'
                              style={{ backgroundColor: color }}
                              onClick={() => {
                                const { h, s, v, r, g, b } = hexToHsv(color);
                                setHue(h);
                                setSaturation(s);
                                setBrightness(v);
                                setRgbValues({ r, g, b });
                                setHexValue(color.replace("#", ""));
                                setSelectedColor(color);
                                setIsColorPickerOpen(false);
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
            </div>
          </div>

          {/* Subtle divider */}
          <div
            className={cn(
              "h-10 w-px bg-gray-300 dark:bg-gray-700",
              isToolbarLeft && "w-full h-[1px]",
              selectedStyle === "plain" && "hidden"
            )}
          ></div>

          {/* Size controls - only show for non-plain styles */}
          {selectedStyle !== "plain" && (
            <div
              className={cn(
                "flex items-center gap-3 px-1",
                isToolbarLeft && "flex-col items-start w-full"
              )}
            >
              <span
                className={cn(
                  "text-sm font-medium whitespace-nowrap",
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                )}
              >
                Size:
              </span>
              <div
                className={cn("relative", isToolbarLeft && "w-full")}
                ref={strokeDropdownRef}
              >
                <button
                  onClick={() => setIsStrokeDropdownOpen(!isStrokeDropdownOpen)}
                  className={cn(
                    "flex items-center justify-between gap-2 px-2 py-1 rounded-md border transition-all duration-200 w-16",
                    isDarkMode
                      ? "bg-[#3A3A3C] border-[#4A4A4C] text-white hover:bg-[#3A3A3A] hover:border-[#555] hover:text-[#F5F5F5]"
                      : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100",
                    isToolbarLeft && "w-full"
                  )}
                >
                  <span className='text-xs font-medium'>{strokeWidth}px</span>
                  <ChevronDown className='h-3 w-3 opacity-70' />
                </button>

                {isStrokeDropdownOpen && (
                  <div
                    className={cn(
                      "absolute top-full mt-1 w-16 rounded-md shadow-lg py-1 max-h-[200px] overflow-y-auto number-tool-dropdown",
                      isDarkMode
                        ? "bg-[#3A3A3C] border border-[#4A4A4C] "
                        : "bg-white border border-gray-200",
                      isToolbarLeft && "w-full"
                    )}
                  >
                    {[1, 2, 3, 4, 5, 6].map((width) => (
                      <div
                        key={width}
                        onClick={() => {
                          setStrokeWidth(width);
                          setIsStrokeDropdownOpen(false);
                        }}
                        className={cn(
                          "px-3 py-1.5 cursor-pointer transition-all duration-200 text-center",
                          isDarkMode
                            ? "hover:bg-[#4A4A4C]"
                            : "hover:bg-gray-100",
                          strokeWidth === width &&
                            (isDarkMode ? "bg-[#4A4A4C]" : "bg-gray-100")
                        )}
                      >
                        <span className='text-xs'>{width}px</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Subtle divider */}
          <div
            className={cn(
              "h-8 w-px bg-gray-300 dark:bg-gray-700",
              isToolbarLeft && "w-full h-[1px]"
            )}
          ></div>

          {/* Number controls */}
          <div
            className={cn(
              "flex items-center gap-3 px-1",
              isToolbarLeft && "mt-6 flex-col items-start"
            )}
          >
            <span
              className={cn(
                "text-sm font-medium whitespace-nowrap",
                isDarkMode ? "text-gray-300" : "text-gray-700"
              )}
            >
              Number:
            </span>
            <div className='flex items-center gap-1.5 '>
              <Button
                onClick={() =>
                  setCurrentNumber((prev) => Math.max(1, prev - 1))
                }
                className={cn(
                  "h-7 w-7 p-0 rounded-md justify-center",
                  isDarkMode
                    ? "bg-[#3A3A3C] border-[#4A4A4C] hover:bg-[#4A4A4C]"
                    : "bg-gray-50 hover:bg-gray-100"
                )}
                disabled={currentNumber <= 1}
              >
                <span className='text-xs'>-</span>
              </Button>

              {renderNumberPreview(currentNumber, selectedStyle)}

              <Button
                onClick={handleIncrementNumber}
                className={cn(
                  "h-7 w-7 p-0 rounded-md justify-center",
                  isDarkMode
                    ? "bg-[#3A3A3C] border-[#4A4A4C] hover:bg-[#4A4A4C]"
                    : "bg-gray-50 hover:bg-gray-100"
                )}
              >
                <span className='text-xs'>+</span>
              </Button>
            </div>
          </div>

          {/* Close button */}
          <Button
            className={cn(
              "h-7 w-7 rounded-full transition-colors duration-200  justify-center",
              isDarkMode
                ? "hover:bg-[#3A3A3A] hover:text-[#F5F5F5]"
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
