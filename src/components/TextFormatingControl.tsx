"use client";
import {
  Bold,
  Italic,
  Underline,
  StrikethroughIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from "lucide-react";
import Button from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type TextAlignment = "left" | "center" | "right";

export interface TextFormattingControlsProps {
  isBold: boolean;
  isItalic: boolean;
  isUnderline: boolean;
  isStrikethrough?: boolean;
  textAlignment?: TextAlignment;
  onBoldChange: (value: boolean) => void;
  onItalicChange: (value: boolean) => void;
  onUnderlineChange: (value: boolean) => void;
  onStrikethroughChange?: (value: boolean) => void;
  onAlignmentChange?: (value: TextAlignment) => void;
  className?: string;
  option?: boolean;
}

export function TextFormattingControls({
  isBold,
  isItalic,
  isUnderline,
  isStrikethrough,
  textAlignment,
  onBoldChange,
  onItalicChange,
  onUnderlineChange,
  onStrikethroughChange,
  onAlignmentChange,
  option,
  className,
}: TextFormattingControlsProps) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      {/* Text Style Buttons */}
      <div className='flex items-center border rounded-md overflow-hidden border-tool-selected-color'>
        <Button
          onClick={() => onBoldChange(!isBold)}
          className={cn(
            "h-8 px-3 rounded-none border-r transition-colors duration-200",
            "border-tool-selected-color hover:bg-border",
            isBold && "bg-border"
          )}
        >
          <Bold className='h-4 w-4' />
          <span className='sr-only'>Bold</span>
        </Button>
        <Button
          onClick={() => onItalicChange(!isItalic)}
          className={cn(
            "h-8 px-3 rounded-none border-r transition-colors duration-200",
            "border-tool-selected-color hover:bg-border",
            isItalic && "bg-border"
          )}
        >
          <Italic className='h-4 w-4' />
          <span className='sr-only'>Italic</span>
        </Button>
        <Button
          onClick={() => onUnderlineChange(!isUnderline)}
          className={cn(
            "h-8 px-3 rounded-none border-r transition-colors duration-200",
            "border-tool-selected-color hover:bg-border",
            isUnderline && "bg-border"
          )}
        >
          <Underline className='h-4 w-4' />
          <span className='sr-only'>Underline</span>
        </Button>
        {option && onStrikethroughChange && (
          <Button
            onClick={() => onStrikethroughChange(!isStrikethrough)}
            className={cn(
              "h-8 px-3 rounded-none transition-colors duration-200",
              "hover:bg-border",
              isStrikethrough && "bg-border"
            )}
          >
            <StrikethroughIcon className='h-4 w-4' />
            <span className='sr-only'>Strikethrough</span>
          </Button>
        )}
      </div>
      {option && onAlignmentChange && (
        <div className='flex items-center border rounded-md overflow-hidden border-tool-selected-color'>
          <Button
            onClick={() => onAlignmentChange("left")}
            className={cn(
              "h-8 px-3 rounded-none border-r",
              "border-tool-selected-color hover:bg-border",
              textAlignment === "left" && "bg-border"
            )}
          >
            <AlignLeft className='h-4 w-4' />
            <span className='sr-only'>Align Left</span>
          </Button>
          <Button
            onClick={() => onAlignmentChange("center")}
            className={cn(
              "h-8 px-3 rounded-none border-r",
              "border-tool-selected-color hover:bg-border",
              textAlignment === "center" && "bg-border"
            )}
          >
            <AlignCenter className='h-4 w-4' />
            <span className='sr-only'>Align Center</span>
          </Button>
          <Button
            onClick={() => onAlignmentChange("right")}
            className={cn(
              "h-8 px-3 rounded-none",
              "hover:bg-border",
              textAlignment === "right" && "bg-border"
            )}
          >
            <AlignRight className='h-4 w-4' />
            <span className='sr-only'>Align Right</span>
          </Button>
        </div>
      )}
    </div>
  );
}
