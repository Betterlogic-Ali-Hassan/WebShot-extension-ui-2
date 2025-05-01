"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { useImageEditor } from "@/context/ImageContext";

import {
  TextFormattingControls,
  type TextAlignment,
} from "@/components/TextFormatingControl";
import { PopupContainer } from "./PopupContainer";
import { FontSelector } from "@/components/FontSelector";
import { FontSizeSelector } from "@/components/FontSizeSelector";
import { ColorPicker } from "@/components/ColorPicker";
import BackgroundColorPicker from "@/components/BackgroundColorPicker";

export function TextToolPopup() {
  const {
    popupPosition,
    handleClosePopup: onClose,
    toolbarPosition,
  } = useImageEditor();

  // Text formatting state
  const [selectedFont, setSelectedFont] = useState("Calibri");
  const [fontSize, setFontSize] = useState(16);
  const [textColor, setTextColor] = useState("#FF3B30");
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [textAlignment, setTextAlignment] = useState<TextAlignment>("left");

  const isToolbarLeft = toolbarPosition === "left";

  return (
    <PopupContainer
      position={popupPosition}
      onClose={onClose}
      toolbarPosition={toolbarPosition}
      className='min-w-[600px]'
    >
      <div
        className={cn(
          "flex items-center gap-4",
          isToolbarLeft && "flex-col items-start"
        )}
      >
        {/* Font Selector */}
        <FontSelector
          value={selectedFont}
          onChange={setSelectedFont}
          className={isToolbarLeft ? "w-full" : ""}
        />

        {/* Font Size Selector */}
        <FontSizeSelector value={fontSize} onChange={setFontSize} />

        {/* Text Color Picker */}
        <ColorPicker
          color={textColor}
          onChange={setTextColor}
          buttonClassName='w-8 h-8'
        />

        {/* Text Formatting Controls */}
        <TextFormattingControls
          isBold={isBold}
          isItalic={isItalic}
          isUnderline={isUnderline}
          isStrikethrough={isStrikethrough}
          textAlignment={textAlignment}
          onBoldChange={setIsBold}
          onItalicChange={setIsItalic}
          onUnderlineChange={setIsUnderline}
          onStrikethroughChange={setIsStrikethrough}
          onAlignmentChange={setTextAlignment}
          option
        />

        {/* Background Fill Color */}
        <div className='relative'>
          <BackgroundColorPicker />
        </div>
      </div>
    </PopupContainer>
  );
}
