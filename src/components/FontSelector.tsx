"use client";

import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface FontSelectorProps {
  value: string;
  onChange: (value: string) => void;
  fonts?: string[];
  className?: string;
}

export function FontSelector({
  value,
  onChange,
  fonts = [
    "Calibri",
    "Arial",
    "Helvetica",
    "Times New Roman",
    "Georgia",
    "Verdana",
    "SF Pro",
    "Roboto",
    "Open Sans",
  ],
  className,
}: FontSelectorProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger
        className={cn(
          "min-w-[155px] max-h-8 bg-border border-tool-selected-color text-text hover:bg-border/80",
          className
        )}
      >
        <SelectValue placeholder='Select font'>
          <span className='text-sm truncate' style={{ fontFamily: value }}>
            {value || "Select font"}
          </span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent className='w-full max-h-60 bg-card border border-border'>
        {fonts.map((font) => (
          <SelectItem
            key={font}
            value={font}
            className={cn(
              "!px-3 !py-3 cursor-pointer transition-all  duration-200",
              "hover:bg-border",
              value === font && "bg-border"
            )}
          >
            <span className='text-sm text-text' style={{ fontFamily: font }}>
              {font}
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
