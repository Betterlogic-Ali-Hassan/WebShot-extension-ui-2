"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Minus, Plus } from "lucide-react";
import Button from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={cn("flex items-center", className)}>
      <Button
        onClick={decreaseFontSize}
        className={cn(
          "h-8 w-8 rounded-l-md rounded-r-none border-r-0 transition-colors duration-200  ",
          "bg-border border  border-tool-selected-color text-text hover:bg-border/60"
        )}
      >
        <Minus className='h-3 w-3' />
        <span className='sr-only'>Decrease font size</span>
      </Button>
      <div className='relative' ref={dropdownRef}>
        <input
          type='text'
          value={value}
          onChange={handleFontSizeChange}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className={cn(
            "h-8 w-12 text-center border-x focus:outline-none focus:ring-0 cursor-pointer",
            "bg-border border hover:bg-border/60  border-tool-selected-color border-r-0 border-l-0 text-text"
          )}
        />

        {isDropdownOpen && (
          <div
            className={cn(
              "absolute top-full mt-1 w-24 rounded-md shadow-lg z-50 py-1 max-h-60 overflow-y-auto scrollbar-none",
              "bg-card border border-border"
            )}
            style={{
              scrollbarWidth: "none" /* Firefox */,
              msOverflowStyle: "none" /* IE and Edge */,
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            {presetSizes.map((size) => (
              <div
                key={size}
                onClick={() => {
                  onChange(size);
                  setIsDropdownOpen(false);
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
        )}
      </div>
      <Button
        onClick={increaseFontSize}
        className={cn(
          "h-8 w-8 rounded-r-md rounded-l-none border-l-0",
          "bg-border border  border-tool-selected-color  text-text hover:bg-border/60"
        )}
      >
        <Plus className='h-3 w-3' />
        <span className='sr-only'>Increase font size</span>
      </Button>
    </div>
  );
}
