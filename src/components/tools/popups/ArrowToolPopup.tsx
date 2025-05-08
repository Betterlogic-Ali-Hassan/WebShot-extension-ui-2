"use client";

import { useState } from "react";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useImageEditor } from "@/context/ImageContext";
import { PopupContainer } from "./PopupContainer";
import { ColorPicker } from "@/components/common/ColorPicker";
import { StrokeWidthSelector } from "@/components/common/StrokeWidthSelector";
import DottedLineIcon from "@/components/svgs/DottedLineIcon";
import CurveLineIcon from "@/components/svgs/CurveLineIcon";
import Separator from "@/components/ui/Separator";

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
        return <ArrowRight className='h-4 w-4' />;
      case "arrow-curve":
        return <ArrowUpRight className='h-4.5 w-4.5' />;
      case "double-arrow":
        return <span className='text-base'>↔</span>;
      case "line":
        return <span className='text-base'>—</span>;
      case "curve-line":
        return <CurveLineIcon />;
      case "dotted-line":
        return <DottedLineIcon />;
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
      <div className='flex items-center gap-4 max-[850px]:overflow-x-auto max-[850px]:max-w-[230px] max-[850px]:whitespace-nowrap no-scrollbar'>
        {/* Arrow Style Selection */}
        <div className='flex items-center gap-2 '>
          {arrowStyles.map((style) => (
            <button
              key={style.id}
              onClick={() => handleStyleSelect(style.id as ArrowStyle)}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-lg transition-all max-h-[38px]  duration-200 cursor-pointer border border-transparent ring-0 outline-none  focus:outline-none",
                selectedArrowStyle === style.id
                  ? "bg-hover border-dashed  border-selection-border text-text "
                  : "text-text/60 hover:bg-hover hover:text-text"
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
