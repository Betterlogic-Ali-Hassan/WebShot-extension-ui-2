"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

import { useImageEditor } from "@/context/ImageContext";
import { PopupContainer } from "./PopupContainer";
import { ColorPicker } from "@/components/ColorPicker";
import { FontSelector } from "@/components/FontSelector";
import { TextFormattingControls } from "@/components/TextFormatingControl";
import { StrokeWidthSelector } from "@/components/StrokeWidthSelector";
import TextArrowIcon from "@/components/svgs/TextArrowIcon";
import PageTextIcon from "@/components/svgs/PageTextIcon";
import Separator from "@/components/ui/Separator";

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

  return (
    <PopupContainer
      position={popupPosition}
      onClose={onClose}
      toolbarPosition={toolbarPosition}
    >
      <div className='flex items-center gap-4 max-[850px]:ml-12'>
        {/* Tool Selection - Toggle Switch */}
        <div className='flex rounded-md overflow-hidden bg-background'>
          <button
            className={cn(
              "px-3 py-2 flex items-center gap-1.5 transition-colors whitespace-nowrap   hover:bg-border",
              selectedTextArrowType === "text-arrow"
                ? "bg-border text-text"
                : "text-text"
            )}
            onClick={() => onTextArrowTypeSelect?.("text-arrow")}
          >
            <TextArrowIcon />
            <span className='text-sm font-medium'>Text Arrow</span>
          </button>
          <button
            className={cn(
              "px-3 py-2 flex items-center gap-1.5 transition-colors whitespace-nowrap  hover:bg-border",
              selectedTextArrowType === "page-text"
                ? "bg-border text-text"
                : "text-text"
            )}
            onClick={() => onTextArrowTypeSelect?.("page-text")}
          >
            <PageTextIcon />
            <span className='text-sm font-medium'>Page Text</span>
          </button>
        </div>

        {/* Divider */}
        <Separator />

        {/* Color Picker */}
        <ColorPicker color={selectedColor} onChange={setSelectedColor} />

        {/* Divider */}
        <Separator />

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
        <Separator />

        {/* Font Selector */}
        <FontSelector value={selectedFont} onChange={setSelectedFont} />

        {/* Divider */}
        <Separator />

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
    </PopupContainer>
  );
}
