"use client";

import { useState } from "react";
import { Pencil, Paintbrush, Highlighter } from "lucide-react";
import { cn } from "@/lib/utils";
import { useImageEditor } from "@/context/ImageContext";
import { PopupContainer } from "./PopupContainer";
import { ColorPicker } from "@/components/ColorPicker";
import { StrokeWidthSelector } from "@/components/StrokeWidthSelector";

export type PencilTool = "pencil" | "brush" | "highlighter";

export function PencilToolPopup() {
  const {
    popupPosition,
    toolbarPosition,
    selectedPencilTool: propSelectedTool = "pencil",
    handleClosePopup: onClose,
    setSelectedPencilTool: onToolSelect,
  } = useImageEditor();

  const [selectedTool, setSelectedTool] =
    useState<PencilTool>(propSelectedTool);
  const [selectedColor, setSelectedColor] = useState("#FF3B30");
  const [selectedStrokeSize, setSelectedStrokeSize] = useState("2");

  // Update the tool selection handler to call the callback
  const handleToolSelect = (tool: PencilTool) => {
    setSelectedTool(tool);
    if (onToolSelect) {
      onToolSelect(tool);
    }
  };

  // Tool options
  const tools = [
    { id: "pencil", icon: Pencil, label: "Pencil" },
    { id: "brush", icon: Paintbrush, label: "Brush" },
    { id: "highlighter", icon: Highlighter, label: "Highlighter" },
  ];

  return (
    <PopupContainer
      position={popupPosition}
      onClose={onClose}
      toolbarPosition={toolbarPosition}
    >
      <div className='flex items-center justify-between w-full  gap-4 max-[850px]:overflow-x-auto max-[850px]:max-w-[230px] max-[850px]:whitespace-nowrap no-scrollbar '>
        <div className='flex items-center gap-2 '>
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => handleToolSelect(tool.id as PencilTool)}
              className={cn(
                "flex items-center gap-2 px-3 py-2 cursor-pointer rounded-lg max-h-[38px] w-full transition-all duration-200 border border-transparent",
                selectedTool === tool.id
                  ? "bg-hover border-dashed  border-selection-border text-text"
                  : "text-text/60 hover:bg-hover hover:text-text",
                tool.id === "highlighter" && "mr-4"
              )}
            >
              <tool.icon className='h-4 w-4 flex-shrink-0' />
              <span className='text-sm'>{tool.label}</span>
            </button>
          ))}
        </div>

        <div className='flex min-[850px]:items-center gap-4 '>
          {/* Color Picker */}
          <ColorPicker color={selectedColor} onChange={setSelectedColor} />

          {/* Stroke Width Selector */}
          <StrokeWidthSelector
            value={selectedStrokeSize}
            onChange={setSelectedStrokeSize}
            options={[
              { value: "1", label: "1 px" },
              { value: "2", label: "2 px" },
              { value: "3", label: "3 px" },
              { value: "4", label: "4 px" },
              { value: "5", label: "5 px" },
            ]}
          />
        </div>
      </div>
    </PopupContainer>
  );
}
