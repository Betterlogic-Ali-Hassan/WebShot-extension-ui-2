"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

import { useImageEditor } from "@/context/ImageContext";
import { PopupContainer } from "./PopupContainer";
import { ColorPicker } from "@/components/common/ColorPicker";
import { FontSelector } from "@/components/common/FontSelector";
import { TextFormattingControls } from "@/components/common/TextFormatingControl";
import { StrokeWidthSelector } from "@/components/common/StrokeWidthSelector";
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
      <div className='flex items-center gap-4  max-[850px]:overflow-x-auto max-[850px]:max-w-[250px] max-[850px]:whitespace-nowrap no-scrollbar'>
        {/* Tool Selection - Toggle Switch */}
        <div className='flex  gap-2 rounded-md min-[850px]:overflow-hidden '>
          <button
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-lg transition-all max-h-[38px]  duration-200 cursor-pointer border border-transparent ring-0 outline-none  focus:outline-none",
              selectedTextArrowType === "text-arrow"
                ? "bg-hover border-dashed  border-selection-border text-text "
                : "text-text/60 hover:bg-hover hover:text-text"
            )}
            onClick={() => onTextArrowTypeSelect?.("text-arrow")}
          >
            <TextArrowIcon />
            <span className='text-sm font-medium'>Text Arrow</span>
          </button>
          <button
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-lg transition-all max-h-[38px]  duration-200 cursor-pointer border border-transparent ring-0 outline-none  focus:outline-none",
              selectedTextArrowType === "page-text"
                ? "bg-hover border-dashed  border-selection-border text-text "
                : "text-text/60 hover:bg-hover hover:text-text"
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
