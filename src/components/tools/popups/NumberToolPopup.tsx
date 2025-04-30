"use client";

import { useState } from "react";
import Button from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useImageEditor } from "@/context/ImageContext";
import { NumberPreview, NumberStyle } from "@/components/NumberPreview";
import { PopupContainer } from "./PopupContainer";
import { ColorPicker } from "@/components/ColorPicker";
import { StrokeWidthSelector } from "@/components/StrokeWidthSelector";

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

  const isToolbarLeft = toolbarPosition === "left";

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
      <div
        className={cn(
          "flex items-center gap-4",
          isToolbarLeft && "flex-col-reverse items-start"
        )}
      >
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
                  ? "bg-searchbar ring-2 ring-info shadow-inner"
                  : "hover:bg-hover hover:shadow",
                "after:absolute after:inset-0 after:rounded-md after:opacity-0 hover:after:opacity-10 after:bg-background after:transition-opacity"
              )}
            >
              <NumberPreview
                number={1}
                style='circled'
                color={selectedColor}
                useStandardColor={selectedStyle !== "circled"}
              />
            </button>
            <button
              onClick={() => handleStyleSelect("squared")}
              className={cn(
                "p-1.5 rounded-md transition-all duration-200 relative",
                selectedStyle === "squared"
                  ? "bg-searchbar ring-2 ring-info shadow-inner"
                  : "hover:bg-hover hover:shadow",
                "after:absolute after:inset-0 after:rounded-md after:opacity-0 hover:after:opacity-10 after:bg-white after:transition-opacity"
              )}
            >
              <NumberPreview
                number={1}
                style='squared'
                color={selectedColor}
                useStandardColor={selectedStyle !== "squared"}
              />
            </button>
            <button
              onClick={() => handleStyleSelect("plain")}
              className={cn(
                "p-1.5 rounded-md transition-all duration-200 relative",
                selectedStyle === "plain"
                  ? "bg-searchbar ring-2 ring-info shadow-inner"
                  : "hover:bg-hover hover:shadow",
                "after:absolute after:inset-0 after:rounded-md after:opacity-0 hover:after:opacity-10 after:bg-white after:transition-opacity"
              )}
            >
              <NumberPreview
                number={1}
                style='plain'
                color={selectedColor}
                useStandardColor={selectedStyle !== "plain"}
              />
            </button>
          </div>
        </div>

        {/* Subtle divider */}
        <div
          className={cn(
            "h-10 w-px bg-border",
            isToolbarLeft && "w-full h-[1px]"
          )}
        ></div>

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
        <div
          className={cn(
            "h-10 w-px bg-border",
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
              className={isToolbarLeft ? "w-full" : ""}
            />
          </div>
        )}

        {/* Subtle divider */}
        <div
          className={cn(
            "h-8 w-px bg-border",
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
