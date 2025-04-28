"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface StrokeWidthSelectorProps {
  value: string;
  onChange: (value: string) => void;
  options?: { value: string; label: string }[];
  className?: string;
}

export function StrokeWidthSelector({
  value,
  onChange,
  options = [
    { value: "1", label: "1 px" },
    { value: "2", label: "2 px" },
    { value: "3", label: "3 px" },
    { value: "4", label: "4 px" },
    { value: "6", label: "6 px" },
    { value: "8", label: "8 px" },
  ],
  className,
}: StrokeWidthSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Function to safely parse integers with fallback
  const safeParseInt = (value: string, fallback = 0): number => {
    const parsed = Number.parseInt(value, 10);
    return isNaN(parsed) ? fallback : parsed;
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={cn("relative", className)} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center justify-between gap-2 px-3 py-1.5 min-w-[120px] cursor-pointer rounded-md border transition-all duration-200",
          "bg-searchbar border-border text-text hover:bg-hover"
        )}
      >
        <div className='flex items-center gap-1.5'>
          <span className='text-sm'>
            {options.find((s) => s.value === value)?.label || `${value} px`}
          </span>
          <div
            className='w-6 transition-all duration-200'
            style={{
              height: `${safeParseInt(value, 1)}px`,
              backgroundColor: "currentColor",
              borderRadius:
                safeParseInt(value, 1) > 1 ? safeParseInt(value, 1) / 2 : 0,
            }}
          />
        </div>
        <ChevronDown className='h-3.5 w-3.5 opacity-70' />
      </button>

      {isOpen && (
        <div
          className={cn(
            "absolute top-full left-0 mt-1 w-36 rounded-md shadow-lg z-50 py-1",
            "bg-card border border-border"
          )}
        >
          {options.map((size) => (
            <div
              key={size.value}
              onClick={() => {
                onChange(size.value);
                setIsOpen(false);
              }}
              className={cn(
                "px-3 py-2 cursor-pointer transition-all duration-200",
                "hover:bg-hover",
                value === size.value && "bg-hover"
              )}
            >
              <div className='flex flex-col gap-1'>
                <span className='text-sm'>{size.label}</span>
                <div
                  className='w-full transition-all duration-200'
                  style={{
                    height: `${safeParseInt(size.value, 1)}px`,
                    backgroundColor: "currentColor",
                    borderRadius:
                      safeParseInt(size.value, 1) > 1
                        ? safeParseInt(size.value, 1) / 2
                        : 0,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
