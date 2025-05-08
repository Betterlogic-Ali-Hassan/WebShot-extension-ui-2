"use client";

import { useState } from "react";
import Button from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useImageEditor } from "@/context/ImageContext";
import { NumberPreview, NumberStyle } from "@/components/common/NumberPreview";
import { PopupContainer } from "./PopupContainer";
import { ColorPicker } from "@/components/common/ColorPicker";
import { StrokeWidthSelector } from "@/components/common/StrokeWidthSelector";
import Separator from "@/components/ui/Separator";

export function NumberToolPopup() {
  const {
    popupPosition,
    toolbarPosition,
    handleClosePopup: onClose,
  } = useImageEditor();

  const [selectedStyle, setSelectedStyle] = useState<NumberStyle>("circled");
  const [selectedColor, setSelectedColor] = useState("#007AFF");
  const [currentNumber, setCurrentNumber] = useState(1);
  const [strokeWidth, setStrokeWidth] = useState(2);

  // Handle style selection
  const handleStyleSelect = (style: NumberStyle) => {
    setSelectedStyle(style);
  };

  const handleIncrementNumber = () => {
    setCurrentNumber((prev) => prev + 1);
  };

  return (
    <PopupContainer
      position={popupPosition}
      onClose={onClose}
      toolbarPosition={toolbarPosition}
    >
      <div className='flex items-center gap-4 max-[850px]:overflow-x-auto max-[850px]:max-w-[230px] max-[850px]:whitespace-nowrap no-scrollbar max-[850px]:h-[60px]'>
        {/* Style section */}
        <div className='flex items-center gap-3 px-1'>
          <span className='text-sm font-medium whitespace-nowrap text-text'>
            Style:
          </span>

          <div className='flex items-center gap-2'>
            <button
              onClick={() => handleStyleSelect("circled")}
              className={cn(
                "p-1.5 rounded-md transition-all duration-200 relative",
                selectedStyle === "circled"
                  ? " ring-2 ring-info shadow-inner"
                  : "hover:bg-hover hover:shadow",
                "after:absolute after:inset-0 after:rounded-md after:opacity-0 hover:after:opacity-10  after:transition-opacity"
              )}
            >
              <NumberPreview number={1} style='circled' color={selectedColor} />
            </button>
            <button
              onClick={() => handleStyleSelect("squared")}
              className={cn(
                "p-1.5 rounded-md transition-all duration-200 relative",
                selectedStyle === "squared"
                  ? " ring-2 ring-info shadow-inner"
                  : "hover:bg-hover hover:shadow",
                "after:absolute after:inset-0 after:rounded-md after:opacity-0 hover:after:opacity-10  after:transition-opacity"
              )}
            >
              <NumberPreview number={1} style='squared' color={selectedColor} />
            </button>
            <button
              onClick={() => handleStyleSelect("plain")}
              className={cn(
                "p-1.5 rounded-md transition-all duration-200 relative",
                selectedStyle === "plain"
                  ? "  ring-2 ring-info shadow-inner"
                  : "hover:bg-hover hover:shadow",
                "after:absolute after:inset-0 after:rounded-md after:opacity-0 hover:after:opacity-10  after:transition-opacity"
              )}
            >
              <NumberPreview number={1} style='plain' color={selectedColor} />
            </button>
          </div>
        </div>

        {/* Subtle divider */}
        <Separator />

        {/* Color picker */}
        <div className='relative'>
          <div className='flex items-center gap-3 px-1'>
            <span className='text-sm font-medium whitespace-nowrap text-text'>
              Color:
            </span>
            <ColorPicker
              color={selectedColor}
              onChange={setSelectedColor}
              recentColors={[
                "#007AFF",
                "#FF3B30",
                "#34C759",
                "#FF9500",
                "#5856D6",
                "#000000",
              ]}
              showAlpha={false}
            />
          </div>
        </div>

        {/* Subtle divider */}
        <Separator />

        {/* Size controls - only show for non-plain styles */}

        <div className='flex items-center gap-3 px-1'>
          <span className='text-sm font-medium whitespace-nowrap text-text'>
            Size:
          </span>
          <StrokeWidthSelector
            value={strokeWidth.toString()}
            onChange={(value) => setStrokeWidth(Number.parseInt(value))}
            options={[
              { value: "1", label: "1 px" },
              { value: "2", label: "2 px" },
              { value: "3", label: "3 px" },
              { value: "4", label: "4 px" },
              { value: "5", label: "5 px" },
              { value: "6", label: "6 px" },
            ]}
          />
        </div>

        {/* Subtle divider */}
        <Separator />

        {/* Number controls */}
        <div className='flex items-center gap-3 px-1'>
          <span className='text-sm font-medium whitespace-nowrap text-text'>
            Number:
          </span>
          <div className='flex items-center gap-1.5'>
            <Button
              onClick={() => setCurrentNumber((prev) => Math.max(1, prev - 1))}
              className='h-7 w-7 p-0 rounded-md justify-center bg-border hover:bg-border/60'
              disabled={currentNumber <= 1}
            >
              <span className='text-[15px]'>-</span>
            </Button>

            <NumberPreview
              number={currentNumber}
              style={selectedStyle}
              color={selectedColor}
              strokeWidth={strokeWidth}
            />

            <Button
              onClick={handleIncrementNumber}
              className='h-7 w-7 p-0 rounded-md justify-center bg-border hover:bg-border/60'
            >
              <span className='text-[15px]'>+</span>
            </Button>
          </div>
        </div>
      </div>
    </PopupContainer>
  );
}
