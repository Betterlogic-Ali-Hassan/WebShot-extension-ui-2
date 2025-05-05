"use client";

import type React from "react";
import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import Button from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useImageEditor } from "@/context/ImageContext";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export interface FontSizeSelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  presetSizes?: number[];
  className?: string;
}

export function FontSizeSelector({
  value,
  onChange,
  min = 8,
  max = 72,
  presetSizes = [
    8, 9, 10, 11, 12, 14, 16, 18, 20, 24, 28, 32, 36, 40, 48, 56, 64, 72,
  ],
  className,
}: FontSizeSelectorProps) {
  const [open, setOpen] = useState(false);
  const { toolbarPosition } = useImageEditor();
  const isToolbarBottom = toolbarPosition === "bottom";

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number.parseInt(e.target.value, 10);
    if (!isNaN(newValue)) {
      onChange(Math.min(Math.max(newValue, min), max));
    }
  };

  const decreaseFontSize = () => {
    onChange(Math.max(value - 1, min));
  };

  const increaseFontSize = () => {
    onChange(Math.min(value + 1, max));
  };

  return (
    <div className={cn("flex items-center", className)}>
      <Button
        onClick={decreaseFontSize}
        className={cn(
          "h-8 w-8 rounded-l-md rounded-r-none border-r-0 transition-colors duration-200",
          "bg-border border border-tool-selected-color text-text hover:bg-border/60"
        )}
      >
        <Minus className='h-3 w-3 flex-shrink-0' />
        <span className='sr-only'>Decrease font size</span>
      </Button>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <input
            type='text'
            value={value}
            onChange={handleFontSizeChange}
            onClick={() => setOpen(true)}
            className={cn(
              "h-8 w-12 text-center border-x focus:outline-none focus:ring-0 cursor-pointer",
              "bg-border border hover:bg-border/60 border-tool-selected-color border-r-0 border-l-0 text-text"
            )}
          />
        </PopoverTrigger>
        <PopoverContent
          className='w-24 p-0 border border-border bg-card mt-2'
          align='center'
          side={isToolbarBottom ? "top" : "bottom"}
          sideOffset={5}
        >
          <div
            className='max-h-60 overflow-y-auto py-1 scrollbar-none'
            style={{
              scrollbarWidth: "none" /* Firefox */,
              msOverflowStyle: "none" /* IE and Edge */,
            }}
          >
            {presetSizes.map((size) => (
              <div
                key={size}
                onClick={() => {
                  onChange(size);
                  setOpen(false);
                }}
                className={cn(
                  "px-3 py-1 cursor-pointer transition-all duration-200 text-center",
                  "hover:bg-border/60",
                  value === size && "bg-hover"
                )}
              >
                <span className='text-sm'>{size}</span>
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>

      <Button
        onClick={increaseFontSize}
        className={cn(
          "h-8 w-8 rounded-r-md rounded-l-none border-l-0",
          "bg-border border border-tool-selected-color text-text hover:bg-border/60"
        )}
      >
        <Plus className='h-3 w-3 flex-shrink-0' />
        <span className='sr-only'>Increase font size</span>
      </Button>
    </div>
  );
}
