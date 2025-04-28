"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

import { useImageEditor } from "@/context/ImageContext";
import { PopupContainer } from "./PopupContainer";
import { ColorPicker } from "@/components/ColorPicker";
import { FontSelector } from "@/components/FontSelector";
import { TextFormattingControls } from "@/components/TextFormatingControl";
import { StrokeWidthSelector } from "@/components/StrokeWidthSelector";

export function TextArrowToolPopup() {
  const {
    popupPosition,
    toolbarPosition,
    selectedTextArrowType: selectedTextArrowType = "text-arrow",
    handleClosePopup: onClose,
    setSelectedTextArrowType: onTextArrowTypeSelect,
  } = useImageEditor();
  const [selectedColor, setSelectedColor] = useState("#FF3B30");
  const [selectedStrokeSize, setSelectedStrokeSize] = useState("2");
  const [selectedFont, setSelectedFont] = useState("System");
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);

  const isToolbarLeft = toolbarPosition === "left";
  return (
    <PopupContainer
      position={popupPosition}
      onClose={onClose}
      toolbarPosition={toolbarPosition}
    >
      <div className='p-3 '>
        <div
          className={cn(
            "flex items-center gap-4",
            isToolbarLeft && "flex-col-reverse items-start"
          )}
        >
          {/* Tool Selection - Toggle Switch */}
          <div className={`flex rounded-md overflow-hidden bg-background`}>
            <button
              className={cn(
                "px-3 py-2 flex items-center gap-1.5 transition-colors whitespace-nowrap   hover:bg-hover",
                selectedTextArrowType === "text-arrow"
                  ? "bg-hover text-text"
                  : "text-text"
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
                "px-3 py-2 flex items-center gap-1.5 transition-colors whitespace-nowrap  hover:bg-hover",
                selectedTextArrowType === "page-text"
                  ? "bg-hover text-text"
                  : "text-text"
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
              "h-8 w-px bg-border",
              isToolbarLeft && "w-full h-[1px]"
            )}
          ></div>

          {/* Color Picker */}
          <ColorPicker color={selectedColor} onChange={setSelectedColor} />

          {/* Divider */}
          <div
            className={cn(
              "h-8 w-px bg-border",
              isToolbarLeft && "w-full h-[1px]"
            )}
          ></div>

          {/* Stroke Size Selector */}
          <StrokeWidthSelector
            value={selectedStrokeSize}
            onChange={setSelectedStrokeSize}
            options={[
              { value: "2", label: "2 px" },
              { value: "4", label: "4 px" },
              { value: "6", label: "6 px" },
              { value: "8", label: "8 px" },
              { value: "16", label: "16 px" },
            ]}
          />

          {/* Divider */}
          <div
            className={cn(
              "h-8 w-px bg-border",
              isToolbarLeft && "w-full h-[1px]"
            )}
          ></div>

          {/* Font Selector */}
          <FontSelector
            value={selectedFont}
            onChange={setSelectedFont}
            className={isToolbarLeft ? "w-full" : ""}
          />

          {/* Divider */}
          <div
            className={cn(
              "h-8 w-px bg-border",
              isToolbarLeft && "w-full h-[1px]"
            )}
          ></div>

          {/* Text Style Buttons */}
          <TextFormattingControls
            isBold={isBold}
            isItalic={isItalic}
            isUnderline={isUnderline}
            onBoldChange={setIsBold}
            onItalicChange={setIsItalic}
            onUnderlineChange={setIsUnderline}
          />
        </div>
      </div>
    </PopupContainer>
  );
}
