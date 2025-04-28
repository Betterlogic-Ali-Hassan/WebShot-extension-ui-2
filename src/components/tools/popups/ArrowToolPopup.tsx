"use client";

import { useState } from "react";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useImageEditor } from "@/context/ImageContext";
import { PopupContainer } from "./PopupContainer";
import { ColorPicker } from "@/components/ColorPicker";
import { StrokeWidthSelector } from "@/components/StrokeWidthSelector";

export type ArrowStyle =
  | "arrow-line"
  | "arrow-curve"
  | "double-arrow"
  | "line"
  | "curve-line"
  | "dotted-line";

export function ArrowToolPopup() {
  const {
    popupPosition,
    toolbarPosition,
    selectedArrowStyle: propSelectedArrowStyle = "arrow-line",
    setSelectedArrowStyle: onArrowSelect,
    handleClosePopup: onClose,
  } = useImageEditor();

  const [selectedArrowStyle, setSelectedArrowStyle] = useState<ArrowStyle>(
    propSelectedArrowStyle
  );
  const [selectedColor, setSelectedColor] = useState("#FF3B30");
  const [selectedStrokeSize, setSelectedStrokeSize] = useState("2");

  const isToolbarLeft = toolbarPosition === "left";

  // Arrow style options
  const arrowStyles = [
    { id: "arrow-line", label: "Arrow Line", icon: ArrowRight },
    { id: "arrow-curve", label: "Arrow Curve", icon: ArrowUpRight },
    { id: "double-arrow", label: "Double Arrow", icon: "↔" },
    { id: "line", label: "Line", icon: "—" },
    { id: "curve-line", label: "Curve Line", icon: "∿" },
    { id: "dotted-line", label: "Dotted Line", icon: "⋯" },
  ];

  // Render arrow style icon
  const renderArrowIcon = (style: string) => {
    switch (style) {
      case "arrow-line":
        return <ArrowRight className='h-5 w-5' />;
      case "arrow-curve":
        return <ArrowUpRight className='h-5 w-5' />;
      case "double-arrow":
        return <span className='text-lg'>↔</span>;
      case "line":
        return <span className='text-lg'>—</span>;
      case "curve-line":
        return (
          <svg
            width='20'
            height='20'
            viewBox='0 0 20 20'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M3 14C6 14 7 6 10 6C13 6 14 14 17 14'
              stroke='currentColor'
              strokeWidth='1.5'
              strokeLinecap='round'
            />
          </svg>
        );
      case "dotted-line":
        return (
          <svg
            width='20'
            height='20'
            viewBox='0 0 20 20'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M3 10H5M8 10H10M13 10H15M18 10H20'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
            />
          </svg>
        );
      default:
        return <ArrowRight className='h-5 w-5' />;
    }
  };

  const handleStyleSelect = (style: ArrowStyle) => {
    setSelectedArrowStyle(style);
    if (onArrowSelect) {
      onArrowSelect(style);
    }
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
          isToolbarLeft && "flex-col-reverse"
        )}
      >
        {/* Arrow Style Selection */}
        <div
          className={cn("flex items-center gap-2", isToolbarLeft && "flex-col")}
        >
          {arrowStyles.map((style) => (
            <button
              key={style.id}
              onClick={() => handleStyleSelect(style.id as ArrowStyle)}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 cursor-pointer border border-transparent ring-0 outline-none max-h-[38px] focus:outline-none",
                selectedArrowStyle === style.id
                  ? "bg-hover border-dashed border-border text-text "
                  : "text-text/60 hover:bg-hover hover:text-text",
                isToolbarLeft && "min-w-[138px] mt-2"
              )}
            >
              <>
                {typeof style.icon === "string" ? (
                  <span className='text-lg flex-shrink-0'>{style.icon}</span>
                ) : (
                  <span className='flex-shrink-0'>
                    {renderArrowIcon(style.id)}
                  </span>
                )}
                <span className='text-sm whitespace-nowrap'>{style.label}</span>
              </>
            </button>
          ))}
        </div>

        {/* Divider */}
        <div
          className={cn(
            "h-10 w-px bg-border",
            isToolbarLeft && "w-full h-[1px]"
          )}
        ></div>

        <div className={cn("flex gap-2", isToolbarLeft && "mt-6")}>
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
