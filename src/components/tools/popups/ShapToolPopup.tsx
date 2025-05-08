"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useImageEditor } from "@/context/ImageContext";
import { PopupContainer } from "./PopupContainer";
import { ColorPicker } from "@/components/common/ColorPicker";
import { StrokeWidthSelector } from "@/components/common/StrokeWidthSelector";
import Separator from "@/components/ui/Separator";

export type ShapeStyle = "square" | "rounded" | "circle" | "star";

export function ShapeToolPopup() {
  const {
    popupPosition,
    toolbarPosition,
    selectedShape: propSelectedShape = "square",
    handleClosePopup: onClose,
    setSelectedShape: onSelectShape,
  } = useImageEditor();

  const [selectedShape, setSelectedShape] =
    useState<ShapeStyle>(propSelectedShape);
  const [selectedColor, setSelectedColor] = useState("#FF3B30");
  const [selectedStrokeSize, setSelectedStrokeSize] = useState("2");

  // Shape options
  const shapes = [
    { id: "square", label: "Square" },
    { id: "rounded", label: "Rounded" },
    { id: "circle", label: "Circle" },
    { id: "star", label: "Star" },
  ];

  // Update the handleStyleSelect function to call the callback
  const handleStyleSelect = (shape: ShapeStyle) => {
    setSelectedShape(shape);
    if (onSelectShape) {
      onSelectShape(shape);
    }
  };

  return (
    <PopupContainer
      position={popupPosition}
      onClose={onClose}
      toolbarPosition={toolbarPosition}
    >
      <div className='flex items-center gap-4  max-[850px]:overflow-x-auto max-[850px]:max-w-[230px] max-[850px]:whitespace-nowrap no-scrollbar'>
        {/* Shape Selection */}
        <div className='flex items-center gap-2  '>
          {shapes.map((shape) => (
            <button
              key={shape.id}
              onClick={() => handleStyleSelect(shape.id as ShapeStyle)}
              className={cn(
                "flex flex-row items-center gap-2 p-2 rounded-lg transition-all max-h-[38px] max-[850px]:w-full cursor-pointer border border-transparent duration-200",
                selectedShape === shape.id
                  ? "bg-hover border-dashed  border-selection-border text-text"
                  : "text-text/60 hover:bg-hover hover:text-text"
              )}
            >
              <div className='w-6 h-6 flex items-center justify-center flex-shrink-0'>
                {shape.id === "square" && (
                  <div
                    className={cn(
                      "w-4 h-4 border-2",
                      selectedShape === shape.id
                        ? "border-current"
                        : "border-gray-400"
                    )}
                  ></div>
                )}
                {shape.id === "rounded" && (
                  <div
                    className={cn(
                      "w-4 h-4 rounded-md border-2",
                      selectedShape === shape.id
                        ? "border-current"
                        : "border-gray-400"
                    )}
                  ></div>
                )}
                {shape.id === "circle" && (
                  <div
                    className={cn(
                      "w-4 h-4 rounded-full border-2",
                      selectedShape === shape.id
                        ? "border-current"
                        : "border-gray-400"
                    )}
                  ></div>
                )}
                {shape.id === "star" && (
                  <Star
                    className={cn(
                      "w-4 h-4",
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
        <Separator />

        <div className='flex gap-2 '>
          {/* Color Picker */}
          <ColorPicker color={selectedColor} onChange={setSelectedColor} />

          {/* Stroke Width Selector */}
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
        </div>
      </div>
    </PopupContainer>
  );
}
