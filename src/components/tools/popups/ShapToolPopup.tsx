"use client";

import { useState, useRef, useEffect } from "react";
import { Star, X, ChevronDown } from "lucide-react";
import Button from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ShapeToolPopupProps {
  position: { top: number; left: number; width: number };
  isDarkMode: boolean;
  onClose: () => void;
  onShapeSelect?: (shape: "square" | "rounded" | "circle" | "star") => void;
  selectedShape?: "square" | "rounded" | "circle" | "star";
  toolbarPosition: "top" | "left" | "bottom";
}

export function ShapeToolPopup({
  position,
  isDarkMode,
  onClose,
  onShapeSelect,
  toolbarPosition,
  selectedShape: propSelectedShape = "square",
}: ShapeToolPopupProps) {
  // Shape selection state - use the prop if provided
  const [selectedShape, setSelectedShape] = useState<
    "square" | "rounded" | "circle" | "star"
  >(propSelectedShape);
  const [selectedColor, setSelectedColor] = useState("#FF3B30");
  const [selectedStrokeSize, setSelectedStrokeSize] = useState("2");
  const [isStrokeDropdownOpen, setIsStrokeDropdownOpen] = useState(false);
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);

  // Color picker state
  const [hue, setHue] = useState(0);
  const [saturation, setSaturation] = useState(100);
  const [brightness, setBrightness] = useState(100);
  const [alpha, setAlpha] = useState(100);
  const [hexValue, setHexValue] = useState(selectedColor.replace("#", ""));
  const [rgbValues, setRgbValues] = useState({ r: 255, g: 48, b: 48 });

  // Track if the color change is internal (from HSV controls) or external (from selectedColor prop)
  const isInternalColorChange = useRef(false);

  // Refs for DOM elements
  const saturationBoxRef = useRef<HTMLDivElement>(null);
  const hueSliderRef = useRef<HTMLDivElement>(null);
  const alphaSliderRef = useRef<HTMLDivElement>(null);
  const strokeDropdownRef = useRef<HTMLDivElement>(null);
  const colorPickerRef = useRef<HTMLDivElement>(null);
  const colorButtonRef = useRef<HTMLButtonElement>(null);
  const isToolbarLeft = toolbarPosition === "left";
  const isToolbarBottom = toolbarPosition === "bottom";
  // Add the same positioning improvements to ShapeToolPopup
  const popupRef = useRef<HTMLDivElement>(null);

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

    if (alpha < 100) {
      handleColorChange(
        `rgba(${rgbValues.r}, ${rgbValues.g}, ${rgbValues.b}, ${alpha / 100})`
      );
    } else {
      handleColorChange(hex);
    }
  }, [rgbValues, alpha]);

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

  // Shape options
  const shapes = [
    { id: "square", label: "Square" },
    { id: "rounded", label: "Rounded" },
    { id: "circle", label: "Circle" },
    { id: "star", label: "Star" },
  ];

  // Stroke size options
  const strokeSizes = [
    { value: "2", label: "2 px" },
    { value: "4", label: "4 px" },
    { value: "6", label: "6 px" },
    { value: "8", label: "8 px" },
    { value: "16", label: "16 px" },
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        strokeDropdownRef.current &&
        !strokeDropdownRef.current.contains(event.target as Node)
      ) {
        setIsStrokeDropdownOpen(false);
      }

      if (
        colorPickerRef.current &&
        !colorPickerRef.current.contains(event.target as Node) &&
        colorButtonRef.current &&
        !colorButtonRef.current.contains(event.target as Node)
      ) {
        setIsColorPickerOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
  };

  // Function to safely parse integers with fallback
  const safeParseInt = (value: string, fallback = 0): number => {
    const parsed = Number.parseInt(value, 10);
    return isNaN(parsed) ? fallback : parsed;
  };

  // Add a useEffect to adjust the position after the component renders
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

  // Update the handleStyleSelect function to call the callback
  const handleStyleSelect = (
    shape: "square" | "rounded" | "circle" | "star"
  ) => {
    setSelectedShape(shape);
    if (onShapeSelect) {
      onShapeSelect(shape);
    }
  };

  // Update the return statement to add the ref and remove the inline style for left positioning
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
        minWidth: `${isToolbarLeft ? "66px" : "320px"}`,
        maxWidth: `${isToolbarLeft ? "" : "calc(100% - 32px)"}`,
      }}
    >
      <div className='p-3'>
        <div
          className={cn(
            "flex items-center gap-4",
            isToolbarLeft && "flex-col-reverse"
          )}
        >
          {/* Shape Selection */}
          <div
            className={cn(
              "flex items-center gap-2",
              isToolbarLeft && "flex-col"
            )}
          >
            {shapes.map((shape) => (
              <button
                key={shape.id}
                onClick={() =>
                  handleStyleSelect(
                    shape.id as "square" | "rounded" | "circle" | "star"
                  )
                }
                className={cn(
                  "flex flex-row items-center gap-2 p-2 rounded-lg transition-all cursor-pointer border border-transparent duration-200",
                  selectedShape === shape.id
                    ? isDarkMode
                      ? "bg-[#3A3A3C]  border-dashed border-[#4A4A4C] text-white"
                      : "bg-gray-100  border-gray-200 text-black font-medium"
                    : isDarkMode
                    ? "text-gray-500 hover:bg-[#3A3A3A] hover:text-[#F5F5F5]"
                    : "text-gray-500 hover:bg-opacity-50",
                  isToolbarLeft && "min-w-[108px] mt-2"
                )}
              >
                <div className='w-6 h-6 flex items-center justify-center flex-shrink-0'>
                  {shape.id === "square" && (
                    <div
                      className={cn(
                        "w-5 h-5 border-2",
                        selectedShape === shape.id
                          ? "border-current"
                          : "border-gray-400"
                      )}
                    ></div>
                  )}
                  {shape.id === "rounded" && (
                    <div
                      className={cn(
                        "w-5 h-5 rounded-md border-2",
                        selectedShape === shape.id
                          ? "border-current"
                          : "border-gray-400"
                      )}
                    ></div>
                  )}
                  {shape.id === "circle" && (
                    <div
                      className={cn(
                        "w-5 h-5 rounded-full border-2",
                        selectedShape === shape.id
                          ? "border-current"
                          : "border-gray-400"
                      )}
                    ></div>
                  )}
                  {shape.id === "star" && (
                    <Star
                      className={cn(
                        "w-5 h-5",
                        selectedShape === shape.id ? "fill-current" : ""
                      )}
                    />
                  )}
                </div>
                <span className='text-sm'>{shape.label}</span>
              </button>
            ))}
          </div>

          {/* Divider */}
          <div
            className={cn(
              "h-10 w-px bg-gray-300 dark:bg-gray-700",
              isToolbarLeft && "w-full h-[1px]"
            )}
          ></div>
          <div className={cn("flex gap-2  ", isToolbarLeft && "mt-6")}>
            {/* Color Picker */}
            <div className='relative'>
              <button
                ref={colorButtonRef}
                onClick={() => setIsColorPickerOpen(!isColorPickerOpen)}
                className='w-8 h-7 rounded-md flex items-center justify-center border cursor-pointer border-gray-300 shadow-sm relative transition-colors duration-200 hover:border-[#555]'
                style={{ backgroundColor: selectedColor }}
                aria-label='Select color'
              >
                <ChevronDown className='h-3 w-3 absolute right-0 bottom-0 text-white bg-black bg-opacity-30 rounded-full p-0.5' />
              </button>

              {isColorPickerOpen && (
                <div
                  ref={colorPickerRef}
                  className='absolute top-full left-0 mt-2 z-50'
                >
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
                          Math.min(1, (touch.clientX - rect.left) / rect.width)
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

                    {/* Alpha slider */}
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
                        document.addEventListener(
                          "touchmove",
                          handleAlphaTouchMove
                        );
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

                    {/* Color preview and hex input */}
                    <div className='flex items-center gap-3 mb-4'>
                      <div className='w-8 h-8 rounded-lg shadow-sm border border-gray-600 bg-checkered flex-shrink-0'>
                        <div
                          className='w-full h-full rounded-lg'
                          style={{
                            backgroundColor: `rgba(${rgbValues.r}, ${
                              rgbValues.g
                            }, ${rgbValues.b}, ${alpha / 100})`,
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

                    {/* RGB and Alpha inputs */}
                    <div className='grid grid-cols-4 gap-1.5 mb-4'>
                      <div>
                        <label className='block text-xs mb-1 opacity-70'>
                          R
                        </label>
                        <input
                          type='number'
                          min='0'
                          max='255'
                          value={rgbValues.r}
                          onChange={(e) => {
                            const value = Math.max(
                              0,
                              Math.min(
                                255,
                                Number.parseInt(e.target.value) || 0
                              )
                            );
                            const newRgb = { ...rgbValues, r: value };
                            setRgbValues(newRgb);
                            const hsv = rgbToHsv(newRgb.r, newRgb.g, newRgb.b);
                            setHue(hsv.h);
                            setSaturation(hsv.s);
                            setBrightness(hsv.v);
                          }}
                          className={cn(
                            "w-full h-8 text-sm py-1 px-1.5 rounded-md focus:outline-none transition-all",
                            isDarkMode
                              ? "bg-[#2C2C2E] text-white"
                              : "bg-gray-50 text-gray-700"
                          )}
                        />
                      </div>
                      <div>
                        <label className='block text-xs mb-1 opacity-70'>
                          G
                        </label>
                        <input
                          type='number'
                          min='0'
                          max='255'
                          value={rgbValues.g}
                          onChange={(e) => {
                            const value = Math.max(
                              0,
                              Math.min(
                                255,
                                Number.parseInt(e.target.value) || 0
                              )
                            );
                            const newRgb = { ...rgbValues, g: value };
                            setRgbValues(newRgb);
                            const hsv = rgbToHsv(newRgb.r, newRgb.g, newRgb.b);
                            setHue(hsv.h);
                            setSaturation(hsv.s);
                            setBrightness(hsv.v);
                          }}
                          className={cn(
                            "w-full h-8 text-sm py-1 px-1.5 rounded-md focus:outline-none transition-all",
                            isDarkMode
                              ? "bg-[#2C2C2E] text-white"
                              : "bg-gray-50 text-gray-700"
                          )}
                        />
                      </div>
                      <div>
                        <label className='block text-xs mb-1 opacity-70'>
                          B
                        </label>
                        <input
                          type='number'
                          min='0'
                          max='255'
                          value={rgbValues.b}
                          onChange={(e) => {
                            const value = Math.max(
                              0,
                              Math.min(
                                255,
                                Number.parseInt(e.target.value) || 0
                              )
                            );
                            const newRgb = { ...rgbValues, b: value };
                            setRgbValues(newRgb);
                            const hsv = rgbToHsv(newRgb.r, newRgb.g, newRgb.b);
                            setHue(hsv.h);
                            setSaturation(hsv.s);
                            setBrightness(hsv.v);
                          }}
                          className={cn(
                            "w-full h-8 text-sm py-1 px-1.5 rounded-md focus:outline-none transition-all",
                            isDarkMode
                              ? "bg-[#2C2C2E] text-white"
                              : "bg-gray-50 text-gray-700"
                          )}
                        />
                      </div>
                      <div>
                        <label className='block text-xs mb-1 opacity-70'>
                          A
                        </label>
                        <input
                          type='number'
                          min='0'
                          max='100'
                          value={Math.round(alpha)}
                          onChange={(e) => {
                            setAlpha(
                              Math.max(
                                0,
                                Math.min(
                                  100,
                                  Number.parseInt(e.target.value) || 0
                                )
                              )
                            );
                          }}
                          className={cn(
                            "w-full h-8 text-sm py-1 px-1.5 rounded-md focus:outline-none transition-all",
                            isDarkMode
                              ? "bg-[#2C2C2E] text-white"
                              : "bg-gray-50 text-gray-700"
                          )}
                        />
                      </div>
                    </div>

                    {/* Recent Colors */}
                    <div>
                      <label className='block text-xs mb-2 opacity-70'>
                        Recent Colors
                      </label>
                      <div className='flex flex-wrap gap-2'>
                        {[
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
                              setHue(h);
                              setSaturation(s);
                              setBrightness(v);
                              setRgbValues({ r, g, b });
                              setHexValue(color.replace("#", ""));
                              setAlpha(100);
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

            {/* Stroke Width Dropdown */}
            <div className='relative' ref={strokeDropdownRef}>
              <button
                onClick={() => setIsStrokeDropdownOpen(!isStrokeDropdownOpen)}
                className={cn(
                  "flex items-center justify-between gap-2 px-3 py-1.5 cursor-pointer rounded-md border transition-all duration-200 w-32",
                  isDarkMode
                    ? "bg-[#3A3A3C] border-[#4A4A4C] text-white hover:bg-[#3A3A3A] hover:border-[#555] hover:text-[#F5F5F5]"
                    : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
                )}
              >
                <div className='flex items-center gap-1.5'>
                  <span className='text-xs font-medium'>
                    {
                      strokeSizes.find((s) => s.value === selectedStrokeSize)
                        ?.label
                    }
                  </span>
                  <div
                    className='w-6 transition-all duration-200'
                    style={{
                      height: `${safeParseInt(selectedStrokeSize, 1)}px`,
                      backgroundColor: isDarkMode ? "white" : "black",
                      borderRadius:
                        safeParseInt(selectedStrokeSize, 1) > 1
                          ? safeParseInt(selectedStrokeSize, 1) / 2
                          : 0,
                    }}
                  />
                </div>
                <ChevronDown className='h-3.5 w-3.5 opacity-70' />
              </button>

              {isStrokeDropdownOpen && (
                <div
                  className={cn(
                    "absolute top-full left-0 mt-1 w-36 rounded-md shadow-lg z-50 py-1",
                    isDarkMode
                      ? "bg-[#3A3A3C] border border-[#4A4A4C]"
                      : "bg-white border border-gray-200"
                  )}
                >
                  {strokeSizes.map((size) => (
                    <div
                      key={size.value}
                      onClick={() => {
                        setSelectedStrokeSize(size.value);
                        setIsStrokeDropdownOpen(false);
                      }}
                      className={cn(
                        "px-3 py-2 cursor-pointer transition-all duration-200",
                        isDarkMode ? "hover:bg-[#4A4A4C]" : "hover:bg-gray-100",
                        selectedStrokeSize === size.value &&
                          (isDarkMode ? "bg-[#4A4A4C]" : "bg-gray-100")
                      )}
                    >
                      <div className='flex flex-col gap-1'>
                        <span className='text-sm'>{size.label}</span>
                        <div
                          className='w-full transition-all duration-200'
                          style={{
                            height: `${safeParseInt(size.value, 1)}px`,
                            backgroundColor: isDarkMode ? "white" : "black",
                            borderRadius:
                              safeParseInt(size.value, 1) > 1
                                ? safeParseInt(size.value, 1) / 2
                                : 0,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Close Button - Added here */}
          <Button
            className={cn(
              "h-8 w-8 rounded-full transition-colors duration-200 justify-center ",
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
