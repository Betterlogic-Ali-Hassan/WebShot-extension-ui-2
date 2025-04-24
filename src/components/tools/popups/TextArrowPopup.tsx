"use client";

import { useEffect, useRef, useState } from "react";
import { X, ChevronDown, Bold, Italic, Underline } from "lucide-react";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/button";

interface TextArrowToolPopupProps {
  position: {
    top: number;
    left: number;
    width: number;
  };
  isDarkMode: boolean;
  onClose: () => void;
  onTextArrowTypeSelect?: (type: "text-arrow" | "page-text") => void;
  selectedTextArrowType?: "text-arrow" | "page-text";
  toolbarPosition: "top" | "left" | "bottom";
}

export function TextArrowToolPopup({
  position,
  isDarkMode,
  onClose,
  toolbarPosition,
  onTextArrowTypeSelect,
  selectedTextArrowType = "text-arrow",
}: TextArrowToolPopupProps) {
  const [selectedColor, setSelectedColor] = useState("#FF3B30");
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [selectedStrokeSize, setSelectedStrokeSize] = useState("2 px");
  const [isStrokeSizeOpen, setIsStrokeSizeOpen] = useState(false);
  const [selectedFont, setSelectedFont] = useState("System");
  const [isFontDropdownOpen, setIsFontDropdownOpen] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const fontDropdownRef = useRef<HTMLDivElement>(null);
  const textColorPickerRef = useRef<HTMLDivElement>(null);
  const StrokeSizePickerRef = useRef<HTMLDivElement>(null);
  const isToolbarLeft = toolbarPosition === "left";
  const isToolbarBottom = toolbarPosition === "bottom";
  // Colors for the color picker
  const colors = [
    "#FF3B30", // Red
    "#FF9500", // Orange
    "#FFCC00", // Yellow
    "#34C759", // Green
    "#5AC8FA", // Light Blue
    "#007AFF", // Blue
    "#5856D6", // Purple
    "#AF52DE", // Pink
    "#000000", // Black
    "#8E8E93", // Gray
    "#FFFFFF", // White
  ];

  // Stroke sizes
  const strokeSizes = ["1 px", "2 px", "4 px", "6 px", "8 px"];

  // Fonts
  const fonts = [
    "System",
    "Inter",
    "Roboto",
    "Helvetica",
    "Arial",
    "Calibri",
    "Georgia",
    "Times New Roman",
  ];
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

      // Text color picker
      if (
        textColorPickerRef.current &&
        !textColorPickerRef.current.contains(event.target as Node)
      ) {
        setIsColorPickerOpen(false);
      }

      // Background color picker
      if (
        StrokeSizePickerRef.current &&
        !StrokeSizePickerRef.current.contains(event.target as Node)
      ) {
        setIsStrokeSizeOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div
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
        minWidth: `${isToolbarLeft ? "66px" : "360px"}`,
      }}
    >
      <div className='p-3 '>
        <div
          className={cn(
            "flex items-center gap-4",
            isToolbarLeft && "flex-col-reverse items-start"
          )}
        >
          {/* Tool Selection - Toggle Switch */}
          <div
            className={`flex rounded-md overflow-hidden ${
              isDarkMode ? "bg-[#3A3A3C]" : "bg-gray-100"
            }`}
          >
            <button
              className={cn(
                "px-3 py-2 flex items-center gap-1.5 transition-colors whitespace-nowrap   hover:text-white",
                selectedTextArrowType === "text-arrow"
                  ? isDarkMode
                    ? "bg-[#505050]  text-white"
                    : "bg-white border border-gray-300 shadow-sm"
                  : "text-gray-500"
              )}
              onClick={() => onTextArrowTypeSelect?.("text-arrow")}
            >
              <div className='relative w-5 h-5'>
                <svg
                  width='20'
                  height='20'
                  viewBox='0 0 20 20'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  className='absolute top-0 left-0'
                >
                  <rect
                    x='2'
                    y='2'
                    width='12'
                    height='10'
                    rx='2'
                    stroke='currentColor'
                    strokeWidth='1.5'
                  />
                </svg>
                <svg
                  width='20'
                  height='20'
                  viewBox='0 0 20 20'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  className='absolute bottom-0 right-0'
                >
                  <path
                    d='M12 10L18 16M18 16H14M18 16V12'
                    stroke='currentColor'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </div>
              <span className='text-sm font-medium'>Text Arrow</span>
            </button>
            <button
              className={cn(
                "px-3 py-2 flex items-center gap-1.5 transition-colors whitespace-nowrap  hover:text-white",
                selectedTextArrowType === "page-text"
                  ? isDarkMode
                    ? "bg-[#505050] text-white"
                    : "bg-white border border-gray-300 shadow-sm"
                  : "text-gray-500"
              )}
              onClick={() => onTextArrowTypeSelect?.("page-text")}
            >
              <svg
                width='20'
                height='20'
                viewBox='0 0 20 20'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <rect
                  x='2'
                  y='2'
                  width='16'
                  height='16'
                  rx='2'
                  stroke='currentColor'
                  strokeWidth='1.5'
                />
                <path
                  d='M5 6H15'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                />
                <path
                  d='M5 10H15'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                />
                <path
                  d='M5 14H12'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                />
              </svg>
              <span className='text-sm font-medium'>Page Text</span>
            </button>
          </div>

          {/* Divider */}
          <div
            className={cn(
              "h-8 w-px bg-gray-300 dark:bg-gray-700",
              isToolbarLeft && "w-full h-[1px]"
            )}
          ></div>

          {/* Color Picker */}
          <div
            className={cn("relative", isToolbarLeft && "w-full")}
            ref={textColorPickerRef}
          >
            <button
              className={cn(
                "w-8 h-8 rounded-md flex items-center justify-center transition-all",
                isColorPickerOpen && "ring-2 ring-blue-500",
                isToolbarLeft && "w-full"
              )}
              onClick={() => setIsColorPickerOpen(!isColorPickerOpen)}
              style={{
                backgroundColor: selectedColor,
                border: isDarkMode ? "1px solid #3A3A3C" : "1px solid #E5E5EA",
              }}
            >
              {isColorPickerOpen && (
                <div className='absolute w-2 h-2 rounded-full bg-blue-500 bottom-0.5 right-0.5'></div>
              )}
            </button>
            {isColorPickerOpen && (
              <div
                className={cn(
                  "absolute top-full left-0 mt-2 p-2 rounded-lg shadow-lg z-50 grid grid-cols-6 gap-1",
                  isDarkMode
                    ? "bg-[#2C2C2E] border border-[#3A3A3C]"
                    : "bg-white border border-gray-200",
                  isToolbarLeft && "w-full"
                )}
              >
                {colors.map((color) => (
                  <button
                    key={color}
                    className={cn(
                      "w-6 h-6 rounded-full transition-transform hover:scale-110",
                      selectedColor === color &&
                        "ring-2 ring-offset-2 ring-blue-500"
                    )}
                    style={{
                      backgroundColor: color,
                      border:
                        color === "#FFFFFF" ? "1px solid #E5E5EA" : "none",
                    }}
                    onClick={() => {
                      setSelectedColor(color);
                      setIsColorPickerOpen(false);
                    }}
                  ></button>
                ))}
              </div>
            )}
          </div>

          {/* Divider */}
          <div
            className={cn(
              "h-8 w-px bg-gray-300 dark:bg-gray-700",
              isToolbarLeft && "w-full h-[1px]"
            )}
          ></div>

          {/* Stroke Size Selector */}
          <div
            className={cn("relative", isToolbarLeft && "w-full")}
            ref={StrokeSizePickerRef}
          >
            <button
              className={cn(
                "px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-all w-32 justify-between",
                isDarkMode
                  ? "bg-[#3A3A3C] hover:bg-[#4A4A4C]"
                  : "bg-gray-100 hover:bg-gray-200",
                isStrokeSizeOpen &&
                  (isDarkMode ? "bg-[#3A3A3C]" : "bg-gray-200"),
                isToolbarLeft && "w-full"
              )}
              onClick={() => setIsStrokeSizeOpen(!isStrokeSizeOpen)}
            >
              <div className='flex items-center gap-2'>
                <span className='text-sm font-medium'>
                  {selectedStrokeSize}
                </span>
                <div
                  className='h-px bg-current rounded-lg'
                  style={{
                    width: "20px",
                    height: `${Number.parseInt(selectedStrokeSize)}px`,
                  }}
                ></div>
              </div>
              <ChevronDown className='h-4 w-4' />
            </button>
            {isStrokeSizeOpen && (
              <div
                className={cn(
                  "absolute top-full left-0 mt-1 w-32 rounded-md shadow-lg z-50 py-1 max-h-60 overflow-y-auto scrollbar-none bg-[#3A3A3C] border border-[#4A4A4C]",
                  isDarkMode
                    ? "bg-[#2C2C2E] border border-[#3A3A3C]"
                    : "bg-white border border-gray-200",
                  isToolbarLeft && "w-full"
                )}
              >
                {strokeSizes.map((size) => (
                  <button
                    key={size}
                    className={cn(
                      "w-full px-3 py-2 text-left rounded-md flex items-center justify-between",
                      selectedStrokeSize === size
                        ? isDarkMode
                          ? "bg-[#3A3A3C]"
                          : "bg-gray-100"
                        : "hover:bg-opacity-10 hover:bg-[#4A4A4C]"
                    )}
                    onClick={() => {
                      setSelectedStrokeSize(size);
                      setIsStrokeSizeOpen(false);
                    }}
                  >
                    <span className='text-sm'>{size}</span>
                    <div
                      className='h-px bg-current rounded-lg'
                      style={{
                        width: "20px",
                        height: `${Number.parseInt(size)}px`,
                      }}
                    ></div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Divider */}
          <div
            className={cn(
              "h-8 w-px bg-gray-300 dark:bg-gray-700",
              isToolbarLeft && "w-full h-[1px]"
            )}
          ></div>

          {/* Font Selector */}
          <div
            className={cn("relative", isToolbarLeft && "w-full")}
            ref={fontDropdownRef}
          >
            <button
              onClick={() => setIsFontDropdownOpen(!isFontDropdownOpen)}
              className={cn(
                "flex items-center justify-between gap-2 px-3 py-1.5 rounded-md cursor-pointer border transition-all duration-200 min-w-[155px]",
                isDarkMode
                  ? "bg-[#3A3A3C] border-[#4A4A4C] text-white hover:bg-[#4A4A4C] hover:border-[#555] hover:text-[#F5F5F5]"
                  : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100",
                isToolbarLeft && "w-full"
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
                    : "bg-white border border-gray-200",
                  isToolbarLeft && "w-full"
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

          {/* Divider */}
          <div
            className={cn(
              "h-8 w-px bg-gray-300 dark:bg-gray-700",
              isToolbarLeft && "w-full h-[1px]"
            )}
          ></div>

          {/* Text Style Buttons */}
          <div
            className={cn(
              "flex items-center border rounded-md overflow-hidden",
              isDarkMode ? "border-[#3A3A3C]" : "border-gray-200",
              isToolbarLeft && "max-w-max mt-4"
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
          </div>

          {/* Close Button */}
          <button
            className={cn(
              "ml-auto rounded-full w-8 h-8 flex items-center justify-center transition-colors",
              isDarkMode
                ? "hover:bg-[#3A3A3C] text-gray-400 hover:text-white"
                : "hover:bg-gray-100 text-gray-500 hover:text-black",
              isToolbarLeft && "absolute top-0 right-0.5"
            )}
            onClick={onClose}
          >
            <X className='h-4 w-4' />
            <span className='sr-only'>Close</span>
          </button>
        </div>
      </div>
    </div>
  );
}
