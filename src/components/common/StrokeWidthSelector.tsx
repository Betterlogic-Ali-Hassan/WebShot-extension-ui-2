"use client";

import { cn } from "@/lib/utils";
import { useImageEditor } from "@/context/ImageContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  const { toolbarPosition } = useImageEditor();
  const isToolbarBottom = toolbarPosition === "bottom";

  // Function to safely parse integers with fallback
  const safeParseInt = (value: string, fallback = 0): number => {
    const parsed = Number.parseInt(value, 10);
    return isNaN(parsed) ? fallback : parsed;
  };

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger
        className={cn(
          "min-w-[120px] bg-border border-tool-selected-color text-text hover:bg-border/80",
          className
        )}
      >
        <SelectValue placeholder='Select width'>
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
        </SelectValue>
      </SelectTrigger>
      <SelectContent
        className='w-36 bg-card border border-border '
        side={isToolbarBottom ? "top" : "bottom"}
      >
        {options.map((size) => (
          <SelectItem
            key={size.value}
            value={size.value}
            className={cn(
              "px-3 py-2 cursor-pointer transition-all duration-200",
              "focus:bg-hover",
              value === size.value && "bg-hover"
            )}
          >
            <div className='flex flex-col gap-1 w-full'>
              <span className='text-sm'>{size.label}</span>
              <div
                className='w-[80px] transition-all duration-200'
                style={{
                  height: `${safeParseInt(size.value, 2)}px`,
                  backgroundColor: "currentColor",
                  borderRadius:
                    safeParseInt(size.value, 1) > 1
                      ? safeParseInt(size.value, 1) / 2
                      : 0,
                }}
              />
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
